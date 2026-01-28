import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, orderId }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isAnimatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      isAnimatingRef.current = true;
    } else {
      // Ensure cleanup happens safely
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsMounted(false);
        isAnimatingRef.current = false;
      }, 300);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    if (isAnimatingRef.current) {
      // Add delay to ensure animations complete safely
      timeoutRef.current = setTimeout(() => {
        onClose();
      }, 150);
    }
  };

  // Don't render anything if not mounted (prevents DOM conflicts)
  if (!isMounted) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      <motion.div 
        key="success-modal-backdrop"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={handleClose}
      >
        <motion.div 
          key="success-modal-content"
          className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 text-center"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">تم استلام طلبك بنجاح!</h2>
            <p className="text-gray-600 mb-4">شكراً لثقتك بنا، سنتواصل معك قريباً لتأكيد الطلب.</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">رقم الطلب</p>
              <p className="text-lg font-bold text-gray-900">{orderId}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            إغلاق
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Use portal to render outside the normal DOM hierarchy
  return createPortal(modalContent, document.body);
};

export default SuccessModal;