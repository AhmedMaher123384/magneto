import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChevronDown, Shield, FileText, RotateCw, User, ArrowRight } from 'lucide-react';

const TermsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => setOpenIndex(openIndex === index ? null : index);

  const terms = [
    {
      title: "المسؤولية والملكية",
      icon: <Shield size={22} />,
      content: "المنتجات تُباع كما هي، ولا تتحمل HeatMug مسؤولية سوء الاستخدام أو التعديل غير المصرح به. تكون ملكية المنتج ومسؤوليته عند التسليم."
    },
    {
      title: "الدفع والتأمين",
      icon: <FileText size={22} />,
      content: "يتم قبول الدفع عند الاستلام فقط. لا يتم تحصيل أي مبالغ مقدمة. يُعد الطلب مؤكدًا فور تسجيله في النظام."
    },
    {
      title: "التعديل والإلغاء",
      icon: <ArrowRight size={22} />,
      content: "يمكن تعديل أو إلغاء الطلب خلال ساعة من التسجيل. بعد ذلك، يخضع للسياسات المذكورة في قسم الإرجاع والاستبدال."
    },
    {
      title: "البيانات الشخصية",
      icon: <User size={22} />,
      content: "تُستخدم بيانات العملاء حصريًا لأغراض تسليم الطلب والاتصالات المتعلقة به. لا تُباع أو تُؤجَر لأطراف ثالثة تحت أي ظرف."
    },
    {
      title: "التحديثات والتغييرات",
      icon: <RotateCw size={22} />,
      content: "يحق لـ HeatMug تعديل هذه الشروط في أي وقت. يُعتبر استمرار استخدام الموقع أو الطلب بعد التعديل موافقة ضمنية."
    }
  ];

  return (
    <section id="terms" className="py-24 bg-black overflow-hidden relative">
      {/* خلفية إبداعية: شبكة معدنية + تأثيرات لمعان */}
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
            الشروط والأحكام
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
            اتفاق قانوني يحمي حقوقك وحقوقنا. اقرأ بعناية قبل إتمام الطلب.
          </p>
          <div className="flex justify-center items-center gap-3 mt-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
            <div className="w-3 h-3 bg-zinc-500 rounded-full animate-pulse" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
          </div>
        </motion.div>

        <LayoutGroup>
          <div className="space-y-5">
            {terms.map((term, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <button
                  onClick={() => toggleItem(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`term-content-${index}`}
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
                      {term.icon}
                    </div>
                    <h3 
                      id={`term-title-${index}`}
                      className="font-bold text-lg text-white"
                    >
                      {term.title}
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
                      id={`term-content-${index}`}
                      role="region"
                      aria-labelledby={`term-title-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-3 text-zinc-300 leading-relaxed text-right bg-zinc-900/50 backdrop-blur-sm rounded-b-2xl border-x border-b border-zinc-700">
                        {term.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </LayoutGroup>

       
      </div>
    </section>
  );
};

export default TermsSection;