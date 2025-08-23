import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useChallenge } from '../contexts/ChallengeContext';
import { generateCertificate } from '../utils/certificateGenerator';
import { 
  ArrowLeft, 
  Download, 
  Award, 
  Calendar,
  Trophy,
  Star,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Certificate() {
  const { user } = useAuth();
  const { challengeData, getCurrentStreak } = useChallenge();
  const [isGenerating, setIsGenerating] = useState(false);

  const currentStreak = getCurrentStreak();
  const isEligibleForCertificate = currentStreak >= 40;

  const handleDownloadCertificate = async () => {
    if (!isEligibleForCertificate) {
      toast.error('Complete the 40-day challenge to earn your certificate!');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateCertificate(user, challengeData);
      if (result.success) {
        toast.success(`Certificate downloaded: ${result.filename}`);
      } else {
        toast.error('Failed to generate certificate. Please try again.');
      }
    } catch (error) {
      console.error('Certificate generation error:', error);
      toast.error('An error occurred while generating your certificate.');
    } finally {
      setIsGenerating(false);
    }
  };

  const userName = user?.user_metadata?.full_name || 'Challenge Participant';
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
            Certificate of Achievement
          </h1>
          <p className="text-slate-300">
            Celebrate your incredible transformation journey
          </p>
        </motion.div>

        {/* Certificate Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Certificate Preview */}
              <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg p-8 border-2 border-purple-500/50 text-center">
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-400 rounded-br-lg"></div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      Certificate of Achievement
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded"></div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-300">This is to certify that</p>
                    <h3 className="text-2xl font-bold text-white">{userName}</h3>
                    <p className="text-slate-300">has successfully completed the</p>
                    <h4 className="text-xl font-bold text-purple-400">AnsuryX Challenge</h4>
                    <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                      Demonstrating unwavering commitment to personal transformation
                      through 40 days of consistent daily habits and spiritual growth
                    </p>
                  </div>

                  <div className="bg-purple-800/20 rounded-lg p-4 border border-purple-500/30">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Duration</div>
                        <div className="font-bold">40 Days</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Habits</div>
                        <div className="font-bold">5 Pillars</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Completed</div>
                        <div className="font-bold">{completionDate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <span className="text-xs text-slate-400 italic">
                      "Excellence is not an act, but a habit." - Aristotle
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Progress Status */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-purple-500" />
                <span>Challenge Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current Streak</span>
                <Badge variant="secondary" className="bg-purple-800 text-purple-100">
                  {currentStreak} days
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Required for Certificate</span>
                <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                  40 days
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status</span>
                {isEligibleForCertificate ? (
                  <Badge className="bg-green-800 text-green-100">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Eligible
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-orange-800 text-orange-100">
                    <Calendar className="w-3 h-3 mr-1" />
                    {40 - currentStreak} days remaining
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Download Actions */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5 text-cyan-500" />
                <span>Download Certificate</span>
              </CardTitle>
              <CardDescription>
                {isEligibleForCertificate 
                  ? "Your certificate is ready for download!"
                  : "Complete the challenge to unlock your certificate"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleDownloadCertificate}
                disabled={!isEligibleForCertificate || isGenerating}
                className={`w-full ${
                  isEligibleForCertificate 
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700' 
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate PDF
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivational Section */}
        {!isEligibleForCertificate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-purple-800/30 to-cyan-800/30 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Keep Going, You're Almost There! 🌟</h3>
                <p className="text-slate-300 mb-6">
                  You're {40 - currentStreak} days away from earning your certificate of achievement. 
                  Every day you complete brings you closer to this incredible milestone!
                </p>
                <Link to="/dashboard">
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                    Continue Your Journey
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

