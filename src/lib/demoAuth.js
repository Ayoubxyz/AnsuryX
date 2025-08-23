// Demo authentication system for testing without Supabase
class DemoAuth {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('demo_users') || '{}');
    this.currentUser = JSON.parse(localStorage.getItem('demo_current_user') || 'null');
    this.listeners = [];
  }

  // Simulate user signup
  async signUp(email, password, userData = {}) {
    await this.delay(1000); // Simulate network delay

    if (this.users[email]) {
      throw new Error('User already registered');
    }

    const user = {
      id: this.generateId(),
      email,
      user_metadata: userData,
      created_at: new Date().toISOString(),
      email_confirmed_at: new Date().toISOString() // Auto-confirm for demo
    };

    this.users[email] = { ...user, password };
    localStorage.setItem('demo_users', JSON.stringify(this.users));

    return { data: { user }, error: null };
  }

  // Simulate user signin
  async signInWithPassword({ email, password }) {
    await this.delay(800);

    const userData = this.users[email];
    if (!userData || userData.password !== password) {
      throw new Error('Invalid login credentials');
    }

    const user = { ...userData };
    delete user.password; // Don't expose password

    this.currentUser = user;
    localStorage.setItem('demo_current_user', JSON.stringify(user));
    this.notifyListeners('SIGNED_IN', user);

    return { data: { user }, error: null };
  }

  // Simulate signout
  async signOut() {
    await this.delay(500);
    
    this.currentUser = null;
    localStorage.removeItem('demo_current_user');
    this.notifyListeners('SIGNED_OUT', null);

    return { error: null };
  }

  // Get current session
  async getSession() {
    return { 
      data: { 
        session: this.currentUser ? { user: this.currentUser } : null 
      } 
    };
  }

  // Listen for auth changes
  onAuthStateChange(callback) {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this.listeners = this.listeners.filter(l => l !== callback);
          }
        }
      }
    };
  }

  // Reset password (demo)
  async resetPasswordForEmail(email) {
    await this.delay(1000);
    
    if (!this.users[email]) {
      throw new Error('User not found');
    }

    // In demo mode, just simulate success
    return { error: null };
  }

  // Helper methods
  generateId() {
    return 'demo_' + Math.random().toString(36).substr(2, 9);
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  notifyListeners(event, user) {
    this.listeners.forEach(callback => {
      callback(event, user ? { user } : null);
    });
  }
}

// Demo database operations
class DemoDatabase {
  constructor() {
    this.data = JSON.parse(localStorage.getItem('demo_database') || '{}');
  }

  from(table) {
    return new DemoTable(table, this);
  }

  saveData() {
    localStorage.setItem('demo_database', JSON.stringify(this.data));
  }
}

class DemoTable {
  constructor(tableName, db) {
    this.tableName = tableName;
    this.db = db;
    this.query = {};
  }

  select(columns = '*') {
    this.query.select = columns;
    return this;
  }

  eq(column, value) {
    this.query.eq = { column, value };
    return this;
  }

  order(column, options = {}) {
    this.query.order = { column, ...options };
    return this;
  }

  limit(count) {
    this.query.limit = count;
    return this;
  }

  single() {
    this.query.single = true;
    return this;
  }

  async insert(data) {
    await this.delay(300);
    
    if (!this.db.data[this.tableName]) {
      this.db.data[this.tableName] = [];
    }

    const record = {
      id: this.generateId(),
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.db.data[this.tableName].push(record);
    this.db.saveData();

    return { data: record, error: null };
  }

  async upsert(data) {
    await this.delay(300);
    
    if (!this.db.data[this.tableName]) {
      this.db.data[this.tableName] = [];
    }

    const table = this.db.data[this.tableName];
    const existingIndex = table.findIndex(item => 
      item.user_id === data.user_id && 
      (data.date ? item.date === data.date : true) &&
      (data.habit_id ? item.habit_id === data.habit_id : true)
    );

    let record;
    if (existingIndex >= 0) {
      record = { ...table[existingIndex], ...data, updated_at: new Date().toISOString() };
      table[existingIndex] = record;
    } else {
      record = {
        id: this.generateId(),
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      table.push(record);
    }

    this.db.saveData();
    return { data: record, error: null };
  }

  async update(data) {
    await this.delay(300);
    
    const table = this.db.data[this.tableName] || [];
    const filtered = this.applyFilters(table);
    
    filtered.forEach(record => {
      Object.assign(record, data, { updated_at: new Date().toISOString() });
    });

    this.db.saveData();
    return { data: filtered, error: null };
  }

  async delete() {
    await this.delay(300);
    
    const table = this.db.data[this.tableName] || [];
    const toDelete = this.applyFilters(table);
    
    this.db.data[this.tableName] = table.filter(item => !toDelete.includes(item));
    this.db.saveData();

    return { error: null };
  }

  async then(callback) {
    await this.delay(200);
    
    const table = this.db.data[this.tableName] || [];
    let result = this.applyFilters(table);

    if (this.query.order) {
      const { column, ascending = true } = this.query.order;
      result.sort((a, b) => {
        const aVal = a[column];
        const bVal = b[column];
        if (aVal < bVal) return ascending ? -1 : 1;
        if (aVal > bVal) return ascending ? 1 : -1;
        return 0;
      });
    }

    if (this.query.limit) {
      result = result.slice(0, this.query.limit);
    }

    if (this.query.single) {
      result = result[0] || null;
    }

    return callback({ data: result, error: null });
  }

  applyFilters(data) {
    let result = [...data];

    if (this.query.eq) {
      const { column, value } = this.query.eq;
      result = result.filter(item => item[column] === value);
    }

    return result;
  }

  generateId() {
    return 'demo_' + Math.random().toString(36).substr(2, 9);
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Create demo instances
const demoAuth = new DemoAuth();
const demoDb = new DemoDatabase();

export const createDemoClient = () => ({
  auth: demoAuth,
  from: (table) => demoDb.from(table)
});

export const isDemoMode = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return !supabaseUrl || supabaseUrl.includes('placeholder') || supabaseUrl === 'your-supabase-project-url';
};

