import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import HeroImage from '../components/HeroImage';
import { Coffee, Clock, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  timeLeft: number;
  formatTime: (seconds: number) => string;
  scrollToForm: () => void;
  scrollToBundles: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ timeLeft, formatTime, scrollToForm, scrollToBundles }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.3);
    mouseY.set(y * 0.3);
  };

  const title = "استمتع بمشروبك دافئ في أي وقت";
  const subtitle = "مسخن قهوة كهربائي بتصميم عصري وأداء قوي — اطلبه الآن بخصم 35%";

  return (
    <section className="relative pt-12 pb-16 bg-white overflow-hidden" dir="rtl">
      {/* خلفية بيضاء نقية + تأثيرات خفيفة */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100 to-transparent rounded-full blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* النص */}
          <motion.div 
            className="space-y-8 text-center lg:text-right lg:pl-0 lg:pr-16"
            initial={{ opacity: 0, x: 80 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* العنوان - كلمة بكلمة */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
              {title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                  className="inline-block mr-2" // مسافة للكلمات
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* الوصف */}
            <motion.p 
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>

            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row-reverse gap-6 justify-start items-start lg:ml-0 lg:pl-0"> 
              {/* زر اطلب الآن - تصميم رصاصي معدني */}
              <motion.button
                onClick={scrollToForm}
                className="relative px-12 py-6 bg-gradient-to-br from-gray-600 to-gray-800 text-white font-black text-2xl rounded-lg shadow-2xl overflow-hidden group border-2 border-gray-700"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 30px 60px rgba(75, 85, 99, 0.4)",
                  background: "linear-gradient(135deg, #4b5563, #374151)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="relative z-10 flex items-center gap-4 tracking-wider">
                  اطلب الآن
                  <motion.span
                    className="text-gray-300"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Sparkles size={24} />
                  </motion.span>
                </span>
                {/* تأثير لمعان رصاصي */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                {/* تأثير إضاءة جانبية رصاصية */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-transparent to-gray-800 opacity-40" />
              </motion.button>

              {/* زر شاهد العروض - تصميم رصاصي معدني */}
              <motion.button
                onClick={scrollToBundles}
                className="relative px-12 py-6 bg-gradient-to-br from-gray-700 to-gray-900 text-white font-bold text-xl rounded-xl shadow-xl overflow-hidden group border border-gray-600"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(107, 114, 128, 0.3)",
                  background: "linear-gradient(135deg, #374151, #1f2937)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="relative z-10 flex items-center gap-3 tracking-wide">
                  استكشف العروض
                  {/* خطوط تزيينية */}
                  <span className="flex flex-col gap-1">
                    <span className="w-6 h-0.5 bg-gray-400 rounded-full" />
                    <span className="w-4 h-0.5 bg-gray-500 rounded-full" />
                    <span className="w-6 h-0.5 bg-gray-400 rounded-full" />
                  </span>
                </span>
                {/* تأثير معدني لامع */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* تأثير حدود مضيئة */}
                <motion.div
                  className="absolute inset-0 border-2 border-gray-500 rounded-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>

          {/* الصورة + التايمر */}
          <motion.div 
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            onMouseMove={handleMouseMove}
          >
            {/* صورة المنتج - 3D خفيف + ظل ناعم */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative p-8"
            >
              <div className="relative">
                <HeroImage />
                {/* ظل ناعم تحت المنتج */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-200 to-transparent blur-3xl opacity-40"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                {/* لمعان خفيف */}
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 bg-white/80 rounded-full blur-xl" // معكوس لـ RTL
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* التايمر - أنيق وينبض */}
            <motion.div
              className="relative bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 px-6 py-3 rounded-2xl shadow-lg border border-gray-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-2 text-sm md:text-base font-bold">
                <Clock size={18} className="text-gray-700" />
                <span>العرض ينتهي خلال:</span>
                <motion.span 
                  className="font-mono text-lg text-gray-800"
                  key={timeLeft}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {formatTime(timeLeft)}
                </motion.span>
              </div>
              {/* نبض خفيف */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* تأثير طفو خفيف للصورة */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;