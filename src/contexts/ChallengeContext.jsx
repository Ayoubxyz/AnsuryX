import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isDemo } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { DAILY_HABITS, CHALLENGE_DURATION } from '../constants/challenge';
import { format, startOfDay, differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';

const ChallengeContext = createContext({});

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
};

// Demo storage helpers
const getDemoData = () => {
  return JSON.parse(localStorage.getItem('demo_challenge_data') || '{}');
};

const setDemoData = (data) => {
  localStorage.setItem('demo_challenge_data', JSON.stringify(data));
};

export const ChallengeProvider = ({ children }) => {
  const { user } = useAuth();
  const [challengeData, setChallengeData] = useState(null);
  const [todaysProgress, setTodaysProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadChallengeData();
      loadTodaysProgress();
    } else {
      setChallengeData(null);
      setTodaysProgress({});
      setLoading(false);
    }
  }, [user]);

  const loadChallengeData = async () => {
    try {
      if (isDemo) {
        const demoData = getDemoData();
        const userChallenges = demoData.challenges || {};
        const userChallenge = userChallenges[user.id];
        setChallengeData(userChallenge || null);
      } else {
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        setChallengeData(data);
      }
    } catch (error) {
      console.error('Error loading challenge data:', error);
    }
  };

  const loadTodaysProgress = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      if (isDemo) {
        const demoData = getDemoData();
        const userProgress = demoData.progress || {};
        const todayKey = `${user.id}_${today}`;
        const todayData = userProgress[todayKey] || {};
        
        const progressMap = {};
        DAILY_HABITS.forEach(habit => {
          progressMap[habit.id] = todayData[habit.id] || false;
        });
        
        setTodaysProgress(progressMap);
      } else {
        const { data, error } = await supabase
          .from('daily_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', today);

        if (error) throw error;

        const progressMap = {};
        data?.forEach(item => {
          progressMap[item.habit_id] = item.completed;
        });
        
        setTodaysProgress(progressMap);
      }
    } catch (error) {
      console.error('Error loading today\'s progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const startNewChallenge = async () => {
    try {
      const challengeData = {
        id: 'demo_challenge_' + Date.now(),
        user_id: user.id,
        start_date: format(new Date(), 'yyyy-MM-dd'),
        current_day: 1,
        status: 'active',
        created_at: new Date().toISOString()
      };

      if (isDemo) {
        const demoData = getDemoData();
        if (!demoData.challenges) demoData.challenges = {};
        demoData.challenges[user.id] = challengeData;
        setDemoData(demoData);
        
        setChallengeData(challengeData);
        toast.success('New challenge started! Let\'s go! 🚀');
        return challengeData;
      } else {
        const { data, error } = await supabase
          .from('challenges')
          .insert({
            user_id: user.id,
            start_date: format(new Date(), 'yyyy-MM-dd'),
            current_day: 1,
            status: 'active'
          })
          .select()
          .single();

        if (error) throw error;

        setChallengeData(data);
        toast.success('New challenge started! Let\'s go! 🚀');
        return data;
      }
    } catch (error) {
      toast.error('Failed to start challenge');
      console.error(error);
    }
  };

  const toggleHabit = async (habitId) => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const isCompleted = !todaysProgress[habitId];

      if (isDemo) {
        const demoData = getDemoData();
        if (!demoData.progress) demoData.progress = {};
        
        const todayKey = `${user.id}_${today}`;
        if (!demoData.progress[todayKey]) demoData.progress[todayKey] = {};
        
        demoData.progress[todayKey][habitId] = isCompleted;
        setDemoData(demoData);
      } else {
        if (isCompleted) {
          const { error } = await supabase
            .from('daily_progress')
            .upsert({
              user_id: user.id,
              habit_id: habitId,
              date: today,
              completed: true
            });

          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('daily_progress')
            .delete()
            .eq('user_id', user.id)
            .eq('habit_id', habitId)
            .eq('date', today);

          if (error) throw error;
        }
      }

      setTodaysProgress(prev => ({
        ...prev,
        [habitId]: isCompleted
      }));

      // Check if all habits are completed
      const newProgress = { ...todaysProgress, [habitId]: isCompleted };
      const allCompleted = DAILY_HABITS.every(habit => newProgress[habit.id]);
      
      if (allCompleted && challengeData) {
        await updateChallengeProgress();
      }

    } catch (error) {
      toast.error('Failed to update progress');
      console.error(error);
    }
  };

  const updateChallengeProgress = async () => {
    try {
      const today = new Date();
      const startDate = new Date(challengeData.start_date);
      const daysSinceStart = differenceInDays(today, startDate) + 1;

      const updatedChallenge = {
        ...challengeData,
        current_day: Math.min(daysSinceStart, CHALLENGE_DURATION),
        last_completed_date: format(today, 'yyyy-MM-dd'),
        status: daysSinceStart >= CHALLENGE_DURATION ? 'completed' : 'active'
      };

      if (isDemo) {
        const demoData = getDemoData();
        demoData.challenges[user.id] = updatedChallenge;
        setDemoData(demoData);
        setChallengeData(updatedChallenge);
      } else {
        const { error } = await supabase
          .from('challenges')
          .update({
            current_day: Math.min(daysSinceStart, CHALLENGE_DURATION),
            last_completed_date: format(today, 'yyyy-MM-dd'),
            status: daysSinceStart >= CHALLENGE_DURATION ? 'completed' : 'active'
          })
          .eq('id', challengeData.id);

        if (error) throw error;
        await loadChallengeData();
      }

      if (daysSinceStart >= CHALLENGE_DURATION) {
        toast.success('🎉 Congratulations! You\'ve completed the challenge!');
      }
    } catch (error) {
      console.error('Error updating challenge progress:', error);
    }
  };

  const resetChallenge = async () => {
    try {
      if (challengeData) {
        if (isDemo) {
          const demoData = getDemoData();
          if (demoData.challenges && demoData.challenges[user.id]) {
            demoData.challenges[user.id].status = 'failed';
            setDemoData(demoData);
          }
        } else {
          const { error } = await supabase
            .from('challenges')
            .update({ status: 'failed' })
            .eq('id', challengeData.id);

          if (error) throw error;
        }
      }

      await startNewChallenge();
      setTodaysProgress({});
    } catch (error) {
      toast.error('Failed to reset challenge');
      console.error(error);
    }
  };

  const getCurrentStreak = () => {
    if (!challengeData) return 0;
    
    const today = new Date();
    const startDate = new Date(challengeData.start_date);
    const lastCompleted = challengeData.last_completed_date 
      ? new Date(challengeData.last_completed_date) 
      : null;

    if (!lastCompleted) return 0;

    const daysSinceLastCompleted = differenceInDays(today, lastCompleted);
    
    // If more than 1 day since last completion, streak is broken
    if (daysSinceLastCompleted > 1) return 0;
    
    return challengeData.current_day || 0;
  };

  const getTodaysCompletionRate = () => {
    const completed = Object.values(todaysProgress).filter(Boolean).length;
    return (completed / DAILY_HABITS.length) * 100;
  };

  const value = {
    challengeData,
    todaysProgress,
    loading,
    startNewChallenge,
    toggleHabit,
    resetChallenge,
    getCurrentStreak,
    getTodaysCompletionRate,
    loadChallengeData,
    loadTodaysProgress
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
};

