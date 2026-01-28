import React, { useState, useEffect } from 'react';
import { ChevronUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButtons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('9665xxxxxxxx'); // سيتم تحديثه من السياق أو الإعدادات

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('مرحباً، أريد الاستفسار عن منتج HeatMug');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* زر واتساب - دائماً ظاهر */}
        <motion.button
          onClick={openWhatsApp}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          title="تواصل معنا عبر واتساب"
        >
          <MessageCircle size={24} className="group-hover:animate-pulse" />
        </motion.button>

        {/* زر العودة للأعلى - يظهر عند التمرير لأسفل */}
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="w-14 h-14 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            title="العودة للأعلى"
          >
            <ChevronUp size={24} className="group-hover:animate-bounce" />
          </motion.button>
        )}
      </div>
    </AnimatePresence>
  );
};

export default FloatingButtons;