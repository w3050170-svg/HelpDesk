import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// 1. מייבאים את ה-Provider שיצרנו (שימי לב שהנתיב נכון לפי התיקייה שפתחת)
import { AuthProvider } from './assets/context/AuthContext.tsx'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. עוטפים את App בתוך ה-AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)