import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { useChallenge } from '../contexts/ChallengeContext';
import { ACHIEVEMENT_MILESTONES } from '../constants/challenge';
import { 
  ArrowLeft, 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Gem, 
  Flame,
  Lock,
  CheckCircle2
} from 'lucide-react';

const achievementIcons = {
  '🌟': Star,
  '🔥': Flame,
  '⚡': Zap,
  '💎': Gem,
  '👑': Crown,
  '🏆': Trophy
};

export default function Achievements() {
  const { user } = useAuth();
  const { challengeData, getCurrentStreak } = useChallenge();
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  const currentStreak = getCurrentStreak();

  useEffect(() => {
    // Calculate unlocked achievements based on current streak
    const unlocked = ACHIEVEMENT_MILESTONES.filter(milestone => 
      currentStreak >= milestone.days
    );
    setUnlockedAchievements(unlocked);
  }, [currentStreak]);

  const getNextAchievement = () => {
    return ACHIEVEMENT_MILESTONES.find(milestone => 
      currentStreak < milestone.days
    );
  };

  const nextAchievement = getNextAchievement();
  const progressToNext = nextAchievement 
    ? (currentStreak / nextAchievement.days) * 100 
    : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Achievements
          </h1>
          <p className="text-slate-300">
            Track your progress and unlock rewards on your journey
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Your Progress</span>
              </CardTitle>
              <CardDescription>
                {unlockedAchievements.length} of {ACHIEVEMENT_MILESTONES.length} achievements unlocked
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Current Streak</span>
                <Badge variant="secondary" className="bg-purple-800 text-purple-100">
                  {currentStreak} days
                </Badge>
              </div>
              
              {nextAchievement && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Next Achievement</span>
                    <span className="text-sm text-slate-300">
                      {nextAchievement.title} ({nextAchievement.days} days)
                    </span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                  <p className="text-xs text-slate-400 text-center">
                    {nextAchievement.days - currentStreak} more days to unlock
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENT_MILESTONES.map((achievement, index) => {
            const isUnlocked = unlockedAchievements.some(a => a.days === achievement.days);
            const Icon = achievementIcons[achievement.badge] || Trophy;
            
            return (
              <motion.div
                key={achievement.days}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className={`${
                  isUnlocked 
                    ? 'bg-gradient-to-br from-purple-800/50 to-cyan-800/50 border-purple-500/50' 
                    : 'bg-slate-800/30 border-slate-700'
                } backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      isUnlocked 
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600' 
                        : 'bg-slate-700'
                    }`}>
                      {isUnlocked ? (
                        <Icon className="w-8 h-8 text-white" />
                      ) : (
                        <Lock className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    
                    <h3 className={`font-bold mb-2 ${
                      isUnlocked ? 'text-white' : 'text-slate-400'
                    }`}>
                      {achievement.title}
                    </h3>
                    
                    <p className={`text-sm mb-3 ${
                      isUnlocked ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-2">
                      <Badge variant={isUnlocked ? "default" : "secondary"} className={
                        isUnlocked 
                          ? "bg-purple-600 text-white" 
                          : "bg-slate-700 text-slate-400"
                      }>
                        {achievement.days} days
                      </Badge>
                      {isUnlocked && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    
                    {isUnlocked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="mt-3"
                      >
                        <Badge className="bg-green-800 text-green-100">
                          Unlocked!
                        </Badge>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Motivational Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-purple-800/30 to-cyan-800/30 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Keep Going, Champion! 💪</h2>
              <p className="text-slate-300 mb-6">
                Every day you complete brings you closer to transformation. 
                Your consistency is building unshakeable discipline.
              </p>
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  Continue Your Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

