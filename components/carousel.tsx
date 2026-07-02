import React, { useState } from 'react';
import type { CarouselItemData } from '../types';
import { PlayIcon } from './PlayIcon';

const CAROUSEL_DATA: CarouselItemData[] = [
  { 
    id: 1, 
    title: ['Capital Market', 'Mastery'], 
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1470&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    title: ["The Investor's", 'Mind'], 
    imageUrl: 'https://images.unsplash.com/photo-1589742581307-9a8258b3a43a?q=80&w=1470&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    title: ['The Wealth', 'Blueprint'], 
    imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1470&auto=format&fit=crop' 
  }
];

export const Carousel: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'lg' }) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const isSmall = size === 'sm';

  const containerClasses = isSmall
    ? "relative w-full h-[160px] flex items-center justify-center"
    : "relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center -mt-8";

  const cardClasses = isSmall
    ? "absolute w-3/4 aspect-[16/10] transition-all duration-500 ease-in-out cursor-pointer group"
    : "absolute w-2/3 sm:w-1/2 md:w-2/5 lg:w-[45%] aspect-[16/10] transition-all duration-500 ease-in-out cursor-pointer group";
  
  const titleClasses = isSmall
    ? "font-bold text-xl leading-tight"
    : "font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mt-1";
    
  const playIconContainerClasses = isSmall
    ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transition-opacity duration-300 z-30"
    : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transition-opacity duration-300 z-30";

  return (
    <div className={containerClasses}>
      {CAROUSEL_DATA.map((item, index) => {
        const leftIndex = (activeIndex - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length;
        const rightIndex = (activeIndex + 1) % CAROUSEL_DATA.length;

        let transform = 'scale(0)';
        let opacity = 0;
        let zIndex = 0;
        let filter = 'blur(4px)';

        if (index === activeIndex) {
          transform = 'translateX(0) scale(1)';
          opacity = 1;
          zIndex = 20;
          filter = 'blur(0px)';
        } else if (index === leftIndex) {
          transform = `translateX(-${isSmall ? '80' : '70'}%) scale(0.8)`;
          opacity = 1;
          zIndex = 10;
        } else if (index === rightIndex) {
          transform = `translateX(${isSmall ? '80' : '70'}%) scale(0.8)`;
          opacity = 1;
          zIndex = 10;
        }

        const isActive = index === activeIndex;
        const numberClasses = isSmall ? "text-xs" : "text-sm";
        const paddingClasses = isSmall ? "p-3" : "p-4 sm:p-5";

        return (
          <div
            key={item.id}
            className={cardClasses}
            style={{ transform, opacity, zIndex }}
            onClick={() => handleCardClick(index)}
          >
            <div className="p-[1px] rounded-xl bg-gradient-to-br from-indigo-500/60 via-indigo-500/10 to-transparent h-full w-full shadow-2xl shadow-black/50">
              <div className="relative w-full h-full rounded-[11px] overflow-hidden bg-black">
                <img 
                  src={item.imageUrl} 
                  alt={item.title.join(' ')}
                  className="w-full h-full object-cover"
                  style={{ filter }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                
                <div className="absolute top-3 right-3 z-20">
                  <span className={`text-white font-bold font-mono drop-shadow-md ${numberClasses}`}>
                    {item.id.toString().padStart(2, '0')}
                  </span>
                </div>

                <div className={`absolute inset-0 ${paddingClasses} flex flex-col justify-end text-white`}>
                  <p className="font-semibold text-[9px] text-indigo-400 tracking-widest uppercase mb-1">NAIKLVL.</p>
                  <h2 className={titleClasses}>
                    {item.title.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h2>
                </div>
                {isActive && (
                  <div className={playIconContainerClasses}>
                    <PlayIcon />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};