import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { useChallenge } from '../contexts/ChallengeContext';
import { DAILY_HABITS, CHALLENGE_DURATION } from '../constants/challenge';
import { 
  Calendar, 
  Flame, 
  Target, 
  BookOpen, 
  User, 
  LogOut,
  Menu,
  X,
  Trophy,
  CheckCircle2,
  Circle
} from 'lucide-react';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { 
    challengeData, 
    todaysProgress, 
    loading, 
    startNewChallenge, 
    toggleHabit, 
    getCurrentStreak,
    getTodaysCompletionRate 
  } = useChallenge();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const streak = getCurrentStreak();
  const completionRate = getTodaysCompletionRate();
  const daysRemaining = challengeData ? CHALLENGE_DURATION - (challengeData.current_day || 0) : CHALLENGE_DURATION;

  const menuItems = [
    { icon: Target, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: BookOpen, label: 'Challenge Rules', path: '/rules' },
    { icon: Calendar, label: 'Journal', path: '/journal' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-300">Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/90 backdrop-blur-sm border-r border-slate-700 lg:relative lg:translate-x-0 lg:block"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AnsuryX
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={signOut}
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700/50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, {user?.user_metadata?.full_name || 'Challenger'}!
                </h1>
                <p className="text-slate-400">
                  {challengeData ? `Day ${challengeData.current_day || 1} of ${CHALLENGE_DURATION}` : 'Ready to start your journey?'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Current Streak</CardTitle>
                  <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{streak} days</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Keep the fire burning! 🔥
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Today's Progress</CardTitle>
                  <Target className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{Math.round(completionRate)}%</div>
                  <Progress value={completionRate} className="mt-2" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Days Remaining</CardTitle>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{Math.max(0, daysRemaining)}</div>
                  <p className="text-xs text-slate-400 mt-1">
                    {daysRemaining > 0 ? 'Until victory!' : 'Challenge completed! 🎉'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Challenge Status */}
          {!challengeData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-purple-500/30">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Ready to Transform Your Life?</h3>
                  <p className="text-slate-300 mb-4">
                    Start the 40-day AnsuryX Challenge and build unbreakable habits.
                  </p>
                  <Button
                    onClick={startNewChallenge}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                  >
                    Start Challenge
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Daily Habits */}
          {challengeData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Today's Habits</CardTitle>
                  <p className="text-slate-400">Complete all habits to maintain your streak</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {DAILY_HABITS.map((habit, index) => (
                    <motion.div
                      key={habit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`flex items-center space-x-4 p-4 rounded-lg border transition-all cursor-pointer ${
                        todaysProgress[habit.id]
                          ? 'bg-green-900/20 border-green-500/30'
                          : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                      }`}
                      onClick={() => toggleHabit(habit.id)}
                    >
                      <div className="text-2xl">{habit.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{habit.title}</h4>
                        <p className="text-sm text-slate-400">{habit.description}</p>
                      </div>
                      {todaysProgress[habit.id] ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-500" />
                      )}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

