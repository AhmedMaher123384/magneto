import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';
import { ThermometerSun, Coffee, Battery, CheckCircle } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl sm:text-3xl font-extrabold text-center mb-10 text-[#0F0F0F]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          لماذا تختار HeatMug؟
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <FeatureCard icon={<ThermometerSun size={32} className="text-[#64748B]" />} title="تحكم دقيق" description="ضبط الحرارة حسب رغبتك" />
          <FeatureCard icon={<Coffee size={32} className="text-[#64748B]" />} title="تصميم أنيق" description="خفيف، عملي، وفاخر" />
          <FeatureCard icon={<Battery size={32} className="text-[#64748B]" />} title="كفاءة عالية" description="تسخين سريع وآمن" />
          <FeatureCard icon={<CheckCircle size={32} className="text-[#64748B]" />} title="جودة مضمونة" description="متانة وعمر افتراضي طويل" />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;