import { Twitter, Facebook, Instagram, Shield, CheckCircle } from 'lucide-react';

import spaceImage from '../assets/space.png';

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left">
            <h1 className="hero-title mb-6">
              Kendini Keşfetme Zamanı
            </h1>
            <p className="text-xl md:text-2xl text-purple-700 mb-8 fade-up-delay-200 font-light">
              Güçlü Bir Zihin, Sağlıklı Bir Hayat!
            </p>
            <button
              onClick={scrollToContact}
              className="btn btn-primary text-lg px-8 py-4 fade-up-delay-300"
            >
              Kendin için ilk adımı at
            </button>

            {/* Trust Badges */}
            <div className="mt-8 flex items-center justify-center md:justify-start space-x-6 text-sm text-purple-600/80 fade-up-delay-300">
              <div className="flex items-center">
                <Shield size={16} className="mr-2" />
                <span>Gizliliğiniz bizim için önemli</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="mr-2" />
                <span>Alanında uzman içerikler</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block fade-up-delay-300">
            <img
              src={spaceImage}
              alt="Mindspace Illustration"
              className="w-full h-auto object-contain hero-image animate-float"
            />
          </div>
        </div>
      </div>

      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col space-y-4">
        <a href="#" className="w-12 h-12 bg-white/60 hover:bg-white rounded-full flex items-center justify-center text-purple-700 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-sm backdrop-blur-sm">
          <Twitter size={20} />
        </a>
        <a href="#" className="w-12 h-12 bg-white/60 hover:bg-white rounded-full flex items-center justify-center text-purple-700 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-sm backdrop-blur-sm">
          <Facebook size={20} />
        </a>
        <a href="#" className="w-12 h-12 bg-white/60 hover:bg-white rounded-full flex items-center justify-center text-purple-700 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-sm backdrop-blur-sm">
          <Instagram size={20} />
        </a>
      </div>
    </section>
  );
}