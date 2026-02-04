import React, { createContext, useContext, useState, useEffect } from 'react';
import content from '../data/content.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // 'en' or 'ar'
  const [currency, setCurrency] = useState('EGP'); // 'EGP' or 'USD'
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Initialize theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Initialize Language Direction
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'EGP' ? 'USD' : 'EGP');
  };

  const t = (path) => {
    const keys = path.split('.');
    let current = content[language];
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  const formatPrice = (priceInEGP) => {
    if (!priceInEGP) return content[language].collection.priceRequest;

    if (currency === 'EGP') {
      return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(priceInEGP);
    } else {
      const priceInUSD = priceInEGP * content.settings.exchangeRate;
      return new Intl.NumberFormat(language === 'ar' ? 'ar-US' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(priceInUSD);
    }
  };

  const value = {
    language,
    currency,
    theme,
    toggleTheme,
    toggleLanguage,
    toggleCurrency,
    t,
    formatPrice,
    content
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
