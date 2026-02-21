import { useState, useEffect } from 'react';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const goToBlog = () => {
    navigate('/blog');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/60 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-purple-700 cursor-pointer" onClick={() => scrollToSection('hero')}>
            Mindspace
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-purple-700 hover:text-purple-900 font-medium">
              Ana Sayfa
            </button>
            <button onClick={() => scrollToSection('about')} className="text-purple-700 hover:text-purple-900 font-medium">
              Hakkımızda
            </button>
            <button onClick={() => scrollToSection('services')} className="text-purple-700 hover:text-purple-900 font-medium">
              Hizmetler
            </button>
            <button onClick={() => scrollToSection('team')} className="text-purple-700 hover:text-purple-900 font-medium">
              Ekip
            </button>
            <button onClick={goToBlog} className="text-purple-700 hover:text-purple-900 font-medium">
              Bloglar
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-purple-700 hover:text-purple-900 font-medium">
              İletişim
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-purple-700 hover:text-purple-900">
              <ShoppingCart size={24} />
            </button>
            {user ? (
              <Link to="/alanim" className="text-purple-700 hover:text-purple-900 flex items-center justify-center w-10 h-10 rounded-full hover:bg-purple-50 transition-colors" title="Alanım">
                <User size={24} />
              </Link>
            ) : (
              <Link to="/auth" className="btn btn-outline text-sm py-1.5 px-3 rounded-full hover:bg-purple-50 flex items-center gap-2">
                <User size={16} />
                <span>Giriş / Üye Ol</span>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-purple-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
            <button onClick={() => scrollToSection('hero')} className="block text-purple-700 hover:text-purple-900 font-medium">
              Ana Sayfa
            </button>
            <button onClick={() => scrollToSection('about')} className="block text-purple-700 hover:text-purple-900 font-medium">
              Hakkımızda
            </button>
            <button onClick={() => scrollToSection('services')} className="block text-purple-700 hover:text-purple-900 font-medium">
              Hizmetler
            </button>
            <button onClick={() => scrollToSection('team')} className="block text-purple-700 hover:text-purple-900 font-medium">
              Ekip
            </button>
            <button onClick={goToBlog} className="block text-purple-700 hover:text-purple-900 font-medium">
              Bloglar
            </button>
            <button onClick={() => scrollToSection('contact')} className="block text-purple-700 hover:text-purple-900 font-medium">
              İletişim
            </button>

            {user ? (
              <Link to="/alanim" onClick={() => setIsMenuOpen(false)} className="btn btn-outline mt-4 w-full text-center block bg-purple-50 text-purple-700">
                Alanım (Profil)
              </Link>
            ) : (
              <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="btn btn-outline mt-4 w-full text-center block">
                Giriş Yap / Üye Ol
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}