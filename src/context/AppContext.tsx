import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Bundle {
  title: string;
  quantity: number;
  bundlePrice: number;
}

interface AppContextType {
  selectedBundles: Bundle[];
  setSelectedBundles: React.Dispatch<React.SetStateAction<Bundle[]>>;
  removeBundle: (index: number) => void;
  calculateTotal: () => number;
  defaultPrice: number;
  productQuantity: number;
  setProductQuantity: React.Dispatch<React.SetStateAction<number>>;
  updateProductQuantity: (change: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedBundles, setSelectedBundles] = useState<Bundle[]>([]);
  const [productQuantity, setProductQuantity] = useState<number>(1); // Default to 1 product

  const defaultPrice = 100;

  const removeBundle = (index: number) => {
    setSelectedBundles(prev => prev.filter((_, i) => i !== index));
  };

  const updateProductQuantity = (change: number) => {
    setProductQuantity(prev => Math.max(1, prev + change)); // Minimum 1 product
  };

  const calculateTotal = () => {
    const bundlesTotal = selectedBundles.reduce((sum, bundle) => sum + bundle.bundlePrice, 0);
    const productTotal = productQuantity * defaultPrice;
    return bundlesTotal + productTotal;
  };

  return (
    <AppContext.Provider value={{ 
      selectedBundles, 
      setSelectedBundles, 
      removeBundle, 
      calculateTotal, 
      defaultPrice,
      productQuantity,
      setProductQuantity,
      updateProductQuantity
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (undefined === context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};