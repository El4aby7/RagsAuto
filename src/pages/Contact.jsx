import React from 'react';
import { useAppContext } from '../context/AppContext';

const Contact = () => {
  const { t, content, language } = useAppContext();
  const pageData = content[language].contact;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24 lg:px-12">
        <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">{t('nav.contact')}</span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-[#181611] dark:text-white">{pageData.title}</h1>
            <p className="mt-6 text-[#897f61] dark:text-[#a8a290] text-lg font-light leading-relaxed">
                {pageData.desc}
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Form */}
            <div className="bg-white dark:bg-[#1a160d] p-8 md:p-12 rounded-2xl shadow-sm border border-[#e6e3db] dark:border-[#3a352a]">
                <form action="#" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#181611] dark:text-white" htmlFor="name">{pageData.form.name}</label>
                            <input className="w-full bg-background-light dark:bg-[#221d10] border-none rounded-lg focus:ring-1 focus:ring-primary py-3 px-4 text-sm text-[#181611] dark:text-white" id="name" type="text"/>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#181611] dark:text-white" htmlFor="email">{pageData.form.email}</label>
                            <input className="w-full bg-background-light dark:bg-[#221d10] border-none rounded-lg focus:ring-1 focus:ring-primary py-3 px-4 text-sm text-[#181611] dark:text-white" id="email" type="email"/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#181611] dark:text-white" htmlFor="interest">{pageData.form.interest}</label>
                        <select className="w-full bg-background-light dark:bg-[#221d10] border-none rounded-lg focus:ring-1 focus:ring-primary py-3 px-4 text-sm appearance-none text-[#181611] dark:text-white" id="interest">
                            <option value="sales">Sales Inquiry</option>
                            <option value="service">Service & Maintenance</option>
                            <option value="sourcing">Vehicle Sourcing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#181611] dark:text-white" htmlFor="message">{pageData.form.message}</label>
                        <textarea className="w-full bg-background-light dark:bg-[#221d10] border-none rounded-lg focus:ring-1 focus:ring-primary py-3 px-4 text-sm text-[#181611] dark:text-white" id="message" rows="5"></textarea>
                    </div>
                    <button className="w-full py-4 bg-primary text-[#181611] font-bold rounded-lg shadow-xl shadow-primary/10 hover:bg-[#d4a311] transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm" type="submit">
                        {pageData.form.submit}
                    </button>
                </form>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10">
                    <div className="space-y-8">
                         {/* Address */}
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <span className="material-symbols-outlined">location_on</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#181611] dark:text-white">Showroom</h3>
                                <p className="text-sm text-[#897f61] dark:text-[#a8a290] leading-relaxed mt-1">{pageData.info.address}</p>
                            </div>
                        </div>
                        {/* Phone */}
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <span className="material-symbols-outlined">call</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#181611] dark:text-white">Phone</h3>
                                <p className="text-sm text-[#897f61] dark:text-[#a8a290] leading-relaxed mt-1">{pageData.info.phone}</p>
                            </div>
                        </div>
                         {/* Email */}
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#181611] dark:text-white">Email</h3>
                                <p className="text-sm text-[#897f61] dark:text-[#a8a290] leading-relaxed mt-1">{pageData.info.email}</p>
                            </div>
                        </div>
                    </div>
                    {/* Map Placeholder */}
                    <div className="relative w-full aspect-video md:aspect-auto lg:aspect-video bg-[#eeeae3] dark:bg-[#2d281a] rounded-2xl overflow-hidden border border-[#e6e3db] dark:border-[#3a352a]">
                         <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[#897f61] dark:text-[#a8a290]">Map Placeholder</span>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Contact;
