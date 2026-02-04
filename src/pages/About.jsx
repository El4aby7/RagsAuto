import React from 'react';
import { useAppContext } from '../context/AppContext';

const About = () => {
  const { t, content, language } = useAppContext();
  const pageData = content[language].about;
  const team = content.team;

  return (
    <div className="flex flex-col">
       {/* Hero */}
       <section className="relative h-[60vh] flex items-center justify-center bg-[#1a160d]">
            <div className="absolute inset-0 opacity-60">
                 <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/images/hero_silver_supercar.jpg')", filter: "grayscale(20%)" }}></div>
            </div>
            <div className="relative z-10 text-center px-6">
                <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">{pageData.label}</span>
                <h1 className="text-white text-5xl md:text-7xl font-light mb-6 leading-tight">{pageData.title}</h1>
                <div className="h-12 w-px bg-primary mx-auto"></div>
            </div>
        </section>

        {/* Legacy */}
        <section className="py-24 px-6 bg-white dark:bg-[#1a160d]">
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <span className="text-primary text-sm font-bold uppercase tracking-widest">{pageData.title}</span>
                            <h2 className="mt-4 text-4xl md:text-5xl font-medium leading-tight text-[#181611] dark:text-white">{pageData.subtitle}</h2>
                        </div>
                        <p className="text-lg text-[#897f61] dark:text-[#a8a290] leading-relaxed font-serif italic">
                            {pageData.desc1}
                        </p>
                        <p className="text-[#897f61] dark:text-[#a8a290] leading-relaxed">
                             {pageData.desc2}
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                             <img alt="Luxury showroom interior" className="w-full h-full object-cover" src="/images/aston_martin_dbs.jpg"/>
                        </div>
                         <div className="absolute -bottom-8 -left-8 hidden md:block w-64 aspect-square rounded-xl overflow-hidden border-8 border-white dark:border-[#1a160d] shadow-xl">
                            <img alt="Classic detail" className="w-full h-full object-cover" src="/images/ferrari_sf90.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Team */}
        <section className="py-24 px-6 bg-white dark:bg-[#1a160d]">
             <div className="mx-auto max-w-7xl">
                 <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-b border-[#e6e3db] dark:border-[#3a352a] pb-8">
                    <div>
                        <span className="text-primary text-sm font-bold uppercase tracking-widest">{t('nav.about')}</span>
                        <h2 className="mt-2 text-4xl font-medium text-[#181611] dark:text-white">{pageData.teamTitle}</h2>
                    </div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                     {team.map((member, index) => (
                         <div key={index} className="space-y-4">
                            <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 bg-gray-100 rounded-lg">
                                <img alt={member.name} className="w-full h-full object-cover" src={member.image}/>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#181611] dark:text-white">{member.name}</h3>
                                <p className="text-sm text-primary font-medium tracking-wide">{member.role[language]}</p>
                            </div>
                         </div>
                     ))}
                 </div>
             </div>
        </section>
    </div>
  );
};

export default About;
