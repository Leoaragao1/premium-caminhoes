import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { auth, db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    setUser(localStorage.getItem('admin_auth') === 'true');

    // Fetch site logo
    const fetchLogo = async () => {
      try {
        const snap = await getDocs(collection(db, 'settings'));
        if (!snap.empty) {
          const data = snap.docs[0].data();
          if (data.logoUrl) setLogoUrl(data.logoUrl);
        }
      } catch (err) {
        console.error("Error fetching logo:", err);
      }
    };
    fetchLogo();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    window.location.href = '/';
  };

  const isAdminPage = location.pathname.startsWith('/admin');

  const navLinks = [
    { label: 'Estoque', href: '/estoque' },
    { label: 'Sobre Nós', href: '/sobre-nos' },
    { label: 'Contato', href: '/contato' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled || isMenuOpen ? "glass-effect shadow-2xl py-3" : "bg-transparent py-5"
      )}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
           {logoUrl ? (
             <img 
               src={logoUrl} 
               alt="Premium Caminhões" 
               className="h-12 md:h-16 w-auto object-contain"
               referrerPolicy="no-referrer"
               onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
                 const target = e.target as HTMLImageElement;
                 if (target.parentElement && !target.parentElement.querySelector('.text-logo')) {
                   const span = document.createElement('span');
                   span.className = 'text-logo font-headline font-black text-xl md:text-2xl text-primary uppercase tracking-tighter';
                   span.innerHTML = 'PREMIUM <span class="text-white">CAMINHÕES</span>';
                   target.parentElement.appendChild(span);
                 }
               }}
             />
           ) : (
             <span className="text-logo font-headline font-black text-xl md:text-2xl text-primary uppercase tracking-tighter">
                PREMIUM <span className="text-white">CAMINHÕES</span>
             </span>
           )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-headline font-bold uppercase tracking-tighter text-sm text-gray-300 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-[70px] bg-background/95 backdrop-blur-lg z-40 md:hidden transition-transform duration-300",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-headline font-black text-3xl uppercase tracking-tighter text-white hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
