import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

function ThankYou() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 text-right px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-lg mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <CheckCircle size={60} className="text-green-600 mx-auto" />
        </motion.div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-900 mb-4">شكراً على طلبك!</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-2">
          رقم طلبك: <strong>{orderId}</strong>
        </p>
        <p className="text-gray-600 mb-6">هنتواصل معاك قريب لتأكيد الطلب.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-lg font-bold text-base sm:text-lg hover:shadow-xl transition-all duration-300"
        >
          العودة للرئيسية
        </a>
      </div>
    </motion.div>
  );
}

export default ThankYou;