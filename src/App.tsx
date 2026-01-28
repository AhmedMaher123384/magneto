import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThermometerSun, Coffee, Battery, Star, User, Phone, MapPin, FileText, Trash2, CheckCircle } from 'lucide-react';

import Header from './components/Header';
import HeroSection from './sections/HeroSection';
import ProductGallerySection from './sections/ProductGallerySection';
import FeaturesSection from './sections/FeaturesSection';
import BundlesSection from './sections/BundlesSection';
import OrderFormSection from './sections/OrderFormSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CombinedInfoSection from './sections/CombinedInfoSection';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';
import { AppProvider, useAppContext } from './context/AppContext';
import FloatingButtons from './components/FloatingButtons';

// SECTION: Dynamic Image Imports — Start
const productImages = {
  hero: () => import('../asserts/0.jpg').then(module => module.default),
  img1: () => import('../asserts/1.jpg').then(module => module.default),
  img2: () => import('../asserts/2.jpg').then(module => module.default),
  img3: () => import('../asserts/3.jpg').then(module => module.default),
  img4: () => import('../asserts/4.jpg').then(module => module.default),
  img5: () => import('../asserts/5.jpg').then(module => module.default),
  img6: () => import('../asserts/6.jpg').then(module => module.default),
  logo: () => import('../asserts/logo.png').then(module => module.default),
};
// SECTION: Dynamic Image Imports — End

interface Bundle {
  title: string;
  quantity: number;
  bundlePrice: number;
}

















// SECTION: App — Start
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainContent />
      </AppProvider>
      <Routes>
        <Route path="/thank-you" element={
          <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] text-right px-4">
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xl max-w-md mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-5"
              >
                <CheckCircle size={50} className="text-[#059669] mx-auto" />
              </motion.div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F0F0F] mb-3">شكراً على ثقتك!</h1>
              <p className="text-[#1F2937] mb-1">
                رقم طلبك: <strong>#{new URLSearchParams(window.location.search).get('orderId') || '12345'}</strong>
              </p>
              <p className="text-[#64748B] mb-5 text-sm">سنتواصل معك قريباً لتأكيد التفاصيل.</p>
              <a
                href="/"
                className="inline-block px-5 py-2.5 bg-black text-white rounded-md font-bold text-sm hover:bg-[#1A1A1A] transition-colors"
              >
                العودة للرئيسية
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

const MainContent: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [logoSrc, setLogoSrc] = useState<string>('');
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(12 * 60 * 60);
  const originalPrice: number = 154;
  const imageKeys = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'] as const;

  const { selectedBundles, setSelectedBundles, removeBundle, calculateTotal, defaultPrice } = useAppContext();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => { 
    let ticking = false; 
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.scrollY;
          const scrollDelta = prevScrollPos - currentScrollPos;
          
          // Show header when scrolling up or at top
          if (scrollDelta > 5 || currentScrollPos < 50) {
            setIsVisible(true);
          } 
          // Hide header when scrolling down and not at top
          else if (scrollDelta < -10 && currentScrollPos > 100) {
            setIsVisible(false);
          }
          
          setPrevScrollPos(currentScrollPos);
          ticking = false;
        });
        ticking = true;
      }
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set timeout to show header after scrolling stops
      const timeout = setTimeout(() => {
        if (window.scrollY > 200) {
          setIsVisible(true);
        }
      }, 1500);
      
      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [prevScrollPos, scrollTimeout]);

  useEffect(() => {
    Promise.all(imageKeys.map(key => productImages[key]()))
      .then(sources => {
        setLoadedImages(sources);
        setSelectedImage(sources[0] || '');
      })
      .catch(console.error);

    productImages.logo()
      .then(src => setLogoSrc(src))
      .catch(() => setLogoSrc('fallback'));

    const handleAddBundle = (event: Event) => {
      const customEvent = event as CustomEvent<{ quantity: number; bundlePrice: number; bundleTitle: string }>;
      const { quantity, bundlePrice, bundleTitle } = customEvent.detail;
      setSelectedBundles(prev => [...prev, { title: bundleTitle, quantity, bundlePrice }]);
    };

    window.addEventListener('addBundle', handleAddBundle);

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.removeEventListener('addBundle', handleAddBundle);
      clearInterval(timer);
    };
  }, []);

  const scrollToForm = (): void => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBundles = (): void => {
    document.getElementById('bundles')?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleImageClick = (image: string): void => {
    setZoomedImage(image);
    setIsImageZoomed(true);
  };

  const closeZoomedImage = (): void => {
    setIsImageZoomed(false);
    setZoomedImage(null);
  };

  const onAddBundle = (bundle: { id: string; name: string; description: string; price: number; items: string[]; image: string; }) => {
    const newBundle = { title: bundle.name, quantity: 1, bundlePrice: bundle.price };
    setSelectedBundles(prev => [...prev, newBundle]);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-right">
      <Header logoSrc={logoSrc === 'fallback' ? null : logoSrc} isVisible={isVisible} />
      <HeroSection timeLeft={timeLeft} formatTime={formatTime} scrollToForm={scrollToForm} scrollToBundles={scrollToBundles} />
      <ProductGallerySection originalPrice={originalPrice} defaultPrice={defaultPrice} scrollToBundles={scrollToBundles} scrollToForm={scrollToForm} />
      <FeaturesSection />
      <BundlesSection onAddBundle={onAddBundle} />
      <CombinedInfoSection />
      <OrderFormSection />
      <TestimonialsSection />
      <CTASection scrollToForm={scrollToForm} />
      <FloatingButtons /> <Footer logoSrc={logoSrc} />
    </div>
  );
};

export default App;