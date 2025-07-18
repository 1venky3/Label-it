import React, { useState } from 'react';
import { Trophy, Medal, Award, Star, TrendingUp, Users, Globe, Calendar } from 'lucide-react';

interface LeaderboardPageProps {
  currentUser: { name: string; email: string } | null;
  t: (key: string) => string;
  isDarkMode: boolean;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ currentUser, t, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'contributors' | 'reviewers' | 'languages'>('contributors');
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'alltime'>('alltime');

  // Mock leaderboard data
  const topContributors = [
    { rank: 1, name: 'Priya Sharma', contributions: 342, points: 1850, languages: 3, badge: 'Script Master', avatar: 'PS' },
    { rank: 2, name: 'Ravi Kumar', contributions: 298, points: 1620, languages: 2, badge: 'Cultural Expert', avatar: 'RK' },
    { rank: 3, name: 'Ananya Reddy', contributions: 276, points: 1480, languages: 4, badge: 'Multi-lingual', avatar: 'AR' },
    { rank: 4, name: 'Vikram Singh', contributions: 234, points: 1290, languages: 2, badge: 'Community Helper', avatar: 'VS' },
    { rank: 5, name: 'Meera Patel', contributions: 198, points: 1120, languages: 3, badge: 'Audio Expert', avatar: 'MP' }
  ];

  const topReviewers = [
    { rank: 1, name: 'Dr. Lakshmi Iyer', reviews: 1240, accuracy: 96, points: 2100, badge: 'Verification Expert', avatar: 'LI' },
    { rank: 2, name: 'Suresh Nair', reviews: 980, accuracy: 94, points: 1890, badge: 'Quality Guardian', avatar: 'SN' },
    { rank: 3, name: 'Kavitha Menon', reviews: 856, accuracy: 95, points: 1650, badge: 'Script Validator', avatar: 'KM' },
    { rank: 4, name: 'Arjun Desai', reviews: 743, accuracy: 92, points: 1420, badge: 'Community Moderator', avatar: 'AD' },
    { rank: 5, name: 'Deepa Krishnan', reviews: 687, accuracy: 93, points: 1280, badge: 'Cultural Reviewer', avatar: 'DK' }
  ];

  const languageChampions = [
    { rank: 1, language: 'Hindi', script: 'हिन्दी', contributors: 1240, objects: 4560, champion: 'Priya Sharma' },
    { rank: 2, language: 'Tamil', script: 'தமிழ்', contributors: 980, objects: 3890, champion: 'Ravi Kumar' },
    { rank: 3, language: 'Telugu', script: 'తెలుగు', contributors: 856, objects: 3240, champion: 'Ananya Reddy' },
    { rank: 4, language: 'Malayalam', script: 'മലയാളം', contributors: 743, objects: 2890, champion: 'Meera Nair' },
    { rank: 5, language: 'Kannada', script: 'ಕನ್ನಡ', contributors: 687, objects: 2560, champion: 'Vikram Rao' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className={`text-lg font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>#{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Script Master': 'bg-purple-100 text-purple-700 border-purple-200',
      'Cultural Expert': 'bg-orange-100 text-orange-700 border-orange-200',
      'Multi-lingual': 'bg-teal-100 text-teal-700 border-teal-200',
      'Community Helper': 'bg-blue-100 text-blue-700 border-blue-200',
      'Audio Expert': 'bg-green-100 text-green-700 border-green-200',
      'Verification Expert': 'bg-red-100 text-red-700 border-red-200',
      'Quality Guardian': 'bg-indigo-100 text-indigo-700 border-indigo-200'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          {t('leaderboard.title')}
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {t('leaderboard.subtitle')}
        </p>
      </div>

      {/* Time Filter */}
      <div className="flex justify-center">
        <div className={`inline-flex rounded-xl p-1 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
          {[
            { key: 'weekly', label: t('leaderboard.weeklyLeaders') },
            { key: 'monthly', label: t('leaderboard.monthlyLeaders') },
            { key: 'alltime', label: t('leaderboard.allTimeLeaders') }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setTimeFilter(filter.key as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                timeFilter === filter.key
                  ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg'
                  : isDarkMode 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className={`inline-flex rounded-xl p-1 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
          {[
            { key: 'contributors', label: t('leaderboard.topContributors'), icon: Users },
            { key: 'reviewers', label: t('leaderboard.topReviewers'), icon: Star },
            { key: 'languages', label: t('leaderboard.languageChampions'), icon: Globe }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg'
                    : isDarkMode 
                    ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Your Rank Card */}
      <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {currentUser?.name || 'Your Profile'}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {t('leaderboard.yourRank')}: #42
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>156</p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('leaderboard.contributions')}</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>89</p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('leaderboard.reviews')}</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>1,240</p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('common.points')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className={`rounded-2xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        {activeTab === 'contributors' && (
          <div className="p-6">
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {t('leaderboard.topContributors')}
            </h3>
            <div className="space-y-4">
              {topContributors.map((contributor) => (
                <div key={contributor.rank} className={`flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.02] ${
                  isDarkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(contributor.rank)}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                      {contributor.avatar}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {contributor.name}
                      </h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(contributor.badge)}`}>
                        {contributor.badge}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-right">
                    <div>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {contributor.contributions}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t('leaderboard.contributions')}
                      </p>
                    </div>
                    <div>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {contributor.languages}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t('leaderboard.languages')}
                      </p>
                    </div>
                    <div>
                      <p className={`text-lg font-bold text-orange-500`}>
                        {contributor.points.toLocaleString()}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t('common.points')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviewers' && (
          <div className="p-6">
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {t('leaderboard.topReviewers')}
            </h3>
            <div className="space-y-4">
              {topReviewers.map((reviewer) => (
                <div key={reviewer.rank} className={`flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.02] ${
                  isDarkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(reviewer.rank)}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                      {reviewer.avatar}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {reviewer.name}
                      </h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(reviewer.badge)}`}>
                        {reviewer.badge}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-right">
                    <div>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {reviewer.reviews}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t('leaderboard.reviews')}
                      </p>
                    </div>
                    <div>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {reviewer.accuracy}%
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t('leaderboard.accuracy')}
                      </p>
                    </div>
                    <div>
                      <p className={`text-lg font-bold text-teal-500`}>
                        {reviewer.points.toLocaleString()}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t('common.points')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'languages' && (
          <div className="p-6">
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {t('leaderboard.languageChampions')}
            </h3>
            <div className="space-y-4">
              {languageChampions.map((lang) => (
                <div key={lang.rank} className={`flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.02] ${
                  isDarkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(lang.rank)}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {lang.language}
                      </h4>
                      <p className={`text-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        {lang.script}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-right">
                    <div>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {lang.contributors}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Contributors
                      </p>
                    </div>
                    <div>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {lang.objects.toLocaleString()}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Objects
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        Champion: {lang.champion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;