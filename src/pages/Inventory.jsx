import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import CarCard from '../components/CarCard';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const { t, content, language } = useAppContext();
  const allCars = content.cars;

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMakes, setSelectedMakes] = useState([]);

  // Extract unique makes
  const makes = [...new Set(allCars.map(car => car.make))];

  const handleMakeChange = (make) => {
    if (selectedMakes.includes(make)) {
      setSelectedMakes(selectedMakes.filter(m => m !== make));
    } else {
      setSelectedMakes([...selectedMakes, make]);
    }
  };

  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          car.make.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMake = selectedMakes.length === 0 || selectedMakes.includes(car.make);
    return matchesSearch && matchesMake;
  });

  return (
    <div className="mx-auto max-w-[1400px]">
      <section className="px-6 pt-12 lg:px-12">
        <div className="flex flex-col gap-2">
           <nav className="flex text-xs uppercase tracking-widest text-[#897f61]">
             <Link to="/" className="hover:text-primary transition-colors">{t('nav.inventory')}</Link>
             <span className="mx-2 text-gray-300">/</span>
             <span className="text-[#181611] dark:text-white">{t('inventory.title')}</span>
           </nav>
           <h1 className="text-4xl md:text-5xl font-bold text-[#181611] dark:text-white mt-4">{t('inventory.title')}</h1>
           <p className="text-[#897f61] dark:text-[#a8a290] mt-2 max-w-2xl">{t('inventory.subtitle')}</p>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-[#e6e3db] dark:border-[#3a352a] pb-8">
            <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-[#e6e3db] dark:border-[#3a352a] bg-white dark:bg-[#1a160d] focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-[#181611] dark:text-white placeholder-gray-400"
                    placeholder={t('inventory.searchPlaceholder')}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
             <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-[#897f61]">{t('inventory.sortBy')}</span>
                <select className="rounded-lg border-[#e6e3db] dark:border-[#3a352a] bg-white dark:bg-[#1a160d] py-2 pl-4 pr-10 text-sm focus:ring-1 focus:ring-primary focus:border-primary text-[#181611] dark:text-white">
                    <option>Newest Arrivals</option>
                    <option>Price: High to Low</option>
                    <option>Price: Low to High</option>
                </select>
            </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
             {/* Sidebar */}
             <aside className="w-full lg:w-64 flex-shrink-0">
                <div className="sticky top-28 space-y-10">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#897f61] mb-4">{t('inventory.filters.manufacturer')}</h4>
                        <div className="space-y-3">
                            {makes.map(make => (
                                <label key={make} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="rounded border-[#e6e3db] text-primary focus:ring-primary/20 w-4 h-4 accent-primary"
                                        checked={selectedMakes.includes(make)}
                                        onChange={() => handleMakeChange(make)}
                                    />
                                    <span className="text-sm text-[#181611] dark:text-white group-hover:text-primary transition-colors">{make}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                     {/* More filters can be added here (static for now as they require more data structure) */}
                     <button
                        onClick={() => {setSearchTerm(""); setSelectedMakes([]);}}
                        className="w-full py-3 border border-[#e6e3db] dark:border-[#3a352a] text-xs font-bold uppercase tracking-widest hover:bg-[#181611] hover:text-white dark:hover:bg-white dark:hover:text-[#181611] transition-all rounded-lg text-[#181611] dark:text-white">
                        {t('inventory.filters.reset')}
                     </button>
                </div>
             </aside>

             {/* Grid */}
             <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                    {filteredCars.map(car => (
                        <CarCard key={car.id} car={car} />
                    ))}
                    {filteredCars.length === 0 && (
                        <p className="text-[#181611] dark:text-white col-span-full text-center py-12">No vehicles found matching your criteria.</p>
                    )}
                </div>
             </div>
        </div>
      </section>
    </div>
  );
};

export default Inventory;
