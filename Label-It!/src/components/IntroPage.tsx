import React, { useState } from 'react';
import { ArrowRight, Upload, Users, Database, Globe, MapPin, Mic, Award, Zap, Play, ChevronRight } from 'lucide-react';

interface IntroPageProps {
  onComplete: () => void;
  t: (key: string) => string;
  isDarkMode: boolean;
}

const IntroPage: React.FC<IntroPageProps> = ({ onComplete, t, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Upload,
      title: t('intro.step1Title'),
      description: t('intro.step1Desc'),
      color: 'from-orange-500 to-orange-600',
      features: ['Multi-image upload', 'AI label suggestions', 'Script auto-detection', 'Audio pronunciation']
    },
    {
      icon: Users,
      title: t('intro.step2Title'),
      description: t('intro.step2Desc'),
      color: 'from-teal-500 to-teal-600',
      features: ['Peer review system', 'Upvote/downvote labels', 'Flag inappropriate content', 'Community moderation']
    },
    {
      icon: Database,
      title: t('intro.step3Title'),
      description: t('intro.step3Desc'),
      color: 'from-purple-500 to-purple-600',
      features: ['Open datasets', 'AI-ready format', 'Cultural preservation', 'Linguistic diversity']
    }
  ];

  const features = [
    { icon: Globe, text: t('intro.feature1') },
    { icon: Mic, text: t('intro.feature2') },
    { icon: MapPin, text: t('intro.feature3') },
    { icon: Users, text: t('intro.feature4') },
    { icon: Award, text: t('intro.feature5') },
    { icon: Zap, text: t('intro.feature6') },
    { icon: Database, text: t('intro.feature7') },
    { icon: Upload, text: t('intro.feature8') }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-orange-50 to-teal-50'
    }`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div className="absolute top-20 left-20 text-6xl text-orange-500 animate-pulse">हिन्दी</div>
        <div className="absolute top-40 right-32 text-5xl text-teal-500 animate-pulse delay-1000">தமிழ்</div>
        <div className="absolute bottom-32 left-32 text-4xl text-orange-400 animate-pulse delay-2000">తెలుగు</div>
        <div className="absolute bottom-20 right-20 text-5xl text-teal-400 animate-pulse delay-3000">বাংলা</div>
        <div className="absolute top-1/2 left-1/4 text-3xl text-slate-400 animate-pulse delay-4000">ગુજરાતી</div>
        <div className="absolute top-1/3 right-1/4 text-4xl text-orange-300 animate-pulse delay-5000">ಕನ್ನಡ</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl text-purple-400 animate-pulse delay-6000">മലയാളം</div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto">
          {currentStep === 0 && (
            <div className="text-center space-y-12">
              {/* Hero Section */}
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl shadow-2xl">
                  <Database className="w-12 h-12 text-white" />
                </div>
                <h1 className={`text-6xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  {t('intro.welcome')}
                </h1>
                <p className={`text-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} max-w-3xl mx-auto`}>
                  {t('intro.subtitle')}
                </p>
              </div>

              {/* Mission Statement */}
              <div className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white/80'} backdrop-blur-sm rounded-3xl p-10 shadow-2xl`}>
                <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  {t('intro.mission')}
                </p>
              </div>

              {/* Features Grid */}
              <div className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white/80'} backdrop-blur-sm rounded-3xl p-10 shadow-2xl`}>
                <h3 className={`text-3xl font-semibold mb-8 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  {t('intro.features')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className={`flex flex-col items-center space-y-3 p-6 rounded-2xl transition-all hover:scale-105 ${
                      isDarkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'
                    }`}>
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-sm text-center font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={nextStep}
                className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-2xl font-semibold text-xl hover:from-orange-600 hover:to-teal-600 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
              >
                <Play className="w-6 h-6 mr-3" />
                {t('common.getStarted')}
                <ArrowRight className="w-6 h-6 ml-3" />
              </button>
            </div>
          )}

          {currentStep > 0 && (
            <div className="space-y-10">
              {/* Progress Bar */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                {steps.map((_, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-4 h-4 rounded-full transition-all ${
                      index < currentStep 
                        ? 'bg-gradient-to-r from-orange-500 to-teal-500 scale-110' 
                        : index === currentStep 
                        ? 'bg-gradient-to-r from-orange-400 to-teal-400 scale-125' 
                        : isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                    }`}></div>
                    {index < steps.length - 1 && (
                      <div className={`w-20 h-1 mx-3 rounded-full ${
                        index < currentStep - 1 
                          ? 'bg-gradient-to-r from-orange-500 to-teal-500' 
                          : isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Current Step */}
              <div className="text-center">
                <div className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white/90'} backdrop-blur-sm rounded-3xl p-16 shadow-2xl max-w-4xl mx-auto`}>
                  <div className={`inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br ${steps[currentStep - 1].color} rounded-3xl mb-10 shadow-2xl`}>
                    {React.createElement(steps[currentStep - 1].icon, { className: "w-16 h-16 text-white" })}
                  </div>
                  
                  <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    {steps[currentStep - 1].title}
                  </h2>
                  
                  <p className={`text-xl leading-relaxed mb-10 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {steps[currentStep - 1].description}
                  </p>

                  {/* Feature List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {steps[currentStep - 1].features.map((feature, index) => (
                      <div key={index} className={`flex items-center space-x-3 p-4 rounded-xl ${
                        isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'
                      }`}>
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full"></div>
                        <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center space-x-6 mt-10">
                  {currentStep > 1 && (
                    <button
                      onClick={prevStep}
                      className={`px-8 py-4 rounded-xl font-medium transition-all ${
                        isDarkMode 
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {t('common.previous')}
                    </button>
                  )}
                  
                  <button
                    onClick={nextStep}
                    className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {currentStep === steps.length ? t('common.getStarted') : t('common.next')}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>

                {/* Skip Option */}
                <button
                  onClick={onComplete}
                  className={`mt-6 text-sm font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-slate-400 hover:text-slate-300' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t('common.skip')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroPage;