import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CarCard = ({ car }) => {
  const { t, formatPrice, language } = useAppContext();

  const displayName = language === 'ar' && car.name && car.name.ar
    ? car.name.ar
    : `${car.make} ${car.model}`;

  return (
    <article className="group flex flex-col gap-4 cursor-pointer">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-200">
        <div
            className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${car.image}')` }}
        >
        </div>
        {car.tag && (
            <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-[#181611] shadow-sm uppercase tracking-wide`}>
                {t(`collection.${car.tag}`)}
            </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-[#181611] dark:text-white group-hover:text-primary transition-colors">
            {displayName}
        </h3>
        <div className="flex justify-between items-center text-[#897f61] dark:text-[#a8a290]">
          <span className="text-sm font-normal">{car.year} • {car.mileage}</span>
          <span className="text-sm font-bold">{formatPrice(car.price)}</span>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
