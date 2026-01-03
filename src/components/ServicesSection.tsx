import { useNavigate } from 'react-router-dom';
import { Brain, Heart, Users, Sparkles, BookOpen, Smile, ArrowRight, HelpCircle } from 'lucide-react';

export function ServicesSection() {
  const navigate = useNavigate();

  const primaryServices = [
    {
      icon: Brain,
      title: 'Bireysel Terapi',
      description: 'Kişisel gelişim ve zihinsel sağlık için profesyonel terapi seansları.',
      ctaText: 'Bu destek kimler için uygun?'
    },
    {
      icon: Heart,
      title: 'Stres Yönetimi',
      description: 'Günlük hayatın stresini yönetmek için etkili teknikler ve stratejiler.',
      ctaText: 'Günlük hayatta nasıl işe yarar?'
    },
    {
      icon: Users,
      title: 'Çift Terapisi',
      description: 'İlişkinizi güçlendirmek için uzman rehberliğinde terapi programları.',
      ctaText: 'İlişkilerde nasıl yardımcı olur?'
    }
  ];

  const secondaryServices = [
    {
      icon: Sparkles,
      title: 'Mindfulness',
      description: 'Farkındalık ve meditasyon ile zihinsel dinginliğe ulaşın.',
      ctaText: 'Nasıl dinginleşebilirim?'
    },
    {
      icon: BookOpen,
      title: 'Online Eğitimler',
      description: 'Kendi hızınızda ilerleyebileceğiniz kapsamlı online eğitim programları.',
      ctaText: 'Hangi eğitimler var?'
    },
    {
      icon: Smile,
      title: 'Mutluluk Koçluğu',
      description: 'Yaşam kalitenizi artırmak için pozitif psikoloji odaklı koçluk.',
      ctaText: 'Nasıl daha mutlu olurum?'
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">Hizmetlerimiz</h2>
          <p className="text-lg text-purple-600/80 max-w-2xl mx-auto font-light leading-relaxed">
            Size en uygun destek programını bulun ve zihinsel sağlığınızı güçlendirin.
          </p>
        </div>

        {/* Primary Services Group */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10 ml-2">
            <div className="h-8 w-1 bg-purple-400 rounded-full"></div>
            <h3 className="text-2xl font-bold text-purple-900">En çok tercih edilenler</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {primaryServices.map((service, index) => (
              <div
                key={index}
                onClick={() => {
                  const types = ['individual', 'stress', 'couples'];
                  navigate(`/service/${types[index]}`);
                }}
                className="card bg-purple-50/50 p-10 rounded-[2rem] border border-transparent hover:border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-purple-700" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4">{service.title}</h3>
                <p className="text-purple-600/90 mb-8 leading-relaxed font-light text-lg">
                  {service.description}
                </p>
                <div className="mt-auto pt-6 border-t border-purple-100">
                  <span className="text-purple-700 font-medium group-hover:text-purple-900 flex items-center transition-colors">
                    {service.ctaText} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Services Group */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10 ml-2">
            <div className="h-8 w-1 bg-purple-200 rounded-full"></div>
            <h3 className="text-2xl font-bold text-purple-800/80">Diğer destekler</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {secondaryServices.map((service, index) => (
              <div
                key={index}
                onClick={() => {
                  const types = ['mindfulness', 'online-education', 'happiness-coaching'];
                  navigate(`/service/${types[index]}`);
                }}
                className="card bg-white p-8 rounded-3xl border border-gray-100 hover:border-purple-100 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors">
                  <service.icon className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">{service.title}</h3>
                <p className="text-purple-600/70 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <span className="text-purple-500 text-sm font-medium group-hover:text-purple-700 flex items-center transition-colors">
                    {service.ctaText} <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-white rounded-3xl p-8 md:p-12 border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HelpCircle className="text-purple-700" size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-purple-900 mb-2">Emin olamıyor musun?</h4>
                <p className="text-purple-600/80">Seni en doğru uzmana ve yönteme yönlendirelim.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button onClick={() => navigate('/quiz')} className="btn btn-primary px-6 py-3 text-sm whitespace-nowrap">
                Bana uygun desteği bul
              </button>
              <button onClick={() => navigate('/blog')} className="btn bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 px-6 py-3 text-sm whitespace-nowrap">
                Önce yazıları okumak istiyorum
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}