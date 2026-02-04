import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { t, toggleTheme, toggleLanguage, toggleCurrency, theme, language, currency } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e6e3db] dark:border-[#3a352a] bg-white/90 dark:bg-[#221d10]/90 backdrop-blur-md px-6 py-4 lg:px-12 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[32px]">directions_car</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#181611] dark:text-white">Rags Auto</h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center gap-10">
          <Link to="/inventory" className="text-sm font-medium hover:text-primary transition-colors duration-200 text-[#181611] dark:text-[#e6e3db]">
            {t('nav.inventory')}
          </Link>
          <Link to="/services" className="text-sm font-medium hover:text-primary transition-colors duration-200 text-[#181611] dark:text-[#e6e3db]">
            {t('nav.services')}
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors duration-200 text-[#181611] dark:text-[#e6e3db]">
            {t('nav.about')}
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors duration-200 text-[#181611] dark:text-[#e6e3db]">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Toggles */}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" title="Toggle Theme">
             <span className="material-symbols-outlined text-[#181611] dark:text-white">
               {theme === 'dark' ? 'light_mode' : 'dark_mode'}
             </span>
          </button>
          <button onClick={toggleLanguage} className="px-2 py-1 text-sm font-bold text-[#181611] dark:text-white hover:text-primary transition-colors border border-transparent hover:border-primary rounded" title="Toggle Language">
            {language === 'en' ? 'AR' : 'EN'}
          </button>
          <button onClick={toggleCurrency} className="px-2 py-1 text-sm font-bold text-[#181611] dark:text-white hover:text-primary transition-colors border border-transparent hover:border-primary rounded" title="Toggle Currency">
            {currency === 'EGP' ? 'USD' : 'L.E'}
          </button>

          <span className="material-symbols-outlined text-[#181611] dark:text-white cursor-pointer hover:text-primary transition-colors">search</span>
          <Link to="/contact" className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-6 py-2.5 text-[#181611] text-sm font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
             {t('nav.inquire')}
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-4">
           {/* Mobile Toggles (simplified) */}
            <button onClick={toggleLanguage} className="text-sm font-bold text-[#181611] dark:text-white">
                {language === 'en' ? 'AR' : 'EN'}
            </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#181611] dark:text-white">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#221d10] border-b border-[#e6e3db] dark:border-[#3a352a] p-4 flex flex-col gap-4 shadow-lg transition-colors duration-300">
             <Link to="/inventory" className="text-sm font-medium hover:text-primary text-[#181611] dark:text-white" onClick={() => setMobileMenuOpen(false)}>{t('nav.inventory')}</Link>
             <Link to="/services" className="text-sm font-medium hover:text-primary text-[#181611] dark:text-white" onClick={() => setMobileMenuOpen(false)}>{t('nav.services')}</Link>
             <Link to="/about" className="text-sm font-medium hover:text-primary text-[#181611] dark:text-white" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</Link>
             <Link to="/contact" className="text-sm font-medium hover:text-primary text-[#181611] dark:text-white" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>

             <div className="flex items-center justify-between mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
                <div className="flex gap-4">
                    <button onClick={toggleTheme} className="flex items-center gap-2 text-sm font-bold text-[#181611] dark:text-white">
                         <span className="material-symbols-outlined">
                           {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                         </span>
                         Theme
                    </button>
                    <button onClick={toggleCurrency} className="flex items-center gap-2 text-sm font-bold text-[#181611] dark:text-white">
                        <span className="material-symbols-outlined">currency_exchange</span>
                        {currency === 'EGP' ? 'USD' : 'L.E'}
                    </button>
                </div>
             </div>
        </div>
      )}
    </header>
  );
};

export default Header;
