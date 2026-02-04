import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { CONTENT } from './content.js';

const h = React.createElement;

// --- Helper Components ---

function Icon({ name, className = "" }) {
    return h('span', { className: `material-symbols-outlined ${className}` }, name);
}

// --- Page Components ---

function Hero({ t }) {
    return h('section', { className: "relative flex h-[80vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900" },
        h('div', {
            className: "absolute inset-0 z-0 bg-cover bg-center bg-no-repeat",
            style: { backgroundImage: `url('${t.hero.image}')` }
        }),
        h('div', { className: "absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-black/20 to-transparent dark:from-black/70 dark:via-black/40" }),
        h('div', { className: "relative z-20 flex flex-col items-center gap-6 px-4 text-center max-w-4xl mx-auto animate-fade-in-up" },
            h('h1', { className: "text-white text-5xl md:text-7xl font-black tracking-tight leading-[1.1] drop-shadow-sm" }, t.hero.title),
            h('p', { className: "text-white/90 text-lg md:text-xl font-light tracking-wide max-w-2xl drop-shadow-sm" }, t.hero.subtitle),
            h('div', { className: "pt-4" },
                h('button', { className: "flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-lg bg-primary px-8 text-[#181611] text-base font-bold tracking-wide shadow-xl shadow-black/20 transition-all hover:bg-white hover:text-primary" }, t.hero.cta)
            )
        )
    );
}

function Inventory({ t, cars, settings, currency, lang, onCarClick }) {
    const currencyLabel = currency === 'USD' ? settings.currencyLabelUSD[lang] : settings.currencyLabel[lang];

    return h('section', { className: "mx-auto max-w-7xl px-6 py-24 lg:px-12" },
        h('div', { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#e6e3db] dark:border-[#3a352a] pb-6" },
            h('div', {},
                h('span', { className: "text-primary text-sm font-bold uppercase tracking-widest" }, t.collection.label),
                h('h2', { className: "mt-2 text-4xl font-bold text-[#181611] dark:text-white" }, t.collection.title)
            ),
            h('a', { href: "#", className: "group flex items-center gap-2 text-[#181611] dark:text-white font-medium hover:text-primary transition-colors" },
                t.collection.viewAll,
                h(Icon, { name: lang === 'ar' ? "arrow_back" : "arrow_forward", className: "text-lg transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" })
            )
        ),
        h('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12" },
            cars.map(car => {
                const isUSD = currency === 'USD';
                const rate = isUSD ? settings.exchangeRate : 1;
                const priceVal = car.price * rate;
                const formattedPrice = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(priceVal);

                return h('article', {
                    key: car.id,
                    className: "group flex flex-col gap-4 cursor-pointer",
                    onClick: () => onCarClick(car.id)
                },
                    h('div', { className: "relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-200" },
                        h('div', {
                            className: "h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105",
                            style: { backgroundImage: `url('${car.image}')` }
                        }),
                        car.tag && h('div', { className: "absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-[#181611] shadow-sm uppercase tracking-wide" },
                            t.collection[car.tag]
                        )
                    ),
                    h('div', { className: "flex flex-col gap-1" },
                        h('h3', { className: "text-xl font-bold text-[#181611] dark:text-white group-hover:text-primary transition-colors" }, `${car.make} ${car.model}`),
                        h('div', { className: "flex justify-between items-center text-[#897f61] dark:text-[#a8a290]" },
                            h('span', { className: "text-sm font-normal" }, `${car.year} • ${car.mileage}`),
                            h('span', { className: "text-sm font-bold" }, `${formattedPrice} ${currencyLabel}`)
                        )
                    )
                );
            })
        )
    );
}

function CarDetails({ car, t, settings, currency, lang, onBack }) {
    if (!car) return null;

    const isUSD = currency === 'USD';
    const rate = isUSD ? settings.exchangeRate : 1;
    const priceVal = car.price * rate;
    const formattedPrice = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(priceVal);
    const currencyLabel = isUSD ? settings.currencyLabelUSD[lang] : settings.currencyLabel[lang];

    // Helper for spec item
    const SpecItem = ({ icon, label, value }) => (
        h('div', { className: "flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#221d10] border border-[#e6e3db] dark:border-[#3a352a]" },
            h('div', { className: "p-3 rounded-full bg-primary/10 text-primary" },
                h(Icon, { name: icon, className: "text-2xl" })
            ),
            h('div', {},
                h('div', { className: "text-xs font-bold uppercase tracking-wider text-[#897f61]" }, label),
                h('div', { className: "font-bold text-[#181611] dark:text-white mt-1 ltr:font-sans" }, value) // Force sans-serif for numbers in LTR if needed, but display font handles it
            )
        )
    );

    return h('div', { className: "animate-fade-in" },
        // Hero Image
        h('div', { className: "relative w-full h-[60vh] bg-gray-200" },
            h('div', {
                className: "absolute inset-0 bg-cover bg-center",
                style: { backgroundImage: `url('${car.image}')` }
            }),
            h('div', { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" }),
            h('div', { className: "absolute bottom-0 left-0 w-full p-6 lg:p-12" },
                h('div', { className: "mx-auto max-w-7xl" },
                    h('button', {
                        onClick: onBack,
                        className: "mb-6 flex items-center gap-2 text-white/80 hover:text-white hover:underline transition-all text-sm font-bold uppercase tracking-widest"
                    },
                        h(Icon, { name: lang === 'ar' ? "arrow_forward" : "arrow_back" }),
                        t.details.back
                    ),
                    h('h1', { className: "text-4xl md:text-6xl font-bold text-white mb-2" }, `${car.make} ${car.model}`),
                    h('div', { className: "flex items-center gap-4 text-xl md:text-2xl text-primary font-medium" },
                         h('span', {}, `${formattedPrice} ${currencyLabel}`)
                    )
                )
            )
        ),

        // Content Section
        h('section', { className: "mx-auto max-w-7xl px-6 py-12 lg:px-12" },
            h('div', { className: "grid grid-cols-1 lg:grid-cols-3 gap-12" },
                // Main Info
                h('div', { className: "lg:col-span-2 space-y-12" },
                    h('div', {},
                        h('h2', { className: "text-2xl font-bold text-[#181611] dark:text-white mb-6" }, t.details.specs),
                        h('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                            h(SpecItem, { icon: "speed", label: t.details.acceleration, value: car.specs.acceleration }),
                            h(SpecItem, { icon: "flight", label: t.details.topSpeed, value: car.specs.topSpeed }),
                            h(SpecItem, { icon: "bolt", label: t.details.power, value: car.specs.power }),
                            h(SpecItem, { icon: "settings", label: t.details.engine, value: car.specs.engine }),
                            h(SpecItem, { icon: "directions_car", label: t.details.drivetrain, value: car.specs.drivetrain }),
                            h(SpecItem, { icon: "calendar_today", label: t.details.year, value: car.year }),
                            h(SpecItem, { icon: "add_road", label: t.details.mileage, value: car.mileage }),
                        )
                    ),
                    h('div', {},
                        h('h3', { className: "text-xl font-bold text-[#181611] dark:text-white mb-4" }, "Description"),
                        h('p', { className: "text-lg text-[#897f61] dark:text-[#a8a290] leading-relaxed" }, car.description)
                    )
                ),

                // Sidebar / Sticky Action
                h('div', {},
                    h('div', { className: "sticky top-32 p-8 rounded-2xl bg-white dark:bg-[#1a160d] border border-[#e6e3db] dark:border-[#3a352a] shadow-lg" },
                        h('div', { className: "text-center mb-8" },
                            h('div', { className: "text-sm text-[#897f61] uppercase tracking-widest mb-2" }, "Price"),
                            h('div', { className: "text-3xl font-bold text-[#181611] dark:text-white" }, `${formattedPrice} ${currencyLabel}`)
                        ),
                        h('button', { className: "w-full py-4 bg-primary text-[#181611] font-bold rounded-lg shadow-xl shadow-primary/10 hover:bg-[#d4a311] transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm mb-4" },
                            t.details.inquire
                        ),
                         h('div', { className: "flex justify-center gap-4 text-[#897f61]" },
                            h('button', { className: "p-2 hover:text-primary transition-colors" }, h(Icon, { name: "favorite_border" })),
                            h('button', { className: "p-2 hover:text-primary transition-colors" }, h(Icon, { name: "share" }))
                         )
                    )
                )
            )
        )
    );
}

function Services({ t }) {
    return h('section', { className: "bg-white dark:bg-[#1a160d] py-24" },
        h('div', { className: "mx-auto max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row gap-16" },
            h('div', { className: "flex flex-col justify-center lg:w-1/3 gap-6" },
                h('span', { className: "text-primary text-sm font-bold uppercase tracking-widest" }, t.services.label),
                h('h2', { className: "text-3xl md:text-4xl font-bold leading-tight text-[#181611] dark:text-white" }, t.services.title),
                h('p', { className: "text-[#897f61] dark:text-[#a8a290] text-lg leading-relaxed" }, t.services.description),
                h('div', { className: "pt-4" },
                    h('button', { className: "w-fit rounded-lg border-2 border-[#181611] dark:border-white dark:text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-[#181611] hover:text-white dark:hover:bg-white dark:hover:text-[#181611] transition-colors" }, "Our Concierge Services")
                )
            ),
            h('div', { className: "lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6" },
                t.services.items.map((item, idx) =>
                    h('div', { key: idx, className: "flex flex-col gap-4 rounded-xl border border-[#e6e3db] dark:border-[#3a352a] bg-background-light dark:bg-[#221d10] p-8 transition-colors hover:border-primary/50" },
                        h('div', { className: "text-primary mb-2" }, h(Icon, { name: item.icon, className: "text-4xl" })),
                        h('h3', { className: "text-lg font-bold text-[#181611] dark:text-white" }, item.title),
                        h('p', { className: "text-sm text-[#897f61] dark:text-[#a8a290] leading-relaxed" }, item.description)
                    )
                )
            )
        )
    );
}

function ServicesPage({ t }) {
    const s = t.servicesPage;
    return h('div', { className: "bg-background-light dark:bg-[#221d10]" },
         h('section', { className: "relative h-[50vh] flex items-center justify-center bg-[#fdfdfc] dark:bg-[#1a160d] overflow-hidden" },
             h('div', { className: "absolute inset-0 opacity-10" },
                  h('div', { className: "h-full w-full bg-[radial-gradient(#ecb613_1px,transparent_1px)] [background-size:40px_40px]" })
             ),
             h('div', { className: "relative z-10 text-center px-6 max-w-4xl" },
                 h('span', { className: "text-primary text-sm font-bold uppercase tracking-[0.3em] block mb-4" }, s.hero.label),
                 h('h1', { className: "text-4xl md:text-6xl font-display font-medium text-[#181611] dark:text-white leading-tight" }, s.hero.title),
                 h('p', { className: "mt-6 text-lg text-[#897f61] dark:text-[#a8a290] max-w-2xl mx-auto leading-relaxed" }, s.hero.subtitle)
             )
         ),
         h('section', { className: "py-12 bg-white dark:bg-[#1a160d]" },
             h('div', { className: "max-w-7xl mx-auto px-6 lg:px-12 space-y-32" },
                 s.sections.map((section, idx) =>
                     h('div', { key: idx, className: `flex flex-col lg:flex-row${idx % 2 === 1 ? '-reverse' : ''} items-center gap-12 lg:gap-24` },
                         h('div', { className: "w-full lg:w-1/2 aspect-[4/3] overflow-hidden rounded-xl shadow-2xl" },
                             h('div', {
                                 className: "h-full w-full bg-cover bg-center transition-transform duration-1000 hover:scale-105",
                                 style: { backgroundImage: `url('${section.image}')` }
                             })
                         ),
                         h('div', { className: "w-full lg:w-1/2 space-y-6" },
                             h('span', { className: "text-primary text-xs font-bold uppercase tracking-widest" }, section.label),
                             h('h2', { className: "text-3xl md:text-4xl font-display text-[#181611] dark:text-white" }, section.title),
                             h('p', { className: "text-[#897f61] dark:text-[#a8a290] text-lg leading-relaxed" }, section.desc),
                             h('div', { className: "flex flex-wrap gap-4 pt-4" },
                                 h('button', { className: "bg-primary text-[#181611] px-8 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#181611] hover:text-white transition-all duration-300" }, "Inquire"),
                                 h('button', { className: "border-b-2 border-[#181611] dark:border-white text-[#181611] dark:text-white px-2 py-3 text-sm font-bold uppercase tracking-wider hover:text-primary hover:border-primary transition-all duration-300" }, "Learn More")
                             )
                         )
                     )
                 )
             )
         ),
         h('section', { className: "bg-background-light dark:bg-[#221d10] py-24 px-6" },
             h('div', { className: "max-w-4xl mx-auto text-center" },
                 h('div', { className: "inline-block p-4 rounded-full border border-primary/30 mb-8" },
                     h(Icon, { name: "event_available", className: "text-primary text-4xl" })
                 ),
                 h('h2', { className: "text-3xl md:text-5xl font-display text-[#181611] dark:text-white mb-6" }, s.cta.title),
                 h('p', { className: "text-[#897f61] dark:text-[#a8a290] text-lg mb-10 leading-relaxed" }, s.cta.text),
                 h('div', { className: "flex flex-col sm:flex-row justify-center gap-6" },
                     h('button', { className: "bg-[#181611] dark:bg-primary text-white dark:text-[#181611] font-bold px-10 py-4 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-widest text-sm" }, s.cta.btn),
                     h('button', { className: "border border-[#181611] dark:border-white text-[#181611] dark:text-white font-bold px-10 py-4 rounded-lg hover:bg-[#181611] hover:text-white dark:hover:bg-white dark:hover:text-[#181611] transition-colors uppercase tracking-widest text-sm" }, "Call (555) 123-4567")
                 )
             )
         )
    );
}

function About({ t, team, lang }) {
    const a = t.about;
    return h('div', {},
         h('section', { className: "relative h-[60vh] flex items-center justify-center bg-[#1a160d]" },
             h('div', { className: "absolute inset-0 opacity-60" },
                 h('div', { className: "h-full w-full bg-cover bg-center", style: { backgroundImage: "url('images/hero_silver_supercar.jpg')", filter: "grayscale(20%)" } })
             ),
             h('div', { className: "relative z-10 text-center px-6" },
                 h('span', { className: "text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4 block" }, a.label),
                 h('h1', { className: "text-white text-5xl md:text-7xl font-light mb-6 leading-tight" }, a.title),
                 h('div', { className: "h-12 w-px bg-primary mx-auto" })
             )
         ),
         h('section', { className: "py-24 px-6 bg-white dark:bg-[#1a160d]" },
             h('div', { className: "mx-auto max-w-7xl" },
                 h('div', { className: "grid lg:grid-cols-2 gap-16 items-center" },
                     h('div', { className: "space-y-8" },
                         h('div', {},
                             h('span', { className: "text-primary text-sm font-bold uppercase tracking-widest" }, a.title),
                             h('h2', { className: "mt-4 text-4xl md:text-5xl font-medium leading-tight text-[#181611] dark:text-white" }, a.subtitle)
                         ),
                         h('p', { className: "text-lg text-[#897f61] dark:text-[#a8a290] leading-relaxed font-serif italic" }, a.desc1),
                         h('p', { className: "text-[#897f61] dark:text-[#a8a290] leading-relaxed" }, a.desc2)
                     ),
                     h('div', { className: "relative" },
                         h('div', { className: "aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl" },
                             h('div', { className: "w-full h-full bg-cover bg-center", style: { backgroundImage: "url('images/aston_martin_dbs.jpg')" } })
                         )
                     )
                 )
             )
         ),
         h('section', { className: "py-24 px-6 bg-background-light dark:bg-[#221d10]" },
            h('div', { className: "mx-auto max-w-7xl" },
                h('h2', { className: "text-4xl font-medium mb-12 text-center" }, a.teamTitle),
                h('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12" },
                    team.map((member, idx) =>
                        h('div', { key: idx, className: "space-y-4" },
                            h('div', { className: "aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 bg-gray-100 rounded-lg" },
                                h('div', { className: "w-full h-full bg-cover bg-center", style: { backgroundImage: `url('${member.image}')` } })
                            ),
                            h('div', {},
                                h('h3', { className: "text-lg font-bold text-[#181611] dark:text-white" }, member.name),
                                h('p', { className: "text-sm text-primary font-medium tracking-wide" }, member.role[lang])
                            )
                        )
                    )
                )
            )
         )
    );
}

function Contact({ t }) {
    const c = t.contact;
    return h('section', { className: "mx-auto max-w-7xl px-6 py-16 lg:py-24 lg:px-12" },
         h('div', { className: "mb-16 text-center max-w-2xl mx-auto" },
             h('span', { className: "text-primary text-sm font-bold uppercase tracking-[0.2em]" }, t.nav.contact),
             h('h1', { className: "mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-[#181611] dark:text-white" }, c.title),
             h('p', { className: "mt-6 text-[#897f61] dark:text-[#a8a290] text-lg font-light leading-relaxed" }, c.desc)
         ),
         h('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24" },
             h('div', { className: "bg-white dark:bg-[#1a160d] p-8 md:p-12 rounded-2xl shadow-sm border border-[#e6e3db] dark:border-[#3a352a]" },
                 h('form', { className: "space-y-6" },
                     h('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                         h('div', { className: "space-y-2" },
                             h('label', { className: "text-xs font-bold uppercase tracking-wider text-[#181611] dark:text-white" }, c.form.name),
                             h('input', { className: "w-full bg-background-light dark:bg-[#221d10] border-none rounded-lg focus:ring-1 focus:ring-primary py-3 px-4 text-sm", type: "text" })
                         ),
                         h('div', { className: "space-y-2" },
                             h('label', { className: "text-xs font-bold uppercase tracking-wider text-[#181611] dark:text-white" }, c.form.email),
                             h('input', { className: "w-full bg-background-light dark:bg-[#221d10] border-none rounded-lg focus:ring-1 focus:ring-primary py-3 px-4 text-sm", type: "email" })
                         )
                     ),
                     h('div', { className: "space-y-2" },
                         h('label', { className: "text-xs font-bold uppercase tracking-wider text-[#181611] dark:text-white" }, c.form.interest),
                         h('select', { className: "w-full bg-background-light dark:bg-[#221d10] border-none rounded-lg focus:ring-1 focus:ring-primary py-3 px-4 text-sm appearance-none" },
                            h('option', {}, "Sales Inquiry"),
                            h('option', {}, "Service & Maintenance"),
                            h('option', {}, "Vehicle Sourcing")
                         )
                     ),
                     h('div', { className: "space-y-2" },
                         h('label', { className: "text-xs font-bold uppercase tracking-wider text-[#181611] dark:text-white" }, c.form.message),
                         h('textarea', { className: "w-full bg-background-light dark:bg-[#221d10] border-none rounded-lg focus:ring-1 focus:ring-primary py-3 px-4 text-sm", rows: 5 })
                     ),
                     h('button', { className: "w-full py-4 bg-primary text-[#181611] font-bold rounded-lg shadow-xl shadow-primary/10 hover:bg-[#d4a311] transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm" }, c.form.submit)
                 )
             ),
             h('div', { className: "flex flex-col gap-12" },
                 h('div', { className: "space-y-8" },
                     h('div', { className: "flex items-start gap-4" },
                         h('div', { className: "bg-primary/10 p-3 rounded-full text-primary" }, h(Icon, { name: "location_on" })),
                         h('div', {},
                            h('h3', { className: "text-lg font-bold text-[#181611] dark:text-white" }, "Beverly Hills Showroom"),
                            h('p', { className: "text-sm text-[#897f61] dark:text-[#a8a290] leading-relaxed mt-1" }, c.info.address)
                         )
                     ),
                     h('div', { className: "flex items-start gap-4" },
                         h('div', { className: "bg-primary/10 p-3 rounded-full text-primary" }, h(Icon, { name: "call" })),
                         h('div', {},
                            h('h3', { className: "text-lg font-bold text-[#181611] dark:text-white" }, "Phone"),
                            h('p', { className: "text-sm text-[#897f61] dark:text-[#a8a290] leading-relaxed mt-1 ltr:text-left rtl:text-right" }, c.info.phone)
                         )
                     ),
                     h('div', { className: "flex items-start gap-4" },
                         h('div', { className: "bg-primary/10 p-3 rounded-full text-primary" }, h(Icon, { name: "mail" })),
                         h('div', {},
                            h('h3', { className: "text-lg font-bold text-[#181611] dark:text-white" }, "Email"),
                            h('p', { className: "text-sm text-[#897f61] dark:text-[#a8a290] leading-relaxed mt-1" }, c.info.email)
                         )
                     )
                 )
             )
         )
    );
}

function Footer({ t }) {
    return h('footer', { className: "bg-white dark:bg-[#1a160d] border-t border-[#e6e3db] dark:border-[#3a352a] pt-16 pb-8" },
        h('div', { className: "mx-auto max-w-7xl px-6 lg:px-12" },
            h('div', { className: "grid grid-cols-1 md:grid-cols-4 gap-12 mb-16" },
                h('div', { className: "flex flex-col gap-4" },
                    h('div', { className: "flex items-center gap-2" },
                        h(Icon, { name: "directions_car", className: "text-primary text-2xl" }),
                        h('span', { className: "text-xl font-bold text-[#181611] dark:text-white" }, "Rags Auto")
                    ),
                    h('p', { className: "text-sm text-[#897f61] dark:text-[#a8a290] leading-relaxed" }, t.footer.tagline),
                    h('div', { className: "flex gap-4 mt-2" },
                        h('a', { href: "#", className: "text-[#181611] dark:text-white hover:text-primary transition-colors" }, h(Icon, { name: "photo_camera" })),
                        h('a', { href: "#", className: "text-[#181611] dark:text-white hover:text-primary transition-colors" }, h(Icon, { name: "smart_display" })),
                        h('a', { href: "#", className: "text-[#181611] dark:text-white hover:text-primary transition-colors" }, h(Icon, { name: "alternate_email" }))
                    )
                ),
                h('div', {},
                   h('h4', { className: "font-bold text-[#181611] dark:text-white mb-6" }, t.nav.inventory),
                   h('ul', { className: "flex flex-col gap-3 text-sm text-[#897f61] dark:text-[#a8a290]" },
                       ['Ferrari', 'Lamborghini', 'McLaren', 'Porsche', 'Bugatti'].map(m => h('li', { key: m }, h('a', { href: "#", className: "hover:text-primary transition-colors" }, m)))
                   )
                ),
                 h('div', {},
                   h('h4', { className: "font-bold text-[#181611] dark:text-white mb-6" }, t.nav.about),
                   h('ul', { className: "flex flex-col gap-3 text-sm text-[#897f61] dark:text-[#a8a290]" },
                       [t.nav.about, t.nav.services, t.nav.contact].map(m => h('li', { key: m }, h('a', { href: "#", className: "hover:text-primary transition-colors" }, m)))
                   )
                ),
                 h('div', {},
                   h('h4', { className: "font-bold text-[#181611] dark:text-white mb-6" }, t.nav.contact),
                   h('ul', { className: "flex flex-col gap-3 text-sm text-[#897f61] dark:text-[#a8a290]" },
                       h('li', { className: "flex items-start gap-2" }, h(Icon, { name: "location_on", className: "text-base mt-0.5" }), "123 Ocean Drive, Beverly Hills"),
                       h('li', { className: "flex items-center gap-2" }, h(Icon, { name: "call", className: "text-base" }), "+1 (555) 123-4567"),
                       h('li', { className: "flex items-center gap-2" }, h(Icon, { name: "mail", className: "text-base" }), "sales@ragsauto.com")
                   )
                )
            ),
            h('div', { className: "border-t border-[#e6e3db] dark:border-[#3a352a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#897f61] dark:text-[#a8a290]" },
                h('p', {}, t.footer.rights),
                h('div', { className: "flex gap-6" },
                    h('a', { href: "#", className: "hover:text-primary" }, "Privacy Policy"),
                    h('a', { href: "#", className: "hover:text-primary" }, "Terms of Service")
                )
            )
        )
    );
}

// --- Main App Component ---

function App() {
    const [theme, setTheme] = useState('light');
    const [lang, setLang] = useState('en');
    const [currency, setCurrency] = useState('LE'); // 'LE' or 'USD'
    const [page, setPage] = useState('home');
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Derived content based on language
    const t = CONTENT[lang];

    // Effect for Theme
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    // Effect for Language (Direction)
    useEffect(() => {
        const root = window.document.documentElement;
        root.lang = lang;
        root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleLang = () => {
        setLang(prev => prev === 'en' ? 'ar' : 'en');
    };

    const toggleCurrency = () => {
        setCurrency(prev => prev === 'LE' ? 'USD' : 'LE');
    };

    const handleCarClick = (id) => {
        setSelectedCarId(id);
        setPage('details');
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setPage('inventory');
        setSelectedCarId(null);
    };

    const handleMobileNav = (targetPage) => {
        setPage(targetPage);
        setMobileMenuOpen(false);
    };

    // Mobile Menu Component
    function MobileMenu() {
        if (!mobileMenuOpen) return null;

        return h('div', { className: "fixed inset-0 z-40 bg-white dark:bg-[#1a160d] md:hidden animate-fade-in flex flex-col pt-24 px-6" },
            h('nav', { className: "flex flex-col gap-6 text-2xl font-bold text-[#181611] dark:text-white" },
                h('button', { onClick: () => handleMobileNav('home'), className: "text-left hover:text-primary" }, "Home"),
                h('button', { onClick: () => handleMobileNav('inventory'), className: "text-left hover:text-primary" }, t.nav.inventory),
                h('button', { onClick: () => handleMobileNav('services'), className: "text-left hover:text-primary" }, t.nav.services),
                h('button', { onClick: () => handleMobileNav('about'), className: "text-left hover:text-primary" }, t.nav.about),
                h('button', { onClick: () => handleMobileNav('contact'), className: "text-left hover:text-primary" }, t.nav.contact)
            ),
            h('div', { className: "mt-12 flex flex-col gap-6 border-t border-[#e6e3db] dark:border-[#3a352a] pt-8" },
                h('div', { className: "flex items-center justify-between" },
                    h('span', { className: "text-[#897f61]" }, "Currency"),
                    h('button', { onClick: toggleCurrency, className: "font-bold text-[#181611] dark:text-white hover:text-primary" }, currency)
                ),
                h('div', { className: "flex items-center justify-between" },
                    h('span', { className: "text-[#897f61]" }, "Language"),
                    h('button', { onClick: toggleLang, className: "font-bold text-[#181611] dark:text-white hover:text-primary" }, lang === 'en' ? 'Arabic' : 'English')
                ),
                h('div', { className: "flex items-center justify-between" },
                    h('span', { className: "text-[#897f61]" }, "Theme"),
                    h('button', { onClick: toggleTheme, className: "flex items-center gap-2 font-bold text-[#181611] dark:text-white hover:text-primary" },
                        theme === 'light' ? 'Dark Mode' : 'Light Mode',
                        h(Icon, { name: theme === 'light' ? 'dark_mode' : 'light_mode' })
                    )
                ),
                h('button', { className: "mt-4 w-full py-4 bg-primary text-[#181611] font-bold rounded-lg shadow-lg uppercase tracking-widest text-sm" },
                    t.nav.inquire
                )
            )
        );
    }

    // Nav Component (Inner to access state)
    function Header() {
        return h('header', { className: "sticky top-0 z-50 w-full border-b border-[#e6e3db] dark:border-[#3a352a] bg-white/90 dark:bg-[#221d10]/90 backdrop-blur-md px-6 py-4 lg:px-12" },
            h('div', { className: "mx-auto flex max-w-7xl items-center justify-between" },
                // Logo
                h('div', { className: "flex items-center gap-3 cursor-pointer", onClick: () => handleMobileNav('home') },
                    h('div', { className: "flex items-center justify-center text-primary" },
                        h(Icon, { name: "directions_car", className: "text-[32px]" })
                    ),
                    h('h2', { className: "text-2xl font-bold tracking-tight text-[#181611] dark:text-white" }, "Rags Auto")
                ),
                // Desktop Nav
                h('nav', { className: "hidden md:flex flex-1 justify-center gap-10" },
                    h('button', { onClick: () => setPage('inventory'), className: "text-sm font-medium hover:text-primary transition-colors duration-200" }, t.nav.inventory),
                    h('button', { onClick: () => setPage('services'), className: "text-sm font-medium hover:text-primary transition-colors duration-200" }, t.nav.services),
                    h('button', { onClick: () => setPage('about'), className: "text-sm font-medium hover:text-primary transition-colors duration-200" }, t.nav.about),
                    h('button', { onClick: () => setPage('contact'), className: "text-sm font-medium hover:text-primary transition-colors duration-200" }, t.nav.contact)
                ),
                // Action Buttons
                h('div', { className: "hidden md:flex items-center gap-4" },
                    // Currency Toggle
                    h('button', { onClick: toggleCurrency, className: "flex items-center gap-1 text-sm font-bold hover:text-primary px-2" },
                       currency
                    ),
                    // Lang Toggle
                    h('button', { onClick: toggleLang, className: "text-sm font-bold hover:text-primary px-2" },
                        lang === 'en' ? 'AR' : 'EN'
                    ),
                    // Theme Toggle
                    h('button', { onClick: toggleTheme, className: "text-[#181611] dark:text-white hover:text-primary transition-colors" },
                        h(Icon, { name: theme === 'light' ? 'dark_mode' : 'light_mode' })
                    ),
                    h('button', { className: "flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-6 py-2.5 text-[#181611] text-sm font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20" },
                        t.nav.inquire
                    )
                ),
                 // Mobile Menu Icon
                h('button', {
                    onClick: () => setMobileMenuOpen(!mobileMenuOpen),
                    className: "md:hidden text-[#181611] dark:text-white p-2"
                },
                    h(Icon, { name: mobileMenuOpen ? "close" : "menu", className: "text-3xl" })
                )
            )
        );
    }

    return h('div', { className: "relative flex min-h-screen w-full flex-col overflow-x-hidden" },
        h(Header),
        h(MobileMenu),
        h('main', { className: "flex-grow" },
            page === 'home' && h(React.Fragment, null,
                h(Hero, { t }),
                h(Inventory, { t, cars: CONTENT.cars, settings: CONTENT.settings, currency, lang, onCarClick: handleCarClick }),
                h(Services, { t })
            ),
             page === 'inventory' && h(Inventory, { t, cars: CONTENT.cars, settings: CONTENT.settings, currency, lang, onCarClick: handleCarClick }),
             page === 'details' && h(CarDetails, {
                car: CONTENT.cars.find(c => c.id === selectedCarId),
                t,
                settings: CONTENT.settings,
                currency,
                lang,
                onBack: handleBack
             }),
             page === 'services' && h(ServicesPage, { t }),
             page === 'about' && h(About, { t, team: CONTENT.team, lang }),
             page === 'contact' && h(Contact, { t })
        ),
        h(Footer, { t })
    );
}

// Render
const root = createRoot(document.getElementById('root'));
root.render(h(App));
