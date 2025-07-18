export interface Translations {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
}

export const translations: Translations = {
  en: {
    // Navigation
    nav: {
      upload: 'Upload',
      gallery: 'Gallery',
      contributions: 'Contributions',
      profile: 'Profile',
      feedback: 'Feedback',
      leaderboard: 'Leaderboard',
      logout: 'Logout',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode'
    },
    
    // Common
    common: {
      welcome: 'Welcome',
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      submit: 'Submit',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      name: 'Name',
      email: 'Email',
      language: 'Language',
      category: 'Category',
      title: 'Title',
      description: 'Description',
      location: 'Location',
      date: 'Date',
      next: 'Next',
      previous: 'Previous',
      skip: 'Skip',
      getStarted: 'Get Started',
      verify: 'Verify',
      approve: 'Approve',
      reject: 'Reject',
      flag: 'Flag',
      upvote: 'Upvote',
      downvote: 'Downvote',
      points: 'Points',
      badges: 'Badges',
      rank: 'Rank'
    },

    // Intro
    intro: {
      welcome: 'Welcome to Label-It',
      subtitle: 'Building AI-Ready Datasets for India\'s Linguistic Heritage',
      step1Title: 'Upload & Label Objects',
      step1Desc: 'Capture everyday objects and label them in your native Indian language',
      step2Title: 'Community Verification',
      step2Desc: 'Help verify and improve labels through peer review and voting',
      step3Title: 'Build AI Datasets',
      step3Desc: 'Contribute to open, diverse datasets that reflect India\'s cultural richness',
      mission: 'Our mission is to create comprehensive, culturally-aware AI datasets by harnessing the collective knowledge of India\'s diverse linguistic communities.',
      features: 'Key Features',
      feature1: 'Multi-script support with auto-detection',
      feature2: 'Audio pronunciation recording',
      feature3: 'Interactive geo-tagging with maps',
      feature4: 'Community verification system',
      feature5: 'Gamification with badges and leaderboards',
      feature6: 'AI-powered label suggestions',
      feature7: 'Dialect and regional variants',
      feature8: 'Offline-first data collection'
    },

    // Upload Page
    upload: {
      title: 'Upload & Label Object',
      subtitle: 'Contribute to India\'s linguistic AI dataset',
      dragDrop: 'Drop your images here',
      clickSelect: 'or click to select files',
      chooseFiles: 'Choose Files',
      imagesUploaded: 'Images uploaded successfully!',
      titlePlaceholder: 'Enter object title',
      descriptionPlaceholder: 'Describe the object and its use...',
      nativeLabel: 'Native Language Label',
      nativeLabelPlaceholder: 'Enter label in your native language',
      dialectVariant: 'Dialect/Regional Variant',
      dialectPlaceholder: 'Optional: Local dialect name',
      culturalContext: 'Cultural Context',
      culturalPlaceholder: 'Describe cultural or regional significance...',
      pronunciation: 'Pronunciation Recording',
      recordAudio: 'Record Audio',
      playAudio: 'Play Recording',
      stopRecording: 'Stop Recording',
      userDetails: 'User Details',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      selectLanguage: 'Select language',
      selectCategory: 'Select category',
      geoTagging: 'Geo Location',
      getCurrentLocation: 'Get Current Location',
      pinOnMap: 'Pin on Map',
      latitude: 'Latitude',
      longitude: 'Longitude',
      aiSuggestions: 'AI Suggestions',
      acceptSuggestion: 'Accept',
      editSuggestion: 'Edit',
      scriptDetected: 'Script detected',
      submitLabel: 'Submit for Review',
      offlineMode: 'Offline Mode',
      syncWhenOnline: 'Will sync when online'
    },

    // Gallery Page
    gallery: {
      title: 'Community Gallery',
      subtitle: 'Explore verified objects labeled in Indian languages',
      verified: 'Verified',
      pending: 'Pending Review',
      flagged: 'Flagged',
      playPronunciation: 'Play Pronunciation',
      viewOnMap: 'View on Map',
      culturalInfo: 'Cultural Context',
      dialectInfo: 'Dialect Variant',
      verificationScore: 'Verification Score',
      contributedBy: 'Contributed by'
    },

    // Contributions Page
    contributions: {
      title: 'Community Contributions',
      subtitle: 'Explore and verify the rich collection of labeled objects',
      totalObjects: 'Total Objects',
      languages: 'Languages',
      categories: 'Categories',
      totalViews: 'Total Views',
      verifiedObjects: 'Verified Objects',
      pendingReview: 'Pending Review',
      searchPlaceholder: 'Search objects...',
      allCategories: 'All Categories',
      allLanguages: 'All Languages',
      allStatuses: 'All Statuses',
      mostRecent: 'Most Recent',
      mostPopular: 'Most Popular',
      highestRated: 'Highest Rated',
      alphabetical: 'Alphabetical',
      showing: 'Showing',
      of: 'of',
      objects: 'objects',
      filteredBy: 'Filtered by',
      all: 'All',
      noObjectsFound: 'No objects found',
      adjustCriteria: 'Try adjusting your search criteria or filters',
      reviewObject: 'Review Object',
      verificationStatus: 'Verification Status'
    },

    // Profile Page
    profile: {
      editProfile: 'Edit Profile',
      personalInfo: 'Personal Information',
      fullName: 'Full Name',
      preferredLanguage: 'Preferred Language',
      memberSince: 'Member Since',
      recentContributions: 'Recent Contributions',
      total: 'total',
      totalContributions: 'Total Contributions',
      objectsLabeled: 'Objects labeled',
      verifiedLabels: 'Verified Labels',
      communityPoints: 'Community Points',
      currentRank: 'Current Rank',
      badgesEarned: 'Badges Earned',
      achievementProgress: 'Achievement Progress',
      noContributions: 'No contributions yet',
      startUploading: 'Start by uploading your first object!',
      uploadObject: 'Upload Object',
      viewAll: 'View all',
      contributions: 'contributions',
      reviewActivity: 'Review Activity',
      helpfulReviews: 'Helpful Reviews'
    },

    // Leaderboard Page
    leaderboard: {
      title: 'Community Leaderboard',
      subtitle: 'Top contributors building India\'s linguistic AI dataset',
      topContributors: 'Top Contributors',
      topReviewers: 'Top Reviewers',
      languageChampions: 'Language Champions',
      weeklyLeaders: 'Weekly Leaders',
      monthlyLeaders: 'Monthly Leaders',
      allTimeLeaders: 'All Time Leaders',
      yourRank: 'Your Rank',
      contributions: 'Contributions',
      reviews: 'Reviews',
      accuracy: 'Accuracy',
      languages: 'Languages'
    },

    // Badges
    badges: {
      firstUpload: 'First Upload',
      tenUploads: '10 Objects Club',
      hundredUploads: '100 Objects Club',
      scriptMaster: 'Script Master',
      culturalExpert: 'Cultural Expert',
      communityHelper: 'Community Helper',
      verificationExpert: 'Verification Expert',
      multiLingual: 'Multi-lingual Contributor',
      audioContributor: 'Audio Contributor',
      geoExplorer: 'Geo Explorer'
    },

    // Verification
    verification: {
      reviewTitle: 'Review Object Label',
      labelAccuracy: 'Label Accuracy',
      scriptCorrectness: 'Script Correctness',
      culturalRelevance: 'Cultural Relevance',
      pronunciationQuality: 'Pronunciation Quality',
      overallRating: 'Overall Rating',
      reviewComments: 'Review Comments',
      submitReview: 'Submit Review',
      flagContent: 'Flag Content',
      flagReason: 'Reason for flagging',
      inappropriate: 'Inappropriate content',
      incorrect: 'Incorrect information',
      spam: 'Spam or duplicate',
      other: 'Other'
    },

    // Login Page
    login: {
      title: 'Label-It',
      subtitle: 'Building AI datasets for Indian languages',
      tagline: 'Preserve culture through technology',
      login: 'Login',
      signUp: 'Sign Up',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      phoneNumber: 'Phone Number',
      phoneNumberPlaceholder: 'Enter your phone number',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      otp: 'OTP',
      otpPlaceholder: 'Enter 6-digit OTP',
      preferredLanguage: 'Preferred Language',
      selectLanguage: 'Select your language',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      createAccount: 'Create Account',
      signIn: 'Sign In',
      sendOTP: 'Send OTP',
      verifyOTP: 'Verify OTP',
      resendOTP: 'Resend OTP',
      loginWithPassword: 'Login with Password',
      loginWithOTP: 'Login with OTP',
      termsAgreement: 'By signing up, you agree to our',
      termsOfService: 'Terms of Service',
      and: 'and',
      privacyPolicy: 'Privacy Policy',
      culturalQuote: '"भाषा संस्कृति की आत्मा है"',
      culturalQuoteTranslation: '"Language is the soul of culture"'
    }
  },

  hi: {
    // Navigation
    nav: {
      upload: 'अपलोड',
      gallery: 'गैलरी',
      contributions: 'योगदान',
      profile: 'प्रोफ़ाइल',
      feedback: 'फीडबैक',
      leaderboard: 'लीडरबोर्ड',
      logout: 'लॉगआउट',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड'
    },
    
    // Common
    common: {
      welcome: 'स्वागत',
      loading: 'लोड हो रहा है...',
      save: 'सेव',
      cancel: 'रद्द',
      edit: 'संपादित',
      delete: 'हटाएं',
      submit: 'जमा करें',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      sort: 'क्रमबद्ध',
      name: 'नाम',
      email: 'ईमेल',
      language: 'भाषा',
      category: 'श्रेणी',
      title: 'शीर्षक',
      description: 'विवरण',
      location: 'स्थान',
      date: 'दिनांक',
      next: 'अगला',
      previous: 'पिछला',
      skip: 'छोड़ें',
      getStarted: 'शुरू करें',
      verify: 'सत्यापित करें',
      approve: 'स्वीकार करें',
      reject: 'अस्वीकार करें',
      flag: 'फ्लैग करें',
      upvote: 'अपवोट',
      downvote: 'डाउनवोट',
      points: 'अंक',
      badges: 'बैज',
      rank: 'रैंक'
    },

    // Login Page
    login: {
      title: 'Label-It',
      subtitle: 'भारतीय भाषाओं के लिए AI डेटासेट बनाना',
      tagline: 'तकनीक के माध्यम से संस्कृति का संरक्षण',
      login: 'लॉगिन',
      signUp: 'साइन अप',
      fullName: 'पूरा नाम',
      fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      phoneNumber: 'फोन नंबर',
      phoneNumberPlaceholder: 'अपना फोन नंबर दर्ज करें',
      password: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      confirmPasswordPlaceholder: 'अपने पासवर्ड की पुष्टि करें',
      otp: 'OTP',
      otpPlaceholder: '6-अंकीय OTP दर्ज करें',
      preferredLanguage: 'पसंदीदा भाषा',
      selectLanguage: 'अपनी भाषा चुनें',
      rememberMe: 'मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      createAccount: 'खाता बनाएं',
      signIn: 'साइन इन',
      sendOTP: 'OTP भेजें',
      verifyOTP: 'OTP सत्यापित करें',
      resendOTP: 'OTP पुनः भेजें',
      loginWithPassword: 'पासवर्ड से लॉगिन',
      loginWithOTP: 'OTP से लॉगिन',
      culturalQuote: '"भाषा संस्कृति की आत्मा है"',
      culturalQuoteTranslation: '"Language is the soul of culture"'
    }
  },

  ta: {
    nav: {
      upload: 'பதிவேற்று',
      gallery: 'கேலரி',
      contributions: 'பங்களிப்புகள்',
      profile: 'சுயவிவரம்',
      feedback: 'கருத்து',
      leaderboard: 'தலைமை பலகை',
      logout: 'வெளியேறு',
      darkMode: 'இருண்ட பயன்முறை',
      lightMode: 'ஒளி பயன்முறை'
    },
    common: {
      welcome: 'வரவேற்கிறோம்',
      loading: 'ஏற்றுகிறது...',
      save: 'சேமி',
      cancel: 'ரத்து',
      edit: 'திருத்து',
      delete: 'நீக்கு',
      submit: 'சமர்ப்பி',
      search: 'தேடு',
      filter: 'வடிகட்டு',
      sort: 'வரிசைப்படுத்து',
      name: 'பெயர்',
      email: 'மின்னஞ்சல்',
      language: 'மொழி',
      category: 'வகை',
      title: 'தலைப்பு',
      description: 'விளக்கம்',
      location: 'இடம்',
      date: 'தேதி',
      next: 'அடுத்து',
      previous: 'முந்தைய',
      skip: 'தவிர்',
      getStarted: 'தொடங்கு'
    },
    login: {
      title: 'Label-It',
      subtitle: 'தமிழ் மொழிகளுக்கான AI தரவுத்தளங்களை உருவாக்குதல்',
      tagline: 'தொழில்நுட்பத்தின் மூலம் கலாச்சாரத்தைப் பாதுகாக்கவும்',
      phoneNumber: 'தொலைபேசி எண்',
      phoneNumberPlaceholder: 'உங்கள் தொலைபேசி எண்ணை உள்ளிடுங்கள்',
      otp: 'OTP',
      otpPlaceholder: '6-இலக்க OTP ஐ உள்ளிடுங்கள்',
      sendOTP: 'OTP அனுப்பவும்',
      verifyOTP: 'OTP ஐ சரிபார்க்கவும்',
      resendOTP: 'OTP ஐ மீண்டும் அனுப்பவும்',
      loginWithPassword: 'கடவுச்சொல்லுடன் உள்நுழைக',
      loginWithOTP: 'OTP உடன் உள்நுழைக'
    }
  },

  te: {
    nav: {
      upload: 'అప్‌లోడ్',
      gallery: 'గ్యాలరీ',
      contributions: 'సహకారాలు',
      profile: 'ప్రొఫైల్',
      feedback: 'అభిప్రాయం',
      leaderboard: 'లీడర్‌బోర్డ్',
      logout: 'లాగ్ అవుట్',
      darkMode: 'డార్క్ మోడ్',
      lightMode: 'లైట్ మోడ్'
    },
    common: {
      welcome: 'స్వాగతం',
      loading: 'లోడ్ అవుతోంది...',
      save: 'సేవ్',
      cancel: 'రద్దు',
      edit: 'సవరించు',
      delete: 'తొలగించు',
      submit: 'సమర్పించు',
      search: 'వెతుకు',
      filter: 'ఫిల్టర్',
      sort: 'క్రమబద్ధీకరించు',
      name: 'పేరు',
      email: 'ఇమెయిల్',
      language: 'భాష',
      category: 'వర్గం',
      title: 'శీర్షిక',
      description: 'వివరణ',
      location: 'స్థానం',
      date: 'తేదీ',
      next: 'తదుపరి',
      previous: 'మునుపటి',
      skip: 'దాటవేయి',
      getStarted: 'ప్రారంభించు'
    },
    login: {
      title: 'Label-It',
      subtitle: 'తెలుగు భాషల కోసం AI డేటాసెట్‌లను నిర్మించడం',
      tagline: 'సాంకేతికత ద్వారా సంస్కృతిని సంరక్షించండి',
      phoneNumber: 'ఫోన్ నంబర్',
      phoneNumberPlaceholder: 'మీ ఫోన్ నంబర్‌ను నమోదు చేయండి',
      otp: 'OTP',
      otpPlaceholder: '6-అంకెల OTP ను నమోదు చేయండి',
      sendOTP: 'OTP పంపు',
      verifyOTP: 'OTP ధృవీకరించు',
      resendOTP: 'OTP మళ్లీ పంపు',
      loginWithPassword: 'పాస్‌వర్డ్‌తో లాగిన్',
      loginWithOTP: 'OTP తో లాగిన్'
    }
  },

  ml: {
    nav: {
      upload: 'അപ്‌ലോഡ്',
      gallery: 'ഗാലറി',
      contributions: 'സംഭാവനകൾ',
      profile: 'പ്രൊഫൈൽ',
      feedback: 'ഫീഡ്‌ബാക്ക്',
      leaderboard: 'ലീഡർബോർഡ്',
      logout: 'ലോഗ് ഔട്ട്',
      darkMode: 'ഡാർക്ക് മോഡ്',
      lightMode: 'ലൈറ്റ് മോഡ്'
    },
    common: {
      welcome: 'സ്വാഗതം',
      loading: 'ലോഡ് ചെയ്യുന്നു...',
      save: 'സേവ്',
      cancel: 'റദ്ദാക്കുക',
      edit: 'എഡിറ്റ്',
      delete: 'ഇല്ലാതാക്കുക',
      submit: 'സമർപ്പിക്കുക',
      search: 'തിരയുക',
      filter: 'ഫിൽട്ടർ',
      sort: 'ക്രമീകരിക്കുക',
      name: 'പേര്',
      email: 'ഇമെയിൽ',
      language: 'ഭാഷ',
      category: 'വിഭാഗം',
      title: 'ശീർഷകം',
      description: 'വിവരണം',
      location: 'സ്ഥലം',
      date: 'തീയതി',
      next: 'അടുത്തത്',
      previous: 'മുമ്പത്തെ',
      skip: 'ഒഴിവാക്കുക',
      getStarted: 'ആരംഭിക്കുക'
    },
    login: {
      title: 'Label-It',
      subtitle: 'മലയാളം ഭാഷകൾക്കായി AI ഡാറ്റാസെറ്റുകൾ നിർമ്മിക്കുന്നു',
      tagline: 'സാങ്കേതികവിദ്യയിലൂടെ സംസ്കാരം സംരക്ഷിക്കുക',
      phoneNumber: 'ഫോൺ നമ്പർ',
      phoneNumberPlaceholder: 'നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക',
      otp: 'OTP',
      otpPlaceholder: '6-അക്ക OTP നൽകുക',
      sendOTP: 'OTP അയയ്ക്കുക',
      verifyOTP: 'OTP പരിശോധിക്കുക',
      resendOTP: 'OTP വീണ്ടും അയയ്ക്കുക',
      loginWithPassword: 'പാസ്‌വേഡ് ഉപയോഗിച്ച് ലോഗിൻ',
      loginWithOTP: 'OTP ഉപയോഗിച്ച് ലോഗിൻ'
    }
  },

  kn: {
    nav: {
      upload: 'ಅಪ್‌ಲೋಡ್',
      gallery: 'ಗ್ಯಾಲರಿ',
      contributions: 'ಕೊಡುಗೆಗಳು',
      profile: 'ಪ್ರೊಫೈಲ್',
      feedback: 'ಪ್ರತಿಕ್ರಿಯೆ',
      leaderboard: 'ಲೀಡರ್‌ಬೋರ್ಡ್',
      logout: 'ಲಾಗ್ ಔಟ್',
      darkMode: 'ಡಾರ್ಕ್ ಮೋಡ್',
      lightMode: 'ಲೈಟ್ ಮೋಡ್'
    },
    common: {
      welcome: 'ಸ್ವಾಗತ',
      loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      save: 'ಉಳಿಸು',
      cancel: 'ರದ್ದುಮಾಡು',
      edit: 'ಸಂಪಾದಿಸು',
      delete: 'ಅಳಿಸು',
      submit: 'ಸಲ್ಲಿಸು',
      search: 'ಹುಡುಕು',
      filter: 'ಫಿಲ್ಟರ್',
      sort: 'ವಿಂಗಡಿಸು',
      name: 'ಹೆಸರು',
      email: 'ಇಮೇಲ್',
      language: 'ಭಾಷೆ',
      category: 'ವರ್ಗ',
      title: 'ಶೀರ್ಷಿಕೆ',
      description: 'ವಿವರಣೆ',
      location: 'ಸ್ಥಳ',
      date: 'ದಿನಾಂಕ',
      next: 'ಮುಂದೆ',
      previous: 'ಹಿಂದೆ',
      skip: 'ಬಿಟ್ಟುಬಿಡು',
      getStarted: 'ಪ್ರಾರಂಭಿಸು'
    },
    login: {
      title: 'Label-It',
      subtitle: 'ಕನ್ನಡ ಭಾಷೆಗಳಿಗಾಗಿ AI ಡೇಟಾಸೆಟ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವುದು',
      tagline: 'ತಂತ್ರಜ್ಞಾನದ ಮೂಲಕ ಸಂಸ್ಕೃತಿಯನ್ನು ಸಂರಕ್ಷಿಸಿ',
      phoneNumber: 'ಫೋನ್ ಸಂಖ್ಯೆ',
      phoneNumberPlaceholder: 'ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
      otp: 'OTP',
      otpPlaceholder: '6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ',
      sendOTP: 'OTP ಕಳುಹಿಸಿ',
      verifyOTP: 'OTP ಪರಿಶೀಲಿಸಿ',
      resendOTP: 'OTP ಮರುಕಳುಹಿಸಿ',
      loginWithPassword: 'ಪಾಸ್‌ವರ್ಡ್‌ನೊಂದಿಗೆ ಲಾಗಿನ್',
      loginWithOTP: 'OTP ಯೊಂದಿಗೆ ಲಾಗಿನ್'
    }
  }
};

export const getTranslation = (language: string, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[language] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return typeof value === 'string' ? value : key;
};

// Script detection utility
export const detectScript = (text: string): string => {
  const scripts = {
    devanagari: /[\u0900-\u097F]/,
    tamil: /[\u0B80-\u0BFF]/,
    telugu: /[\u0C00-\u0C7F]/,
    kannada: /[\u0C80-\u0CFF]/,
    malayalam: /[\u0D00-\u0D7F]/,
    gujarati: /[\u0A80-\u0AFF]/,
    bengali: /[\u0980-\u09FF]/,
    punjabi: /[\u0A00-\u0A7F]/,
    odia: /[\u0B00-\u0B7F]/
  };

  for (const [script, regex] of Object.entries(scripts)) {
    if (regex.test(text)) {
      return script;
    }
  }
  return 'latin';
};

// Language validation
export const validateLanguageScript = (text: string, selectedLanguage: string): boolean => {
  const languageScriptMap: { [key: string]: string } = {
    'Hindi': 'devanagari',
    'Tamil': 'tamil',
    'Telugu': 'telugu',
    'Kannada': 'kannada',
    'Malayalam': 'malayalam',
    'Gujarati': 'gujarati',
    'Bengali': 'bengali',
    'Punjabi': 'punjabi',
    'Odia': 'odia'
  };

  const expectedScript = languageScriptMap[selectedLanguage];
  const detectedScript = detectScript(text);
  
  return !expectedScript || detectedScript === expectedScript || detectedScript === 'latin';
};