import React, { useState } from 'react';
import { Upload, Camera, MapPin, Globe, User, Mail, Tag, FileText, Grid3X3, Users, UserCircle, MessageSquare, Languages, Moon, Sun, Mic, Play, Pause, Square, Trophy, ThumbsUp, ThumbsDown, Flag, Zap, Award } from 'lucide-react';
import LoginPage from './components/LoginPage';
import IntroPage from './components/IntroPage';
import ContributionsPage from './components/ContributionsPage';
import ProfilePage from './components/ProfilePage';
import FeedbackPage from './components/FeedbackPage';
import LeaderboardPage from './components/LeaderboardPage';
import { getTranslation, detectScript, validateLanguageScript } from './utils/translations';

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
  audioUrl?: string;
  dialectVariant?: string;
  culturalContext?: string;
  aiSuggestions?: string[];
  verificationStatus: 'pending' | 'verified' | 'flagged';
  verificationScore: number;
  upvotes: number;
  downvotes: number;
  dateAdded: string;
  views: number;
  likes: number;
}

interface UserData {
  name: string;
  email: string;
}

const categories = [
  'Electronics', 'Furniture', 'Clothing', 'Kitchen Items', 'Tools', 'Books', 'Toys', 'Plants', 'Vehicles', 'Food Items'
];

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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [currentView, setCurrentView] = useState<'upload' | 'gallery' | 'contributions' | 'profile' | 'feedback' | 'leaderboard'>('upload');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [objects, setObjects] = useState<ObjectData[]>([
    {
      id: '1',
      title: 'Traditional Brass Lamp',
      description: 'A beautiful brass oil lamp used during festivals',
      category: 'Furniture',
      nativeLabel: 'दीपक',
      userDetails: { name: 'Priya Sharma', email: 'priya@example.com', language: 'Hindi' },
      coordinates: { latitude: 19.0760, longitude: 72.8777 },
      imageUrl: 'https://images.pexels.com/photos/6135435/pexels-photo-6135435.jpeg?auto=compress&cs=tinysrgb&w=400',
      audioUrl: undefined,
      dialectVariant: 'Mumbai Hindi',
      culturalContext: 'Used during Diwali and other Hindu festivals for prayers and decoration',
      verificationStatus: 'verified',
      verificationScore: 4.8,
      upvotes: 23,
      downvotes: 2,
      dateAdded: '2024-01-15',
      views: 245,
      likes: 18
    },
    {
      id: '2',
      title: 'Coconut Shell Bowl',
      description: 'Eco-friendly bowl made from coconut shell',
      category: 'Kitchen Items',
      nativeLabel: 'தென்னையின் ஓடு',
      userDetails: { name: 'Ravi Kumar', email: 'ravi@example.com', language: 'Tamil' },
      coordinates: { latitude: 13.0827, longitude: 80.2707 },
      imageUrl: 'https://images.pexels.com/photos/6995262/pexels-photo-6995262.jpeg?auto=compress&cs=tinysrgb&w=400',
      audioUrl: undefined,
      dialectVariant: undefined,
      culturalContext: 'Traditional eco-friendly utensil used in South Indian households',
      verificationStatus: 'verified',
      verificationScore: 4.6,
      upvotes: 31,
      downvotes: 4,
      dateAdded: '2024-01-12',
      views: 189,
      likes: 23
    },
    {
      id: '3',
      title: 'Wooden Tabla',
      description: 'Traditional Indian percussion instrument',
      category: 'Tools',
      nativeLabel: 'తబల',
      userDetails: { name: 'Ananya Reddy', email: 'ananya@example.com', language: 'Telugu' },
      coordinates: { latitude: 17.3850, longitude: 78.4867 },
      imageUrl: 'https://images.pexels.com/photos/6648606/pexels-photo-6648606.jpeg?auto=compress&cs=tinysrgb&w=400',
      audioUrl: undefined,
      dialectVariant: 'Hyderabadi Telugu',
      culturalContext: 'Classical Indian percussion instrument used in Carnatic music',
      verificationStatus: 'pending',
      verificationScore: 0,
      upvotes: 15,
      downvotes: 1,
      dateAdded: '2024-01-10',
      views: 312,
      likes: 41
    }
  ]);

  // Translation function
  const t = (key: string) => getTranslation(currentLanguage, key);

  // Available UI languages
  const uiLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    nativeLabel: '',
    dialectVariant: '',
    culturalContext: '',
    userDetails: { name: '', email: '', language: '' },
    coordinates: { latitude: 0, longitude: 0 },
    imageUrl: '',
    audioUrl: '',
    aiSuggestions: [],
    verificationStatus: 'pending' as const,
    verificationScore: 0,
    upvotes: 0,
    downvotes: 0,
    dateAdded: '',
    views: 0,
    likes: 0
  });

  const handleLogin = (user: UserData) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setShowIntro(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleCompleteIntro = () => {
    setShowIntro(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Audio recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        const audioUrl = URL.createObjectURL(blob);
        setFormData(prev => ({ ...prev, audioUrl }));
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (formData.audioUrl) {
      const audio = new Audio(formData.audioUrl);
      audio.play();
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imageUrl }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imageUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.imageUrl) {
      // Validate script if native label is provided
      if (formData.nativeLabel && formData.userDetails.language) {
        const isValidScript = validateLanguageScript(formData.nativeLabel, formData.userDetails.language);
        if (!isValidScript) {
          alert(`Script mismatch detected. Please ensure the label matches the selected language: ${formData.userDetails.language}`);
          return;
        }
      }

      const newObject: ObjectData = {
        id: Date.now().toString(),
        ...formData,
        dateAdded: new Date().toISOString().split('T')[0],
        verificationStatus: 'pending',
        verificationScore: 0,
        upvotes: 0,
        downvotes: 0,
        views: 0,
        likes: 0
      };
      setObjects(prev => [newObject, ...prev]);
      setFormData({
        title: '',
        description: '',
        category: '',
        nativeLabel: '',
        dialectVariant: '',
        culturalContext: '',
        userDetails: { name: '', email: '', language: '' },
        coordinates: { latitude: 0, longitude: 0 },
        imageUrl: '',
        audioUrl: '',
        aiSuggestions: [],
        verificationStatus: 'pending',
        verificationScore: 0,
        upvotes: 0,
        downvotes: 0,
        dateAdded: '',
        views: 0,
        likes: 0
      });
      setAudioBlob(null);
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const getLanguageScript = (languageName: string) => {
    const lang = languages.find(l => l.name === languageName);
    return lang ? lang.script : languageName;
  };

  const handleUpdateProfile = (updatedUser: UserData) => {
    setCurrentUser(updatedUser);
  };

  // Show intro if not logged in and intro hasn't been completed
  if (!isLoggedIn && showIntro) {
    return <IntroPage onComplete={handleCompleteIntro} t={t} isDarkMode={isDarkMode} />;
  }

  if (!isLoggedIn) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        t={t} 
        currentLanguage={currentLanguage} 
        onLanguageChange={setCurrentLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 to-slate-100'
    }`}>
      {/* Header */}
      <header className={`shadow-sm border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('login.title')}</h1>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('login.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={isDarkMode ? t('nav.lightMode') : t('nav.darkMode')}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className={`appearance-none px-3 py-2 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700 text-slate-200' 
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {uiLanguages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <Languages className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
              </div>
              
              <div className="flex items-center space-x-2">
                <User className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('common.welcome')}, {currentUser?.name}</span>
              </div>
              <nav className="flex space-x-1">
                <button
                  onClick={() => setCurrentView('upload')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    currentView === 'upload'
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                      : isDarkMode 
                      ? 'text-slate-300 hover:bg-slate-700' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  {t('nav.upload')}
                </button>
                <button
                  onClick={() => setCurrentView('gallery')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    currentView === 'gallery'
                      ? 'bg-teal-500 text-white shadow-lg shadow-teal-200'
                      : isDarkMode 
                      ? 'text-slate-300 hover:bg-slate-700' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4 inline mr-2" />
                  {t('nav.gallery')}
                </button>
                <button
                  onClick={() => setCurrentView('contributions')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    currentView === 'contributions'
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-200'
                      : isDarkMode 
                      ? 'text-slate-300 hover:bg-slate-700' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  {t('nav.contributions')}
                </button>
                <button
                  onClick={() => setCurrentView('profile')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    currentView === 'profile'
                      ? 'bg-slate-500 text-white shadow-lg shadow-slate-200'
                      : isDarkMode 
                      ? 'text-slate-300 hover:bg-slate-700' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <UserCircle className="w-4 h-4 inline mr-2" />
                  {t('nav.profile')}
                </button>
                <button
                  onClick={() => setCurrentView('feedback')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    currentView === 'feedback'
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200'
                      : isDarkMode 
                      ? 'text-slate-300 hover:bg-slate-700' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  {t('nav.feedback')}
                </button>
                <button
                  onClick={() => setCurrentView('leaderboard')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    currentView === 'leaderboard'
                      ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-200'
                      : isDarkMode 
                      ? 'text-slate-300 hover:bg-slate-700' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Trophy className="w-4 h-4 inline mr-2" />
                  {t('nav.leaderboard')}
                </button>
              </nav>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {t('nav.logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'upload' ? (
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-2xl shadow-xl overflow-hidden ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            }`}>
              <div className="bg-gradient-to-r from-orange-500 to-teal-500 px-8 py-6">
                <h2 className="text-2xl font-bold text-white mb-2">{t('upload.title')}</h2>
                <p className="text-orange-100">{t('upload.subtitle')}</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Image Upload */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    isDragging
                      ? 'border-orange-400' + (isDarkMode ? ' bg-orange-900/20' : ' bg-orange-50')
                      : (isDarkMode ? 'border-slate-600' : 'border-slate-300') + ' hover:border-orange-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {formData.imageUrl ? (
                    <div className="space-y-4">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('upload.imageUploaded')}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className={`w-16 h-16 mx-auto ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                      <div>
                        <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{t('upload.dragDrop')}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('upload.clickSelect')}</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer transition-colors"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        {t('upload.chooseFile')}
                      </label>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <FileText className="w-4 h-4 inline mr-2" />
                      {t('common.title')}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                      }`}
                      placeholder={t('upload.titlePlaceholder')}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <Tag className="w-4 h-4 inline mr-2" />
                      {t('common.category')}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="">{t('upload.selectCategory')}</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t('common.description')}</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                    rows={3}
                    placeholder={t('upload.descriptionPlaceholder')}
                  />
                </div>

                {/* Native Language Label */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Globe className="w-4 h-4 inline mr-2" />
                    {t('upload.nativeLabel')}
                  </label>
                  <input
                    type="text"
                    value={formData.nativeLabel}
                    onChange={(e) => setFormData(prev => ({ ...prev, nativeLabel: e.target.value }))}
                    onBlur={(e) => {
                      if (e.target.value && formData.userDetails.language) {
                        const detectedScript = detectScript(e.target.value);
                        console.log(`Detected script: ${detectedScript} for language: ${formData.userDetails.language}`);
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-lg ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                    placeholder={t('upload.nativeLabelPlaceholder')}
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  />
                  {formData.nativeLabel && (
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {t('upload.scriptDetected')}: {detectScript(formData.nativeLabel)}
                    </p>
                  )}
                </div>

                {/* Dialect Variant */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Globe className="w-4 h-4 inline mr-2" />
                    {t('upload.dialectVariant')}
                  </label>
                  <input
                    type="text"
                    value={formData.dialectVariant}
                    onChange={(e) => setFormData(prev => ({ ...prev, dialectVariant: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                    placeholder={t('upload.dialectPlaceholder')}
                  />
                </div>

                {/* Cultural Context */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Award className="w-4 h-4 inline mr-2" />
                    {t('upload.culturalContext')}
                  </label>
                  <textarea
                    value={formData.culturalContext}
                    onChange={(e) => setFormData(prev => ({ ...prev, culturalContext: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                    rows={3}
                    placeholder={t('upload.culturalPlaceholder')}
                  />
                </div>

                {/* Audio Recording */}
                <div className={`rounded-lg p-6 space-y-4 ${
                  isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'
                }`}>
                  <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    <Mic className="w-5 h-5 inline mr-2" />
                    {t('upload.pronunciation')}
                  </h3>
                  <div className="flex items-center space-x-4">
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        {t('upload.recordAudio')}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors animate-pulse"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        {t('upload.stopRecording')}
                      </button>
                    )}
                    {formData.audioUrl && (
                      <button
                        type="button"
                        onClick={playAudio}
                        className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {t('upload.playAudio')}
                      </button>
                    )}
                  </div>
                </div>

                {/* User Details */}
                <div className={`rounded-lg p-6 space-y-4 ${
                  isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'
                }`}>
                  <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{t('upload.userDetails')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        <User className="w-4 h-4 inline mr-2" />
                        {t('common.name')}
                      </label>
                      <input
                        type="text"
                        value={formData.userDetails.name}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          userDetails: { ...prev.userDetails, name: e.target.value }
                        }))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                          isDarkMode 
                            ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                        }`}
                        placeholder={t('upload.namePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Mail className="w-4 h-4 inline mr-2" />
                        {t('common.email')}
                      </label>
                      <input
                        type="email"
                        value={formData.userDetails.email}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          userDetails: { ...prev.userDetails, email: e.target.value }
                        }))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                          isDarkMode 
                            ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                        }`}
                        placeholder={t('upload.emailPlaceholder')}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <Globe className="w-4 h-4 inline mr-2" />
                      {t('common.language')}
                    </label>
                    <select
                      value={formData.userDetails.language}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        userDetails: { ...prev.userDetails, language: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-600 border-slate-500 text-white' 
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="">{t('upload.selectLanguage')}</option>
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.name}>
                          {lang.name} - {lang.script}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Coordinates */}
                <div className={`rounded-lg p-6 space-y-4 ${
                  isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{t('common.location')}</h3>
                    <button
                      type="button"
                      onClick={fetchLocation}
                      className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {t('upload.getLocation')}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t('upload.latitude')}</label>
                      <input
                        type="number"
                        step="any"
                        value={formData.coordinates.latitude}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          coordinates: { ...prev.coordinates, latitude: parseFloat(e.target.value) || 0 }
                        }))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                          isDarkMode 
                            ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                        }`}
                        placeholder="0.0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t('upload.longitude')}</label>
                      <input
                        type="number"
                        step="any"
                        value={formData.coordinates.longitude}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          coordinates: { ...prev.coordinates, longitude: parseFloat(e.target.value) || 0 }
                        }))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                          isDarkMode 
                            ? 'bg-slate-600 border-slate-500 text-white placeholder-slate-400' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                        }`}
                        placeholder="0.0000"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-lg hover:from-orange-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {t('upload.submitLabel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : currentView === 'gallery' ? (
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('gallery.title')}</h2>
              <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{t('gallery.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {objects.map((object) => (
                <div key={object.id} className={`rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 ${
                  isDarkMode ? 'bg-slate-800' : 'bg-white'
                }`}>
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={object.imageUrl}
                      alt={object.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{object.title}</h3>
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                        {object.category}
                      </span>
                    </div>

                    <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{object.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-teal-500" />
                        <span className="text-2xl font-medium" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          {object.nativeLabel}
                        </span>
                      </div>

                      {/* User and Language Info */}
                      <div className="flex items-center space-x-2">
                        <User className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{object.userDetails.name}</span>
                        <span className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>•</span>
                        <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{getLanguageScript(object.userDetails.language)}</span>
                      </div>
                      
                      {/* Location */}
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {object.coordinates.latitude.toFixed(4)}, {object.coordinates.longitude.toFixed(4)}
                        </span>
                      </div>

                      {/* Verification Status */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            object.verificationStatus === 'verified' ? 'bg-green-500' :
                            object.verificationStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className={`text-xs font-medium ${
                            object.verificationStatus === 'verified' ? 'text-green-600' :
                            object.verificationStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {object.verificationStatus === 'verified' ? 'Verified' :
                             object.verificationStatus === 'pending' ? 'Pending' : 'Flagged'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-3 h-3 text-green-500" />
                            <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{object.upvotes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsDown className="w-3 h-3 text-red-500" />
                            <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{object.downvotes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : currentView === 'contributions' ? (
          <ContributionsPage objects={objects} currentUser={currentUser} t={t} isDarkMode={isDarkMode} />
        ) : currentView === 'profile' ? (
          <ProfilePage 
            currentUser={currentUser} 
            objects={objects} 
            onUpdateProfile={handleUpdateProfile}
            t={t}
            isDarkMode={isDarkMode}
          />
        ) : currentView === 'feedback' ? (
          <FeedbackPage 
            currentUser={currentUser}
            t={t}
            isDarkMode={isDarkMode}
          />
        ) : currentView === 'leaderboard' ? (
          <LeaderboardPage 
            currentUser={currentUser}
            t={t}
            isDarkMode={isDarkMode}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;