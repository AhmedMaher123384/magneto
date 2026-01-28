import React from 'react';
import FallbackLogo from '../components/FallbackLogo';

interface FooterProps {
  logoSrc: string;
}

const Footer: React.FC<FooterProps> = ({ logoSrc }) => {
  return (
    <footer className="bg-[#0F0F0F] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div>
            {logoSrc === 'fallback' ? <FallbackLogo /> : logoSrc ? (
              <img src={logoSrc} alt="HeatMug Logo" className="h-8 object-contain" />
            ) : <div className="w-20 h-5 bg-[#333] rounded animate-pulse" />}
          </div>
          <div className="flex flex-wrap gap-3 justify-center text-[#94A3B8] text-xs">
            {['الرئيسية', 'المميزات', 'الباقات', 'من نحن', 'الطلب', 'الآراء', 'الأسئلة', 'الإرجاع', 'الشروط'].map((item, i) => (
              <a 
                key={i} 
                href={`#${item === 'الرئيسية' ? '' : 
                       item === 'المميزات' ? 'features' : 
                       item === 'الباقات' ? 'bundles' : 
                       item === 'من نحن' ? 'about' : 
                       item === 'الطلب' ? 'order-form' : 
                       item === 'الآراء' ? 'testimonials' : 
                       item === 'الأسئلة' ? 'faq' : 
                       item === 'الإرجاع' ? 'return-policy' : 'terms'}`}
                className="hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-[#94A3B8] text-xs">&copy; 2023 HeatMug. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;