import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl sm:text-3xl font-extrabold text-center mb-10 text-[#0F0F0F]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          آراء العملاء
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { name: "أحمد", text: "منتج فخم، القهوة دايم دافئة!" },
            { name: "سارة", text: "تصميمه رائع والخدمة متميزة، أنصح به بشدة" },
            { name: "محمد", text: "استخدمه يومياً، مسخن القهوة الأفضل جربته" }
          ].map((review, index) => (
            <motion.div 
              key={index}
              className="bg-[#F9FAFB] p-4 rounded-xl border border-[#E2E8F0]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex justify-end mb-3">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={14} className="text-[#E2E8F0]" />
                ))}
              </div>
              <p className="text-[#4A5568] text-sm mb-3">"{review.text}"</p>
              <p className="font-bold text-[#0F0F0F] text-sm">{review.name}</p>
            </motion.div>
          ))}
           {/* خط سفلي إبداعي */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16"
                  >
                    <div className="h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent"></div>
                  </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;