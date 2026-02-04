import React from 'react';
import { useAppContext } from '../context/AppContext';

const Services = () => {
  const { content, language } = useAppContext();
  const pageData = content[language].servicesPage;

  return (
    <div className="flex flex-col">
       {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center bg-[#fdfdfc] dark:bg-[#1a160d] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
             <div className="h-full w-full bg-[radial-gradient(#ecb613_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] block mb-4">{pageData.hero.label}</span>
            <h1 className="text-4xl md:text-6xl font-display font-medium text-[#181611] dark:text-white leading-tight">
                {pageData.hero.title}
            </h1>
            <p className="mt-6 text-lg text-[#897f61] dark:text-[#a8a290] max-w-2xl mx-auto leading-relaxed">
                {pageData.hero.subtitle}
            </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 bg-white dark:bg-[#1a160d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32">
            {pageData.sections.map((section, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
                    <div className="w-full lg:w-1/2 aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
                        <div className="h-full w-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                             style={{ backgroundImage: `url('${section.image}')` }}></div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <span className="text-primary text-xs font-bold uppercase tracking-widest">{section.label}</span>
                        <h2 className="text-3xl md:text-4xl font-display text-[#181611] dark:text-white">{section.title}</h2>
                        <p className="text-[#897f61] dark:text-[#a8a290] text-lg leading-relaxed">{section.desc}</p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="bg-primary text-[#181611] px-8 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#181611] hover:text-white transition-all duration-300">Inquire</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-light dark:bg-[#221d10] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-4 rounded-full border border-primary/30 mb-8">
                <span className="material-symbols-outlined text-primary text-4xl">event_available</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display text-[#181611] dark:text-white mb-6">{pageData.cta.title}</h2>
            <p className="text-[#897f61] dark:text-[#a8a290] text-lg mb-10 leading-relaxed">
                {pageData.cta.text}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-[#181611] dark:bg-primary text-white dark:text-[#181611] font-bold px-10 py-4 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-widest text-sm">
                    {pageData.cta.btn}
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
