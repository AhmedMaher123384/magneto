import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, FileText, Trash2 } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';
import { useAppContext, Bundle } from '../context/AppContext';

const OrderFormSection: React.FC = () => {
  const context = useAppContext();
  if (!context) {
    throw new Error('OrderFormSection must be used within an AppProvider');
  }
  const { selectedBundles, removeBundle, calculateTotal, setSelectedBundles, productQuantity, updateProductQuantity } = context;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Double prevention of default form submission
    if (e.nativeEvent) {
      e.nativeEvent.preventDefault();
      e.nativeEvent.stopPropagation();
    }
    
    const form = e.currentTarget as HTMLFormElement;
  
    try {
      // Validation
      const name = (form.elements.namedItem('fullName') as HTMLInputElement).value.trim();
      const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
      const address = (form.elements.namedItem('address') as HTMLInputElement).value.trim();
      const notes = (form.elements.namedItem('notes') as HTMLTextAreaElement).value.trim();
      
      if (!name || !phone || !address) {
        alert('من فضلك املأ جميع الحقول المطلوبة');
        return;
      }
      
      // Saudi phone validation
      const phoneRegex = /^(\+966|00966|05|5)[0-9]{8}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('من فضلك أدخل رقم جوال سعودي صحيح');
        return;
      }
      
      // Prepare data
      const orderData = {
        name,
        phone,
        address,
        notes: notes || 'لا يوجد',
        total: calculateTotal(),
        bundles: selectedBundles,
        quantities: {},
        timestamp: new Date().toLocaleString('ar-SA'),
        orderId: Date.now().toString(36).toUpperCase()
      };
      
      // UI feedback - use React state instead of DOM manipulation
      setIsSubmitting(true);
      
      // Direct Telegram notification (removed Google Sheets completely)
      try {
        const telegramMessage = `
🛒 طلب جديد!

👤 الاسم: ${orderData.name}
📱 الجوال: ${orderData.phone}
📍 العنوان: ${orderData.address}
📝 الملاحظات: ${orderData.notes}
💰 الإجمالي: ${orderData.total} ريال
🔢 كمية المنتج: ${productQuantity} قطعة
📦 العروض: ${orderData.bundles.length > 0 ? orderData.bundles.map(b => `${b.title} (${b.quantity} قطع)`).join(', ') : 'لا يوجد'}

🆔 رقم الطلب: ${orderData.orderId}
⏰ الوقت: ${orderData.timestamp}
      `.trim();
        
        // Send to Telegram (replace with your bot token and chat ID)
         const telegramResponse = await fetch(`https://api.telegram.org/bot${'8363362288:AAFofr0_BeVbJYOqiYXfoVlgRV-09SPfi1U'}/sendMessage`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             chat_id: '879512604',
            text: telegramMessage,
            parse_mode: 'HTML'
          })
        });
        
        if (telegramResponse.ok) {
          // Success with Telegram - show modal
          setOrderId(orderData.orderId);
          
          // Clear the form safely - use React's form reset
          form.reset();
          
          // Clear bundles 
          setSelectedBundles([]);
          
          // Reset submitting state and show modal after a delay to ensure DOM is stable
          setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccessModal(true);
          }, 300);
        } else {
          throw new Error('Telegram failed');
        }
        
      } catch (telegramError) {
        console.error('Telegram failed:', telegramError);
        alert('حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى.');
        
        // Reset submitting state
        setIsSubmitting(false);
      }
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى.');
      
      // Reset submitting state
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-16 bg-[#0F0F0F] text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          dir="rtl"
          className="bg-white text-[#0F0F0F] rounded-xl p-5 shadow-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl sm:text-2xl font-extrabold mb-5 text-right">اطلب بكل سهولة الآن</h3>
          <form onSubmit={handleSubmit} className="space-y-3.5 mb-5">
            {[
              { placeholder: "الاسم الكامل", icon: User, name: "fullName" },
              { placeholder: "رقم الجوال", icon: Phone, name: "phone" },
              { placeholder: "العنوان", icon: MapPin, name: "address" },
              { placeholder: "ملاحظات (اختياري)", icon: FileText, name: "notes" },
            ].map((field, index) => (
              <div key={index} className="relative">
                {field.name === "notes" ? (
                  <textarea
                    placeholder={field.placeholder}
                    name={field.name}
                    className="w-full p-2.5 border border-[#E2E8F0] rounded-lg text-right pr-9 focus:ring-1 focus:ring-black focus:border-transparent transition-all duration-300 h-20 text-sm resize-none"
                  />
                ) : (
                  <input 
                    type={field.placeholder === "رقم الجوال" ? "tel" : "text"}
                    placeholder={field.placeholder}
                    name={field.name}
                    className="w-full p-2.5 border border-[#E2E8F0] rounded-lg text-right pr-9 focus:ring-1 focus:ring-black focus:border-transparent transition-all duration-300 text-sm"
                    required
                  />
                )}
                <field.icon className="absolute top-1/2 right-2.5 transform -translate-y-1/2 text-[#0F0F0F]" size={16} />
              </div>
            ))}
            
            {/* Product Quantity Selection */}
            <div className="bg-[#F9FAFB] p-3 rounded-lg border border-[#E2E8F0]">
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => updateProductQuantity(-1)}
                  disabled={productQuantity <= 1}
                  className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-lg font-bold text-[#0F0F0F] hover:bg-[#F3F4F6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="text-lg font-extrabold text-[#0F0F0F] min-w-[2.5rem] text-center">
                  {productQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateProductQuantity(1)}
                  className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-lg font-bold text-[#0F0F0F] hover:bg-[#F3F4F6] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            
            {selectedBundles.length > 0 && (
              <div className="mb-5 text-right">
                <h4 className="text-base font-bold mb-3">العروض المختارة</h4>
                <div className="space-y-2">
                  {selectedBundles.map((bundle: Bundle, index: number) => (
                    <div key={index} className="flex justify-between items-center bg-[#F9FAFB] p-2.5 rounded-md">
                      <div className="flex items-center gap-2">
                        <button
                        type="button"
                        onClick={() => removeBundle(index)}
                        className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                      >
                          <Trash2 size={14} />
                        </button>
                        <span className="text-[#1F2937] text-xs">{bundle.title} ({bundle.quantity} قطع – {bundle.bundlePrice} ريال)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('addBundle', { 
                            detail: { quantity: bundle.quantity, bundlePrice: bundle.bundlePrice, bundleTitle: bundle.title }
                          }));
                        }}
                        className="text-[#059669] hover:text-[#047857] transition-colors"
                      >
                        <span className="text-base font-bold">+</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#F9FAFB] p-3 rounded-lg">
              <div className="flex justify-between items-center mb-3 flex-row-reverse">
                <span className="text-xl font-extrabold text-[#0F0F0F]">{calculateTotal()} ريال</span>
                <span className="font-bold text-sm">المجموع</span>
              </div>
              <motion.button 
                type="submit"
                id="submit-order-btn"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-black text-white rounded-md font-bold text-sm hover:bg-[#1A1A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري الإرسال...
                  </>
                ) : (
                  'اشتري الآن'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setOrderId('');
        }}
        orderId={orderId}
      />
    </section>
  );
};

export default OrderFormSection;