import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Contact from './pages/Contact';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CookieConsent from './components/CookieConsent';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth') === 'true';
    setUser(isAuth);
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-headline font-black text-2xl animate-pulse">CARREGANDO...</div>;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen selection:bg-primary selection:text-black">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estoque" element={<Catalog />} />
            <Route path="/sobre-nos" element={<About />} />
            <Route path="/veiculo/:id" element={<ProductDetail />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-de-uso" element={<TermsOfUse />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <CookieConsent />
        <Footer />
      </div>
    </Router>
  );
}
