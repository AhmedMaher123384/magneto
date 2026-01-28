import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGallerySectionProps {
  defaultPrice: number;
  originalPrice: number;
  scrollToBundles: () => void;
  scrollToForm: () => void;
}

const productImages = {
  img1: () => import('../../asserts/1.jpg').then(module => module.default),
  img2: () => import('../../asserts/2.jpg').then(module => module.default),
  img3: () => import('../../asserts/3.jpg').then(module => module.default),
  img4: () => import('../../asserts/4.jpg').then(module => module.default),
  img5: () => import('../../asserts/5.jpg').then(module => module.default),
  img6: () => import('../../asserts/6.jpg').then(module => module.default),
};

const imageKeys = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'] as const;

const descriptionItems = [
  { icon: "☕", text: "تحكم ممتاز: يحافظ على دفء المشروب كما تريد" },
  { icon: "🧼", text: "سهل التنظيف: خفيف ومناسب في أي مكان" },
  { icon: "🔥", text: "تسخين قوي: آمن وسريع" },
  { icon: "🛡️", text: "متين للغاية: يقاوم الحرارة والسوائل" },
  { icon: "🎁", text: "تصميم أنيق: دقة في التفاصيل" },
];

const ProductGallerySection: React.FC<ProductGallerySectionProps> = ({ defaultPrice, originalPrice, scrollToBundles, scrollToForm }) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    Promise.all(imageKeys.map(key => productImages[key]()))
      .then(sources => {
        setLoadedImages(sources);
        setSelectedImage(sources[0] || '');
      })
      .catch(console.error);
  }, []);

  const handleImageClick = (image: string): void => {
    setZoomedImage(image);
    setIsImageZoomed(true);
  };

  const closeZoomedImage = (): void => {
    setIsImageZoomed(false);
    setZoomedImage(null);
  };

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div 
              className="space-y-6 flex-1"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="relative w-full h-[280px] sm:h-[360px] rounded-xl overflow-hidden shadow-md">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="عرض المنتج"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => handleImageClick(selectedImage)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#F9FAFB] text-[#94A3B8] text-sm">جارٍ التحميل...</div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {loadedImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === image ? 'border-black' : 'border-[#E2E8F0]'} hover:border-black`}
                    whileHover={{ scale: 1.08 }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={image} alt={`صورة ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="space-y-5 flex-1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="bg-[#F9FAFB] p-3.5 rounded-xl shadow-sm border border-[#E2E8F0]">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-[#E2E8F0] text-[#0F0F0F] text-xs px-2 py-0.5 rounded font-semibold">35% خصم</span>
                    <p className="text-xs text-[#64748B]">شامل الضريبة</p>
                  </div>
                  <span className="text-right">
                    <span className="text-lg font-bold text-[#0F0F0F]">{defaultPrice} ريال</span>
                    <span className="text-xs text-[#94A3B8] line-through mx-1">{originalPrice} ريال</span>
                  </span>
                </div>
              </div>
              <div className="space-y-2.5">
                {descriptionItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <span className="text-base text-[#4A5568]">{item.icon}</span>
                    <p className="text-[#1F2937] text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
              <motion.button 
                onClick={scrollToBundles}
                className="w-full py-2.5 bg-[#F1F5F9] text-[#0F0F0F] rounded-md font-bold text-sm shadow hover:shadow-md transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                شاهد العروض
              </motion.button>
              <motion.button 
                onClick={scrollToForm}
                className="w-full py-2.5 bg-black text-white rounded-md font-bold text-sm shadow hover:shadow-md transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                اطلب الآن
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isImageZoomed && zoomedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeZoomedImage}
          >
            <motion.img
              src={zoomedImage}
              alt="صورة مكبرة"
              className="max-w-[90%] max-h-[90%] object-contain"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-3 right-3 text-white text-lg bg-[#1F2937] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#374151] transition-colors"
              onClick={closeZoomedImage}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductGallerySection;