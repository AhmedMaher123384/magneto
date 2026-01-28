import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Coffee, Sparkles } from 'lucide-react';

const AboutUsSection: React.FC = () => {
  const stats = [
    { value: "+5,000", label: "عميل سعيد", icon: <Users size={28} /> },
    { value: "98.7%", label: "رضا عملاء", icon: <Star size={28} /> },
  ];

  return (
    <section id="about" className="py-24 bg-black overflow-hidden relative">
      {/* خلفية إبداعية: شبكة معدنية + تدرجات فضية */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #27272a 25%, transparent 25%), linear-gradient(-45deg, #27272a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #27272a 75%), linear-gradient(-45deg, transparent 75%, #27272a 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* العنوان الإبداعي */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            من نحن؟
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
            مشروع سعودي طموح يحول لحظات القهوة إلى تجارب فاخرة لا تُنسى
          </p>
          <div className="flex justify-center items-center gap-3 mt-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
            <div className="w-3 h-3 bg-zinc-500 rounded-full animate-pulse" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* النص */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-zinc-300 leading-relaxed text-lg">
              نحن <span className="text-white font-bold">HeatMug</span>، مشروع سعوديّ طموح يسعى لتحويل لحظات القهوة اليومية إلى تجارب فاخرة لا تُنسى.
            </p>
            <p className="text-zinc-300 leading-relaxed text-lg">
              انطلقنا من قناعةٍ بسيطة: أن <span className="text-zinc-100 font-medium">الدفء لا يقتصر على المشروب</span>، بل يشمل التصميم، الجودة، والخدمة.
            </p>
            <p className="text-zinc-300 leading-relaxed text-lg">
              كل منتج نصمّمه يمرّ بمعايير صارمة: <span className="text-zinc-100 font-medium">متانة، سلامة، جمالية</span> — دون أي تنازل.
            </p>

            {/* الإحصائيات */}
            <div className="flex gap-8 pt-6 border-t border-zinc-800">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-3 rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 group-hover:border-zinc-500 transition-colors">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-zinc-400 text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* الصورة / اللوغو */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 group">
              {/* تأثير الهالة الخارجية */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-zinc-600 rounded-full blur-3xl opacity-30"
              />

              {/* الخلفية المعدنية */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black rounded-3xl border border-zinc-700 shadow-2xl" />

              {/* اللوغو الداخلي */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <div className="relative">
                  {/* حلقة خارجية معدنية */}
                  <div className="absolute inset-0 w-48 h-48 rounded-full border-4 border-zinc-600 animate-spin-slow" />
                  
                  {/* اللوغو */}
                  <div className="relative bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 w-48 h-48 rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-6xl font-thin text-white tracking-widest select-none">
                      HM
                    </span>
                  </div>

                  {/* لمعان داخلي */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-xl" />
                </div>
              </div>

              {/* أيقونة قهوة تتحرك */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 p-3 bg-zinc-800 rounded-full border border-zinc-600"
              >
                <Coffee size={24} className="text-zinc-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS مخصص للـ spin */}
      <style >{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutUsSection;