import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Temporarily disable StrictMode to test if this resolves the NotFoundError
// This is a development-only issue caused by React's double rendering in StrictMode
// combined with Framer Motion animations
createRoot(document.getElementById('root')!).render(
  <App />
);
