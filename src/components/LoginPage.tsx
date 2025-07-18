import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Tag, Globe, ArrowRight, User, UserPlus, Languages, Phone, Shield, Moon, Sun } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: { name: string; email: string }) => void;
  t: (key: string) => string;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, t, currentLanguage, onLanguageChange, isDarkMode, onToggleDarkMode }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    language: '',
    otp: ''
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

  const uiLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginMethod === 'otp' && !otpSent) {
      // Send OTP
      setOtpSent(true);
      setOtpTimer(60);
      const timer = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return;
    }
    
    if (isSignUp && loginMethod === 'password' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    onLogin({ name: formData.name || 'User', email: formData.email });
  };

  const handleResendOTP = () => {
    setOtpTimer(60);
    const timer = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-orange-50 to-teal-50'
    } flex items-center justify-center p-4`}>
      {/* Top Controls */}
      <div className="absolute top-6 right-6 z-20 flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className={`p-3 rounded-lg transition-all ${
            isDarkMode 
              ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
              : 'bg-white/90 text-slate-600 hover:bg-white'
          } backdrop-blur-sm shadow-lg border border-white/20`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {/* Language Selector */}
        <div className="relative">
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className={`appearance-none backdrop-blur-sm px-4 py-2 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-lg border border-white/20 ${
              isDarkMode 
                ? 'bg-slate-800 text-slate-200' 
                : 'bg-white/90 text-slate-700'
            }`}
          >
            {uiLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
          <Languages className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`} />
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute top-20 left-20 text-6xl ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}>हिन्दी</div>
        <div className={`absolute top-40 right-32 text-5xl ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`}>தமிழ்</div>
        <div className={`absolute bottom-32 left-32 text-4xl ${isDarkMode ? 'text-orange-300' : 'text-orange-400'}`}>తెలుగు</div>
        <div className={`absolute bottom-20 right-20 text-5xl ${isDarkMode ? 'text-teal-300' : 'text-teal-400'}`}>বাংলা</div>
        <div className={`absolute top-1/2 left-1/4 text-3xl ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ગુજરાતી</div>
        <div className={`absolute top-1/3 right-1/4 text-4xl ${isDarkMode ? 'text-orange-200' : 'text-orange-300'}`}>ಕನ್ನಡ</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <Tag className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('login.title')}</h1>
          <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{t('login.subtitle')}</p>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('login.tagline')}</p>
        </div>

        {/* Login/Signup Card */}
        <div className={`rounded-2xl shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-teal-500 px-8 py-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <button
                onClick={() => setIsSignUp(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  !isSignUp
                    ? 'bg-white text-orange-500 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                {t('login.login')}
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isSignUp
                    ? 'bg-white text-teal-500 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <UserPlus className="w-4 h-4 inline mr-2" />
                {t('login.signUp')}
              </button>
            </div>
            
            {/* Login Method Toggle */}
            {!isSignUp && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => {
                    setLoginMethod('password');
                    setOtpSent(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    loginMethod === 'password'
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Lock className="w-4 h-4 inline mr-1" />
                  {t('login.loginWithPassword')}
                </button>
                <button
                  onClick={() => {
                    setLoginMethod('otp');
                    setOtpSent(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    loginMethod === 'otp'
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Shield className="w-4 h-4 inline mr-1" />
                  {t('login.loginWithOTP')}
                </button>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <User className="w-4 h-4 inline mr-2" />
                  {t('login.fullName')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                  }`}
                  placeholder={t('login.fullNamePlaceholder')}
                  required={isSignUp}
                />
              </div>
            )}

            {/* Email or Phone based on login method */}
            {loginMethod === 'password' || isSignUp ? (
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Mail className="w-4 h-4 inline mr-2" />
                  {t('common.email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                  }`}
                  placeholder={t('login.emailPlaceholder')}
                  required
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Phone className="w-4 h-4 inline mr-2" />
                  {t('login.phoneNumber')}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                  }`}
                  placeholder={t('login.phoneNumberPlaceholder')}
                  required
                />
              </div>
            )}

            {/* Password or OTP field */}
            {loginMethod === 'password' || isSignUp ? (
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Lock className="w-4 h-4 inline mr-2" />
                  {t('login.password')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                    placeholder={t('login.passwordPlaceholder')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-slate-600 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ) : otpSent && (
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Shield className="w-4 h-4 inline mr-2" />
                  {t('login.otp')}
                </label>
                <input
                  type="text"
                  value={formData.otp}
                  onChange={(e) => handleInputChange('otp', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                  }`}
                  placeholder={t('login.otpPlaceholder')}
                  maxLength={6}
                  required
                />
                {otpTimer > 0 ? (
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Resend OTP in {otpTimer}s
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                  >
                    {t('login.resendOTP')}
                  </button>
                )}
              </div>
            )}

            {isSignUp && loginMethod === 'password' && (
              <>
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Lock className="w-4 h-4 inline mr-2" />
                    {t('login.confirmPassword')}
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                    }`}
                    placeholder={t('login.confirmPasswordPlaceholder')}
                    required={isSignUp}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <Globe className="w-4 h-4 inline mr-2" />
                    {t('login.preferredLanguage')}
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                    required={isSignUp}
                  >
                    <option value="">{t('login.selectLanguage')}</option>
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.name}>
                        {lang.name} - {lang.script}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {!isSignUp && loginMethod === 'password' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className={`rounded text-orange-500 focus:ring-orange-500 ${
                    isDarkMode ? 'border-slate-600 bg-slate-700' : 'border-slate-300 bg-white'
                  }`} />
                  <span className={`ml-2 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('login.rememberMe')}</span>
                </label>
                <button type="button" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                  {t('login.forgotPassword')}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-teal-500 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              {isSignUp 
                ? t('login.createAccount') 
                : loginMethod === 'otp' && !otpSent 
                ? t('login.sendOTP')
                : loginMethod === 'otp' && otpSent
                ? t('login.verifyOTP')
                : t('login.signIn')
              }
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>

            {isSignUp && (
              <div className="text-center">
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {t('login.termsAgreement')}{' '}
                  <button type="button" className="text-orange-500 hover:text-orange-600">{t('login.termsOfService')}</button>
                  {' '}{t('login.and')}{' '}
                  <button type="button" className="text-orange-500 hover:text-orange-600">{t('login.privacyPolicy')}</button>
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Cultural Quote */}
        <div className={`text-center mt-8 p-6 backdrop-blur-sm rounded-xl ${
          isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
        }`}>
          <p className={`italic mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {t('login.culturalQuote')}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {t('login.culturalQuoteTranslation')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;