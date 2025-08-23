import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CHALLENGE_RULES } from '../constants/challenge';
import { ArrowLeft, Zap, Target, Heart, Droplets, BookOpen } from 'lucide-react';

export default function ChallengeRules() {
  const pillars = [
    { icon: Heart, title: 'Spiritual Connection', desc: 'Daily prayer/meditation' },
    { icon: BookOpen, title: 'Sacred Knowledge', desc: 'Quran/Scripture reading' },
    { icon: Zap, title: 'Physical Strength', desc: 'Exercise and movement' },
    { icon: Droplets, title: 'Life Essence', desc: 'Proper hydration' },
    { icon: Target, title: 'Mental Clarity', desc: 'Daily reflection and journaling' }
  ];

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
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            The AnsuryX Challenge
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A 40-day journey to transform your life through unwavering commitment to five fundamental pillars of human excellence.
          </p>
        </motion.div>

        {/* The Five Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">The Five Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <pillar.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                    <p className="text-slate-400">{pillar.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rules Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">The Rules</h2>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold mt-0.5">1</div>
                  <p>Complete ALL five habits every single day</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold mt-0.5">2</div>
                  <p>Miss one day = Start over from Day 1</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold mt-0.5">3</div>
                  <p>No exceptions, no excuses</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold mt-0.5">4</div>
                  <p>Track your progress honestly</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold mt-0.5">5</div>
                  <p>Reflect and journal daily</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* The Reward */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-purple-500/30">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-6">The Reward</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-300">
                <div>✨ Unshakeable discipline</div>
                <div>🌟 Spiritual growth</div>
                <div>💪 Physical vitality</div>
                <div>🧠 Mental clarity</div>
                <div>🔥 A transformed life</div>
                <div>🏆 Lasting fulfillment</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <blockquote className="text-xl italic text-slate-300 max-w-2xl mx-auto">
            "Excellence is not an act, but a habit. We are what we repeatedly do."
          </blockquote>
          <p className="text-slate-500 mt-2">- Aristotle</p>
        </motion.div>
      </div>
    </div>
  );
}

