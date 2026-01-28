import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChevronDown, Zap, Shield, Truck, Coffee, Clock, Info } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "كيف يعمل مسخن القهوة الكهربائي؟",
      icon: <Zap size={22} />,
      answer: "يعمل مسخن القهوة الكهربائي عن طريق لوحة تسخين مدمجة تحافظ على درجة حرارة مشروبك بشكل مثالي. يمكنك ضبط درجة الحرارة المناسبة (بين 40-65 درجة مئوية) بحسب تفضيلاتك الشخصية. يعمل بنظام آمن مع خاصية الإيقاف التلقائي بعد ساعتين من الاستخدام المتواصل."
    },
    {
      question: "ما هي مدة الضمان؟",
      icon: <Shield size={22} />,
      answer: "نقدم ضمانًا شاملًا لمدة شهر واحد ضد عيوب التصنيع."
    },
    {
      question: "ما هي المدة المتوقعة للشحن؟",
      icon: <Truck size={22} />,
      answer: "يتم شحن الطلبات خلال 24 ساعة من تأكيد الطلب. تصل المنتجات عادةً خلال 3-5 أيام عمل للمدن الرئيسية و5-7 أيام للمناطق النائية."
    },
    {
      question: "هل المنتج آمن للاستخدام؟",
      icon: <Coffee size={22} />,
      answer: "نعم، مصمم بأعلى معايير السلامة مع خاصية الإيقاف التلقائي وحماية من السخونة الزائدة."
    },
    {
      question: "كيف يمكنني تنظيف المسخن؟",
      icon: <Info size={22} />,
      answer: "استخدم قطعة قماش مبللة لمسح السطح بعد فصله عن الكهرباء وتركه ليبرد."
    },
    {
      question: "ما هي المدة التي يستمر فيها المشروب دافئًا؟",
      icon: <Clock size={22} />,
      answer: "يحافظ على الحرارة لمدة تصل إلى 8 ساعات متواصلة."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-black overflow-hidden relative">
      {/* خلفية إبداعية: شبكة معدنية + تدرجات */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #27272a 25%, transparent 25%), linear-gradient(-45deg, #27272a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #27272a 75%), linear-gradient(-45deg, transparent 75%, #27272a 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* العنوان الإبداعي */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            الأسئلة الشائعة
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
            كل ما تحتاج معرفته عن مسخن القهوة الكهربائي – بإجابات واضحة وسريعة.
          </p>
          <div className="flex justify-center items-center gap-3 mt-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
            <div className="w-3 h-3 bg-zinc-500 rounded-full animate-pulse" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
          </div>
        </motion.div>

        <LayoutGroup>
          <div className="space-y-5">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-content-${index}`}
                  className={`
                    w-full flex justify-between items-center p-5 rounded-2xl
                    bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900
                    border border-zinc-700
                    transition-all duration-300
                    hover:border-zinc-500 hover:shadow-2xl hover:shadow-zinc-900/50
                    focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-black
                    ${openIndex === index ? 'border-zinc-400 shadow-xl shadow-zinc-900/70' : ''}
                  `}
                >
                  <div className="flex items-center gap-4 text-right">
                    <div className={`
                      p-3 rounded-xl transition-all duration-300
                      ${openIndex === index ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400 group-hover:text-white'}
                    `}>
                      {item.icon}
                    </div>
                    <h3 
                      id={`faq-title-${index}`}
                      className="font-bold text-lg text-white"
                    >
                      {item.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-zinc-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-content-${index}`}
                      role="region"
                      aria-labelledby={`faq-title-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-3 text-zinc-300 leading-relaxed text-right bg-zinc-900/50 backdrop-blur-sm rounded-b-2xl border-x border-b border-zinc-700">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </LayoutGroup>
        <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-16"
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent"></div>
                </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;