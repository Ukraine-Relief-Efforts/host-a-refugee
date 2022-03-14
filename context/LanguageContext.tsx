import Dispatch, { useEffect, useState, createContext } from 'react';
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

type LanguageContextType = {
  language: languageOptions;
  setLanguage: Dispatch.Dispatch<Dispatch.SetStateAction<languageOptions>>;
};

export const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType
);
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
