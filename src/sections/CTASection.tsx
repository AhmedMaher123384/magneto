import React from 'react';
import { motion } from 'framer-motion';

interface CTASectionProps {
  scrollToForm: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ scrollToForm }) => {
  return (
    <section className="py-16 bg-[#0F0F0F] text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-2xl sm:text-3xl font-extrabold mb-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          خصم 35% لفترة محدودة
        </motion.h2>
        <motion.p 
          className="text-base sm:text-lg mb-5 max-w-xl mx-auto opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          لا تفوت الفرصة — اطلب مسخن القهوة اليوم واستمتع بخبرة فريدة
        </motion.p>
        <motion.button 
          onClick={scrollToForm}
          className="px-5 py-2.5 bg-white text-black rounded-md font-bold text-sm shadow hover:shadow-md transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          اطلب قبل انتهاء العرض
        </motion.button>
      </div>
    </section>
  );
};

export default CTASection;