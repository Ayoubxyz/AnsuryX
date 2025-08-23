import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { generateJournalPDF } from '../utils/certificateGenerator';
import { ArrowLeft, Save, Download, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function Journal() {
  const { user } = useAuth();
  const [todaysEntry, setTodaysEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    loadJournalEntries();
  }, [user]);

  const loadJournalEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      setEntries(data || []);
      
      // Find today's entry
      const todayEntry = data?.find(entry => entry.date === today);
      if (todayEntry) {
        setTodaysEntry(todayEntry.content);
      }
    } catch (error) {
      console.error('Error loading journal entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async () => {
    if (!todaysEntry.trim()) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('journal_entries')
        .upsert({
          user_id: user.id,
          date: today,
          content: todaysEntry
        });

      if (error) throw error;

      toast.success('Journal entry saved!');
      await loadJournalEntries();
    } catch (error) {
      toast.error('Failed to save entry');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const exportToPDF = async () => {
    if (entries.length === 0) {
      toast.error('No journal entries to export');
      return;
    }

    try {
      const result = await generateJournalPDF(entries, user);
      if (result.success) {
        toast.success(`Journal exported: ${result.filename}`);
      } else {
        toast.error('Failed to export journal. Please try again.');
      }
    } catch (error) {
      console.error('Journal export error:', error);
      toast.error('An error occurred while exporting your journal.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-purple-300">Loading your journal...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link to="/dashboard">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Button
            onClick={exportToPDF}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Daily Journal
          </h1>
          <p className="text-slate-400">Reflect on your journey and track your thoughts</p>
        </motion.div>

        {/* Today's Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Today's Reflection - {format(new Date(), 'MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="How did today go? What did you learn? What are you grateful for?"
                value={todaysEntry}
                onChange={(e) => setTodaysEntry(e.target.value)}
                className="min-h-[200px] bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
              />
              <Button
                onClick={saveEntry}
                disabled={saving || !todaysEntry.trim()}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Entry'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Previous Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Previous Entries</h2>
          <div className="space-y-4">
            {entries.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8 text-center">
                  <p className="text-slate-400">No journal entries yet. Start writing your first entry above!</p>
                </CardContent>
              </Card>
            ) : (
              entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">
                        {format(new Date(entry.date), 'MMMM d, yyyy')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 whitespace-pre-wrap">{entry.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

