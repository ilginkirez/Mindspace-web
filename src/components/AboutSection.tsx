import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function AboutSection() {
  const navigate = useNavigate();
  const features = [
    'Uzman psikolog kadromuz',
    'Gizlilik ve güvenlik garantisi',
    'Esnek randevu saatleri',
    'Online ve yüz yüze seçenekler',
    'Kanıtlanmış terapi yöntemleri',
    '7/24 destek hizmeti',
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-purple-800 mb-6">Hakkımızda</h2>
            <p className="text-lg text-purple-700 mb-6">
              Mindspace olarak, zihinsel sağlığınızı ön planda tutarak, size özel terapi ve koçluk hizmetleri sunuyoruz.
              Uzman ekibimizle, hayatınızın her alanında daha mutlu ve daha sağlıklı olmanız için yanınızdayız.
            </p>
            <p className="text-lg text-purple-700 mb-8">
              Modern psikolojinin en etkili yöntemlerini kullanarak, kişisel gelişiminize katkıda bulunuyoruz.
              Hedefimiz, herkesin zihinsel sağlığına kolayca ulaşabilmesini sağlamaktır.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-purple-600 flex-shrink-0" size={20} />
                  <span className="text-purple-700">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/blog')}
              className="btn btn-outline text-lg px-8 py-3 hover:bg-purple-100 transition-colors"
            >
              Yaklaşımımızı yazılarımızdan tanıyın
            </button>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-purple-200">
              <img
                src="/src/assets/mind.png"
                alt="Mindspace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-purple-700 text-white p-8 rounded-xl shadow-xl max-w-xs">
              <p className="font-semibold mb-2">10+ yıllık tecrübe</p>
              <p className="text-purple-200">5000+ mutlu danışan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}