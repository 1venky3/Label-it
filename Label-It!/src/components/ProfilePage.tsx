import React, { useState } from 'react';
import { User, Mail, Globe, MapPin, Calendar, Edit3, Save, X, Camera, Award, TrendingUp, Eye, Tag } from 'lucide-react';

interface ObjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  nativeLabel: string;
  userDetails: {
    name: string;
    email: string;
    language: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  imageUrl: string;
  dateAdded: string;
  views: number;
  likes: number;
}

interface ProfilePageProps {
  currentUser: { name: string; email: string } | null;
  objects: ObjectData[];
  onUpdateProfile: (updatedUser: { name: string; email: string }) => void;
  t: (key: string) => string;
  isDarkMode: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, objects, onUpdateProfile, t, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    bio: 'Passionate about preserving and sharing Indian cultural heritage through language.',
    location: 'India',
    preferredLanguage: 'Hindi',
    joinDate: '2024-01-15'
  });

  const languages = [
    { code: 'hi', name: 'Hindi', script: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', script: 'தமிழ்' },
    { code: 'te', name: 'Telugu', script: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', script: 'বাংলা' },
    { code: 'gu', name: 'Gujarati', script: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', script: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', script: 'മലയാളം' },
    { code: 'mr', name: 'Marathi', script: 'मराठी' },
    { code: 'pa', name: 'Punjabi', script: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', script: 'ଓଡ଼ିଆ' }
  ];

  // Filter user's contributions
  const userContributions = objects.filter(obj => obj.userDetails.email === currentUser?.email);
  
  // Calculate statistics
  const totalContributions = userContributions.length;
  const totalViews = userContributions.reduce((sum, obj) => sum + obj.views, 0);
  const totalLikes = userContributions.reduce((sum, obj) => sum + obj.likes, 0);
  const languagesUsed = new Set(userContributions.map(obj => obj.userDetails.language)).size;
  const categoriesContributed = new Set(userContributions.map(obj => obj.category)).size;

  const handleSave = () => {
    onUpdateProfile({ name: editForm.name, email: editForm.email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      ...editForm,
      name: currentUser?.name || '',
      email: currentUser?.email || ''
    });
    setIsEditing(false);
  };

  const getLanguageScript = (languageName: string) => {
    const lang = languages.find(l => l.name === languageName);
    return lang ? lang.script : languageName;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-orange-500 to-teal-500 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl font-bold">
              {getInitials(currentUser?.name || 'User')}
            </div>
            <button className="absolute bottom-2 right-2 w-10 h-10 bg-white text-orange-500 rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors shadow-lg">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className={`text-2xl font-bold backdrop-blur-sm border rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-white/20 border-white/30'
                  }`}
                  placeholder="Your Name"
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className={`text-lg backdrop-blur-sm border rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-white/20 border-white/30'
                  }`}
                  placeholder="your@email.com"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-white text-orange-500 rounded-lg hover:bg-orange-50 transition-colors font-medium flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className={`px-6 py-2 backdrop-blur-sm border rounded-lg hover:bg-white/30 transition-colors font-medium flex items-center ${
                      isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-white/20 border-white/30'
                    }`}
                  >
                    <X className="w-4 h-4 mr-2" />
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{currentUser?.name}</h1>
                <p className="text-xl text-orange-100">{currentUser?.email}</p>
                <p className="text-orange-100 max-w-md">{editForm.bio}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className={`px-6 py-2 backdrop-blur-sm border rounded-lg hover:bg-white/30 transition-colors font-medium flex items-center ${
                    isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-white/20 border-white/30'
                  }`}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {t('profile.editProfile')}
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className={`backdrop-blur-sm rounded-lg p-4 ${
              isDarkMode ? 'bg-slate-700/50' : 'bg-white/20'
            }`}>
              <p className="text-2xl font-bold">{totalContributions}</p>
              <p className="text-orange-100 text-sm">Objects</p>
            </div>
            <div className={`backdrop-blur-sm rounded-lg p-4 ${
              isDarkMode ? 'bg-slate-700/50' : 'bg-white/20'
            }`}>
              <p className="text-2xl font-bold">{languagesUsed}</p>
              <p className="text-orange-100 text-sm">Languages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100'
            }`}>
              <Tag className={`w-6 h-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
            </div>
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{totalContributions}</span>
          </div>
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('profile.totalContributions')}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('profile.objectsLabeled')}</p>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-teal-900/30' : 'bg-teal-100'
            }`}>
              <Eye className={`w-6 h-6 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`} />
            </div>
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{totalViews.toLocaleString()}</span>
          </div>
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('contributions.totalViews')}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('profile.acrossAll')}</p>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
            }`}>
              <TrendingUp className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} />
            </div>
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{totalLikes}</span>
          </div>
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Total Likes</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('profile.communityAppreciation')}</p>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
            }`}>
              <Award className={`w-6 h-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            </div>
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{categoriesContributed}</span>
          </div>
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('contributions.categories')}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('profile.differentTypes')}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="lg:col-span-1">
          <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('profile.personalInfo')}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('profile.fullName')}</p>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{currentUser?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('common.email')}</p>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{currentUser?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Globe className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('profile.preferredLanguage')}</p>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{editForm.preferredLanguage} - {getLanguageScript(editForm.preferredLanguage)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('common.location')}</p>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{editForm.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('profile.memberSince')}</p>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{new Date(editForm.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Contributions */}
        <div className="lg:col-span-2">
          <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('profile.recentContributions')}</h3>
              <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{userContributions.length} {t('profile.total')}</span>
            </div>
            
            {userContributions.length > 0 ? (
              <div className="space-y-4">
                {userContributions.slice(0, 5).map((object) => (
                  <div key={object.id} className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700/50 hover:bg-slate-700' 
                      : 'bg-slate-50 hover:bg-slate-100'
                  }`}>
                    <img
                      src={object.imageUrl}
                      alt={object.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{object.title}</h4>
                      <p className={`text-sm mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{object.description}</p>
                      <div className={`flex items-center space-x-4 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span className="flex items-center space-x-1">
                          <Globe className="w-3 h-3" />
                          <span>{object.nativeLabel}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{object.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{object.likes}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                        {object.category}
                      </span>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {new Date(object.dateAdded).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {userContributions.length > 5 && (
                  <div className="text-center pt-4">
                    <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">
                      {t('profile.viewAll')} {userContributions.length} {t('profile.contributions')} →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
                }`}>
                  <Tag className={`w-8 h-8 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <h4 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('profile.noContributions')}</h4>
                <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('profile.startUploading')}</p>
                <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  {t('profile.uploadObject')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;