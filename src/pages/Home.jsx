import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import CarCard from '../components/CarCard';

const Home = () => {
  const { t, content, language } = useAppContext();
  const cars = content.cars;

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex h-[80vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
             style={{ backgroundImage: `url('${t('hero.image')}')` }}>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-black/20 to-transparent dark:from-black/70 dark:via-black/40"></div>
        <div className="relative z-20 flex flex-col items-center gap-6 px-4 text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight leading-[1.1] drop-shadow-sm">
                {t('hero.title')}
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-light tracking-wide max-w-2xl drop-shadow-sm">
                {t('hero.subtitle')}
            </p>
            <div className="pt-4">
                <Link to="/inventory" className="flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-lg bg-primary px-8 text-[#181611] text-base font-bold tracking-wide shadow-xl shadow-black/20 transition-all hover:bg-white hover:text-primary">
                    {t('hero.cta')}
                </Link>
            </div>
        </div>
      </section>

      {/* The Collection Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#e6e3db] dark:border-[#3a352a] pb-6">
            <div>
                <span className="text-primary text-sm font-bold uppercase tracking-widest">{t('collection.label')}</span>
                <h2 className="mt-2 text-4xl font-bold text-[#181611] dark:text-white">{t('collection.title')}</h2>
            </div>
            <Link to="/inventory" className="group flex items-center gap-2 text-[#181611] dark:text-white font-medium hover:text-primary transition-colors">
                {t('collection.viewAll')}
                <span className={`material-symbols-outlined text-lg transition-transform ${language === 'ar' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}>arrow_forward</span>
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {cars.map(car => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white dark:bg-[#1a160d] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row gap-16">
            <div className="flex flex-col justify-center lg:w-1/3 gap-6">
                <span className="text-primary text-sm font-bold uppercase tracking-widest">{t('services.label')}</span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#181611] dark:text-white">
                    {t('services.title')}
                </h2>
                <p className="text-[#897f61] dark:text-[#a8a290] text-lg leading-relaxed">
                    {t('services.description')}
                </p>
                <div className="pt-4">
                    <Link to="/services" className="w-fit rounded-lg border-2 border-[#181611] dark:border-white dark:text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-[#181611] hover:text-white dark:hover:bg-white dark:hover:text-[#181611] transition-colors">
                         {t('nav.services')}
                    </Link>
                </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
                 {content[language].services.items.map((item, index) => (
                    <div key={index} className="flex flex-col gap-4 rounded-xl border border-[#e6e3db] dark:border-[#3a352a] bg-background-light dark:bg-[#221d10] p-8 transition-colors hover:border-primary/50">
                        <div className="text-primary mb-2">
                            <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#181611] dark:text-white">{item.title}</h3>
                        <p className="text-sm text-[#897f61] dark:text-[#a8a290] leading-relaxed">{item.description}</p>
                    </div>
                 ))}
            </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="mx-auto max-w-4xl text-center relative z-10">
            <span className="material-symbols-outlined text-primary text-5xl mb-6">diamond</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#181611] dark:text-white mb-6">Join the Inner Circle</h2>
            <p className="text-[#897f61] dark:text-[#a8a290] text-lg mb-10 max-w-2xl mx-auto">
                Be the first to know about new arrivals, private off-market listings, and exclusive automotive events.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input className="flex-1 rounded-lg border border-[#e6e3db] dark:border-[#3a352a] bg-white dark:bg-[#221d10] px-4 py-3 text-[#181611] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-[#897f61]/50" placeholder="Email Address" type="email"/>
                <button className="bg-[#181611] dark:bg-primary text-white dark:text-[#181611] font-bold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-opacity" type="button">
                    Subscribe
                </button>
            </form>
        </div>
      </section>
    </>
  );
};

export default Home;
