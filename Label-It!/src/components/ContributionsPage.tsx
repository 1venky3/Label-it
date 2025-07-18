import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Globe, Tag, TrendingUp, Award, Users, Eye } from 'lucide-react';

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

interface ContributionsPageProps {
  objects: ObjectData[];
  currentUser: { name: string; email: string } | null;
  t: (key: string) => string;
  isDarkMode: boolean;
}

const ContributionsPage: React.FC<ContributionsPageProps> = ({ objects, currentUser, t, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['Electronics', 'Furniture', 'Clothing', 'Kitchen Items', 'Tools', 'Books', 'Toys', 'Plants', 'Vehicles', 'Food Items'];
  const languages = ['Hindi', 'Tamil', 'Telugu', 'Bengali', 'Gujarati', 'Kannada', 'Malayalam', 'Marathi', 'Punjabi', 'Odia'];

  // Filter and sort objects
  const filteredObjects = objects
    .filter(obj => {
      const matchesSearch = obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           obj.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           obj.nativeLabel.includes(searchTerm);
      const matchesCategory = !selectedCategory || obj.category === selectedCategory;
      const matchesLanguage = !selectedLanguage || obj.userDetails.language === selectedLanguage;
      return matchesSearch && matchesCategory && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.views + b.likes) - (a.views + a.likes);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  // Statistics
  const totalContributions = objects.length;
  const totalLanguages = new Set(objects.map(obj => obj.userDetails.language)).size;
  const totalCategories = new Set(objects.map(obj => obj.category)).size;
  const totalViews = objects.reduce((sum, obj) => sum + obj.views, 0);

  const getLanguageScript = (languageName: string) => {
    const scripts: { [key: string]: string } = {
      'Hindi': 'हिन्दी',
      'Tamil': 'தமிழ்',
      'Telugu': 'తెలుగు',
      'Bengali': 'বাংলা',
      'Gujarati': 'ગુજરાતી',
      'Kannada': 'ಕನ್ನಡ',
      'Malayalam': 'മലയാളം',
      'Marathi': 'मराठी',
      'Punjabi': 'ਪੰਜਾਬੀ',
      'Odia': 'ଓଡ଼ିଆ'
    };
    return scripts[languageName] || languageName;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('contributions.title')}</h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {t('contributions.subtitle')}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">{t('contributions.totalObjects')}</p>
              <p className="text-3xl font-bold">{totalContributions}</p>
            </div>
            <Tag className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm font-medium">{t('contributions.languages')}</p>
              <p className="text-3xl font-bold">{totalLanguages}</p>
            </div>
            <Globe className="w-8 h-8 text-teal-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-100 text-sm font-medium">{t('contributions.categories')}</p>
              <p className="text-3xl font-bold">{totalCategories}</p>
            </div>
            <Award className="w-8 h-8 text-slate-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">{t('contributions.totalViews')}</p>
              <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder={t('contributions.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
              }`}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
              isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-white' 
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            <option value="">{t('contributions.allCategories')}</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
              isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-white' 
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            <option value="">{t('contributions.allLanguages')}</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang} - {getLanguageScript(lang)}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all ${
              isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-white' 
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            <option value="recent">{t('contributions.mostRecent')}</option>
            <option value="popular">{t('contributions.mostPopular')}</option>
            <option value="alphabetical">{t('contributions.alphabetical')}</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
          {t('contributions.showing')} {filteredObjects.length} {t('contributions.of')} {totalContributions} {t('contributions.objects')}
        </p>
        <div className={`flex items-center space-x-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <Filter className="w-4 h-4" />
          <span>{t('contributions.filteredBy')}: {selectedCategory || t('contributions.all')} • {selectedLanguage || t('contributions.allLanguages')}</span>
        </div>
      </div>

      {/* Objects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredObjects.map((object) => (
          <div key={object.id} className={`rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 group ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="relative">
              <img
                src={object.imageUrl}
                alt={object.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-slate-600">
                {object.category}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className={`text-lg font-semibold mb-2 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{object.title}</h3>
              <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{object.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {object.nativeLabel}
                  </span>
                </div>
                
                <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(object.dateAdded).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{object.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{object.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center justify-between pt-2 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-teal-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {object.userDetails.name.charAt(0)}
                    </div>
                    <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{object.userDetails.name}</span>
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{getLanguageScript(object.userDetails.language)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredObjects.length === 0 && (
        <div className="text-center py-12">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
          }`}>
            <Search className={`w-12 h-12 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('contributions.noObjectsFound')}</h3>
          <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{t('contributions.adjustCriteria')}</p>
        </div>
      )}
    </div>
  );
};

export default ContributionsPage;