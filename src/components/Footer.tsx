import { Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-purple-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Mindspace</h3>
            <p className="text-purple-200 mb-4">
              Zihinsel sağlığınızı güçlendirmek ve hayat kalitenizi artırmak için yanınızdayız.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 text-purple-200">
              <li><a href="#hero" className="hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Hakkımızda</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Hizmetler</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Ekip</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Hizmetler</h4>
            <ul className="space-y-2 text-purple-200">
              <li><a href="#services" className="hover:text-white transition-colors">Bireysel Terapi</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Çift Terapisi</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Stres Yönetimi</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Mindfulness</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Online Eğitimler</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Yasal</h4>
            <ul className="space-y-2 text-purple-200">
              <li><a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kullanım Koşulları</a></li>
              <li><a href="#" className="hover:text-white transition-colors">KVKK</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Çerez Politikası</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">İletişim</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700 pt-8 text-center text-purple-200">
          <p>&copy; {currentYear} Mindspace. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}