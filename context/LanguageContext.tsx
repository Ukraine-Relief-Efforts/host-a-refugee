import { useEffect, useState, createContext } from 'react';
import { languageOptions } from '../models';

const getSavedValue = (key: string): any => {
  if (typeof window !== 'undefined') {
    const harData = window?.localStorage?.getItem('har');

    if (harData) {
      const res = JSON.parse(harData);
      return res[key];
    }
  }

  return undefined;
};

export const LanguageContext = createContext({});
export const LanguageProvider = ({ children }: any) => {
  const [language, setLanguage] = useState<languageOptions>(
    () => getSavedValue('lang') || 'eng'
  );

  useEffect(() => {
    localStorage.setItem('har', JSON.stringify({ lang: language }));
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
