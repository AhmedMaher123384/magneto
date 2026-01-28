import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  items: string[];
  image: string;
}

const bundles: Bundle[] = [
  // Example bundles based on typical e-commerce structure
  {
    id: 'bundle1',
    name: 'الباقة الأساسية',
    description: 'مسخن قهوة مع كوب واحد',
    price: 199,
    items: ['مسخن قهوة', 'كوب حراري'],
    image: '/images/bundle1.jpg'
  },
  {
    id: 'bundle2',
    name: 'الباقة العائلية',
    description: 'مسخن قهوة مع أربعة أكواب',
    price: 499,
    items: ['مسخن قهوة', '4 أكواب حرارية'],
    image: '/images/bundle2.jpg'
  },
  // Add more bundles as per original code
];

const BundlesSection: React.FC<{ onAddBundle: (bundle: Bundle) => void }> = ({ onAddBundle }) => {
  return (
    <section id="bundles" className="py-20 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] mb-4">الباقات المتاحة</h2>
          <p className="text-[#4A5568] text-lg">اختر الباقة المناسبة لك</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img src={bundle.image} alt={bundle.name} className="w-full h-48 object-cover" />
              <div className="p-6 text-right">
                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">{bundle.name}</h3>
                <p className="text-[#4A5568] mb-4">{bundle.description}</p>
                <ul className="mb-4 text-[#4A5568]">
                  {bundle.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#0F0F0F]">{bundle.price} جنيه</span>
                  <button
                    onClick={() => onAddBundle(bundle)}
                    className="bg-[#0F0F0F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1F2937] transition-colors"
                  >
                    <ShoppingCart size={18} />
                    أضف الباقة
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BundlesSection;