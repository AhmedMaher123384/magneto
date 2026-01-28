import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Assuming productImages is passed as prop or imported separately; will handle in dependencies task
const productImages = {
  hero: () => import('../../asserts/0.jpg').then(module => module.default),
};

const HeroImage: React.FC = () => {
  const [heroImageSrc, setHeroImageSrc] = useState<string>('');
  useEffect(() => {
    productImages.hero().then(src => setHeroImageSrc(src)).catch(console.error);
  }, []);
  return (
    <motion.div 
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      {heroImageSrc ? (
        <img
          src={heroImageSrc}
          alt="مسخن القهوة الكهربائي"
          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#121212] text-[#CBD5E1]">جارٍ التحميل...</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    </motion.div>
  );
};

export default HeroImage;