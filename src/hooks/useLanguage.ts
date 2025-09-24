import { useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'pa';

interface Translations {
  en: {
    back: 'Back';
    loading: 'Loading SafeGuard Punjab...';
    backToLogin: 'Back to Login Type';
    backToRegistrationType: 'Back to Registration Type';
    previous: 'Previous';
    selectRole: 'Select Role';
    selectLanguage: 'Select Language';
    notifications: 'Notifications';
  };
  hi: {
    back: 'वापस';
    loading: 'सेफगार्ड पंजाब लोड हो रहा है...';
    backToLogin: 'लॉगिन प्रकार पर वापस जाएं';
    backToRegistrationType: 'पंजीकरण प्रकार पर वापस जाएं';
    previous: 'पिछला';
    selectRole: 'भूमिका चुनें';
    selectLanguage: 'भाषा चुनें';
    notifications: 'सूचनाएं';
  };
  pa: {
    back: 'ਵਾਪਸ';
    loading: 'ਸੇਫਗਾਰਡ ਪੰਜਾਬ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...';
    backToLogin: 'ਲਾਗਿਨ ਕਿਸਮ ਤੇ ਵਾਪਸ ਜਾਓ';
    backToRegistrationType: 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਕਿਸਮ ਤੇ ਵਾਪਸ ਜਾਓ';
    previous: 'ਪਿਛਲਾ';
    selectRole: 'ਭੂਮਿਕਾ ਚੁਣੋ';
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ';
    notifications: 'ਸੂਚਨਾਵਾਂ';
  };
}

const translations: Translations = {
  en: {
    back: 'Back',
    loading: 'Loading SafeGuard Punjab...',
    backToLogin: 'Back to Login Type',
    backToRegistrationType: 'Back to Registration Type',
    previous: 'Previous',
    selectRole: 'Select Role',
    selectLanguage: 'Select Language',
    notifications: 'Notifications',
  },
  hi: {
    back: 'वापस',
    loading: 'सेफगार्ड पंजाब लोड हो रहा है...',
    backToLogin: 'लॉगिन प्रकार पर वापस जाएं',
    backToRegistrationType: 'पंजीकरण प्रकार पर वापस जाएं',
    previous: 'पिछला',
    selectRole: 'भूमिका चुनें',
    selectLanguage: 'भाषा चुनें',
    notifications: 'सूचनाएं',
  },
  pa: {
    back: 'ਵਾਪਸ',
    loading: 'ਸੇਫਗਾਰਡ ਪੰਜਾਬ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    backToLogin: 'ਲਾਗਿਨ ਕਿਸਮ ਤੇ ਵਾਪਸ ਜਾਓ',
    backToRegistrationType: 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਕਿਸਮ ਤੇ ਵਾਪਸ ਜਾਓ',
    previous: 'ਪਿਛਲਾ',
    selectRole: 'ਭੂਮਿਕਾ ਚੁਣੋ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    notifications: 'ਸੂਚਨਾਵਾਂ',
  },
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: keyof Translations['en']) => {
    return translations[language][key];
  };

  return { language, setLanguage, t };
};