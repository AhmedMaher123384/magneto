import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Zap, Package, Users, ShoppingCart, MessageCircle, HelpCircle, FileText, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  logoSrc: string | null;
  isVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, isVisible }) => {
  const navItems = [
    { label: 'الرئيسية', icon: <Home size={16} />, href: '#' },
    { label: 'المميزات', icon: <Zap size={16} />, href: '#features' },
    { label: 'الباقات', icon: <Package size={16} />, href: '#bundles' },
    { label: 'من نحن', icon: <Users size={16} />, href: '#about' },
    { label: 'الطلب', icon: <ShoppingCart size={16} />, href: '#order-form' },
    { label: 'الآراء', icon: <MessageCircle size={16} />, href: '#testimonials' },
    { label: 'الأسئلة', icon: <HelpCircle size={16} />, href: '#faq' },
    { label: 'الإرجاع', icon: <ArrowLeft size={16} />, href: '#return-policy' },
    { label: 'الشروط', icon: <FileText size={16} />, href: '#terms' },
  ];

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
        initial={{ y: -120 }}
        animate={{ y: isVisible ? 0 : -120 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.25, 0.1, 0.25, 1],
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        {/* خلفية معدنية شفافة مع تأثير blur */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xl border-b border-zinc-800">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `linear-gradient(45deg, #27272a 25%, transparent 25%), linear-gradient(-45deg, #27272a 25%, transparent 25%)`,
                backgroundSize: '20px 20px',
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between py-3">
            {/* اللوغو */}
            <motion.div
              className="w-28 sm:w-32 relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {logoSrc ? (
                <motion.img
                  src={logoSrc}
                  alt="HeatMug Logo"
                  className="w-full h-auto object-contain drop-shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
              ) : (
                <FallbackLogo />
              )}
              {/* لمعان عند الـ hover */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>

            {/* النافبار - معدني دوّار */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-900/50 backdrop-blur-md border border-zinc-700 rounded-full p-1 shadow-2xl">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(item.href);
                  }}
                  className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-zinc-400 hover:text-white transition-all duration-300 group text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {/* مؤشر نشط */}
                  
                </motion.a>
              ))}
            </nav>

            {/* زر "اطلب الآن" - ينبض */}
            <motion.button
              className="relative px-5 py-2.5 bg-gradient-to-r from-white to-zinc-200 text-black font-bold text-sm rounded-full shadow-xl overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScroll('#order-form')}
              aria-label="اطلب الآن"
            >
              <span className="relative z-10 flex items-center gap-2">
                اطلب الآن
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ←
                </motion.span>
              </span>
              {/* تأثير لمعان متحرك */}
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              {/* نبض خفيف */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* مساحة فارغة تحت الهيدر */}
      <div className="h-24" />
    </>
  );
};

const FallbackLogo: React.FC = () => (
  <motion.div
    className="flex items-center gap-1"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <span className="text-xl font-black text-white tracking-tighter">Heat</span>
    <span className="text-xl font-thin tracking-widest text-zinc-400">Mug</span>
    {/* لمعان خفيف */}
    <motion.div
      className="absolute -inset-1 bg-white/10 rounded-full blur-xl -z-10"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </motion.div>
);

export default Header;