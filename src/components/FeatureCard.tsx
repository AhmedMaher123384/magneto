import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div 
    className="p-6 bg-[#FAFAFA] rounded-xl shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow duration-300"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-4 text-[#CBD5E1] flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold text-[#0F0F0F] text-center">{title}</h3>
    <p className="text-[#64748B] text-center mt-2 leading-relaxed">{description}</p>
  </motion.div>
);

export default FeatureCard;