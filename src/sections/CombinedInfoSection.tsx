import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutUsSection from './AboutUsSection';
import FAQSection from './FAQSection';
import ReturnPolicySection from './ReturnPolicySection';
import TermsSection from './TermsSection';
import { Info, HelpCircle, Package, FileText } from 'lucide-react';

const CombinedInfoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'من نحن', icon: <Info size={18} /> },
    { id: 'faq', label: 'الأسئلة الشائعة', icon: <HelpCircle size={18} /> },
    { id: 'return', label: 'سياسة الإرجاع', icon: <Package size={18} /> },
    { id: 'terms', label: 'الشروط والأحكام', icon: <FileText size={18} /> },
  ];

  const tabContent = {
    about: <AboutUsSection />,
    faq: <FAQSection />,
    return: <ReturnPolicySection />,
    terms: <TermsSection />,
  };

  return (
    <section className="py-24 bg-black overflow-hidden relative">
      {/* نفس الخلفية المعدنية الفاخرة */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #27272a 25%, transparent 25%), linear-gradient(-45deg, #27272a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #27272a 75%), linear-gradient(-45deg, transparent 75%, #27272a 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
       

        {/* Tabs إبداعية: شريط معدني دوّار + أيقونات */}
        <div className="flex justify-center mb-12 overflow-x-auto scrollbar-hide">
          <div className="inline-flex items-center bg-zinc-900/50 backdrop-blur-md border border-zinc-700 rounded-full p-1.5 shadow-xl">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                className={`
                  relative flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm md:text-base transition-all duration-300
                  ${activeTab === tab.id 
                    ? 'text-black bg-white shadow-lg' 
                    : 'text-zinc-400 hover:text-white'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={activeTab === tab.id ? 'text-black' : ''}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                
                {/* تأثير لمعان عند التحديد */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* المحتوى مع انتقال سلس */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`panel-${activeTab}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-h-[600px]"
          >
            {tabContent[activeTab as keyof typeof tabContent]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CSS مخصص للـ scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CombinedInfoSection;