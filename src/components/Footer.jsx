import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Footer = () => {
  const { t } = useAppContext();

  return (
    <footer className="bg-white dark:bg-[#1a160d] border-t border-[#e6e3db] dark:border-[#3a352a] pt-16 pb-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">directions_car</span>
              <span className="text-xl font-bold text-[#181611] dark:text-white">Rags Auto</span>
            </div>
            <p className="text-sm text-[#897f61] dark:text-[#a8a290] leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-[#181611] dark:text-white hover:text-primary transition-colors"><span className="material-symbols-outlined">photo_camera</span></a>
              <a href="#" className="text-[#181611] dark:text-white hover:text-primary transition-colors"><span className="material-symbols-outlined">smart_display</span></a>
              <a href="#" className="text-[#181611] dark:text-white hover:text-primary transition-colors"><span className="material-symbols-outlined">alternate_email</span></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#181611] dark:text-white mb-6 uppercase text-xs tracking-widest">{t('nav.inventory')}</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#897f61] dark:text-[#a8a290]">
              <li><Link to="/inventory" className="hover:text-primary transition-colors">Ferrari</Link></li>
              <li><Link to="/inventory" className="hover:text-primary transition-colors">Lamborghini</Link></li>
              <li><Link to="/inventory" className="hover:text-primary transition-colors">McLaren</Link></li>
              <li><Link to="/inventory" className="hover:text-primary transition-colors">Porsche</Link></li>
              <li><Link to="/inventory" className="hover:text-primary transition-colors">Bugatti</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#181611] dark:text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#897f61] dark:text-[#a8a290]">
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">{t('nav.services')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#181611] dark:text-white mb-6 uppercase text-xs tracking-widest">{t('nav.contact')}</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#897f61] dark:text-[#a8a290]">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base mt-0.5">location_on</span>
                123 Ocean Drive, <br/>Beverly Hills, CA 90210
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">call</span>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">mail</span>
                sales@ragsauto.com
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#e6e3db] dark:border-[#3a352a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#897f61] dark:text-[#a8a290]">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
