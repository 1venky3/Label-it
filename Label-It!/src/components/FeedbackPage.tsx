import React, { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle, AlertCircle, Lightbulb, Bug, Heart, Zap } from 'lucide-react';

interface FeedbackPageProps {
  currentUser: { name: string; email: string } | null;
  t: (key: string) => string;
  isDarkMode: boolean;
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ currentUser, t, isDarkMode }) => {
  const [feedbackType, setFeedbackType] = useState<'general' | 'bug' | 'feature' | 'appreciation'>('general');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    email: currentUser?.email || '',
    name: currentUser?.name || '',
    category: '',
    priority: 'medium'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackTypes = [
    { id: 'general', icon: MessageSquare, color: 'blue', label: t('feedback.types.general') },
    { id: 'bug', icon: Bug, color: 'red', label: t('feedback.types.bug') },
    { id: 'feature', icon: Lightbulb, color: 'yellow', label: t('feedback.types.feature') },
    { id: 'appreciation', icon: Heart, color: 'pink', label: t('feedback.types.appreciation') }
  ];

  const priorities = [
    { value: 'low', label: t('feedback.priority.low'), color: 'green' },
    { value: 'medium', label: t('feedback.priority.medium'), color: 'yellow' },
    { value: 'high', label: t('feedback.priority.high'), color: 'orange' },
    { value: 'urgent', label: t('feedback.priority.urgent'), color: 'red' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        subject: '',
        message: '',
        email: currentUser?.email || '',
        name: currentUser?.name || '',
        category: '',
        priority: 'medium'
      });
      setRating(0);
      setFeedbackType('general');
    }, 3000);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      red: 'from-red-500 to-red-600',
      yellow: 'from-yellow-500 to-yellow-600',
      pink: 'from-pink-500 to-pink-600'
    };
    return colors[type as keyof typeof colors] || colors.blue;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      red: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[priority as keyof typeof colors] || colors.yellow;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-800">{t('feedback.success.title')}</h2>
            <p className="text-lg text-slate-600 max-w-md mx-auto">
              {t('feedback.success.message')}
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
            <Zap className="w-4 h-4" />
            <span>{t('feedback.success.response')}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('feedback.title')}</h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {t('feedback.subtitle')}
        </p>
      </div>

      {/* Feedback Type Selection */}
      <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('feedback.typeSelection')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {feedbackTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setFeedbackType(type.id as any)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  feedbackType === type.id
                    ? 'border-orange-500 bg-orange-50'
                    : feedbackType === type.id
                    ? 'border-orange-500 bg-orange-50'
                    : isDarkMode 
                    ? 'border-slate-600 hover:border-slate-500 bg-slate-700/50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(type.color)} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{type.label}</h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rating Section */}
      <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('feedback.rating.title')}</h3>
        <div className="text-center">
          <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('feedback.rating.subtitle')}</p>
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {rating > 0 && (
              <span>
                {rating === 1 && t('feedback.rating.poor')}
                {rating === 2 && t('feedback.rating.fair')}
                {rating === 3 && t('feedback.rating.good')}
                {rating === 4 && t('feedback.rating.very_good')}
                {rating === 5 && t('feedback.rating.excellent')}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Feedback Form */}
      <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('feedback.form.title')}</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {t('feedback.form.name')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                }`}
                placeholder={t('feedback.form.namePlaceholder')}
                required
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {t('feedback.form.email')}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                }`}
                placeholder={t('feedback.form.emailPlaceholder')}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {t('feedback.form.subject')}
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
              }`}
              placeholder={t('feedback.form.subjectPlaceholder')}
              required
            />
          </div>

          {feedbackType === 'bug' && (
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {t('feedback.form.priority')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {priorities.map((priority) => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      formData.priority === priority.value
                        ? getPriorityColor(priority.color)
                        : isDarkMode 
                        ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {priority.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {t('feedback.form.message')}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
              }`}
              rows={6}
              placeholder={t('feedback.form.messagePlaceholder')}
              required
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className={`flex items-center space-x-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <AlertCircle className="w-4 h-4" />
              <span>{t('feedback.form.privacy')}</span>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-lg hover:from-orange-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              <Send className="w-5 h-5 mr-2" />
              {t('feedback.form.submit')}
            </button>
          </div>
        </form>
      </div>

      {/* Additional Help */}
      <div className={`rounded-2xl p-6 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-slate-800 to-slate-700' 
          : 'bg-gradient-to-r from-slate-50 to-slate-100'
      }`}>
        <div className="text-center">
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('feedback.help.title')}</h3>
          <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('feedback.help.subtitle')}</p>
          <div className={`flex items-center justify-center space-x-6 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>{t('feedback.help.chat')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span>{t('feedback.help.faq')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;