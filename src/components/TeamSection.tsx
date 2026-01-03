import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EbruImage from '../assets/Ebru Çetin.png';
import ErdemImage from '../assets/Erdem Keskin.png';
import NidaImage from '../assets/Nida Emre.png';

export function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const team = [
    {
      name: 'Ebru Çetin',
      title: 'Psikolog',
      description: 'Lisans eğitimini Orta Doğu Teknik Üniversitesi\'nde tamamladıktan sonra Yeditepe Üniversitesi Klinik Psikoloji yüksek lisans mezunu olmuştur.',
      image: EbruImage,
    },
    {
      name: 'Erdem Keskin',
      title: 'Psikolog',
      description: 'Boğaziçi Üniversitesi Psikoloji lisansından 2020 yılında mezun olmuştur. Beykoz Üniversitesi Klinik Psikoloji yüksek lisans programından mezun olmuştur.',
      image: ErdemImage,
    },
    {
      name: 'Nida Emre',
      title: 'Psikolog',
      description: 'İstanbul Bilgi Üniversitesi\'nden Fizyoterapi ve Rehabilitasyon ile Psikoloji bölümlerinden çift anadal yaparak mezun oldu.',
      image: NidaImage,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % team.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + team.length) % team.length);
  };

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-800 mb-4">Ekibimiz</h2>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto">
            Alanında uzman psikolog ve terapistlerimizle tanışın.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card border-4 border-purple-400 hover:border-purple-500 transition-all">
                <div className="text-center mb-6">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">{member.name}</h3>
                  <p className="text-purple-500 font-medium">{member.title}</p>
                </div>
                <p className="text-purple-700 mb-6">{member.description}</p>
                <div className="text-center mt-auto">
                  <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors flex items-center justify-center mx-auto text-sm group-hover:translate-x-1 duration-300">
                    Yaklaşımını incele <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:hidden relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {team.map((member, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="card border-4 border-purple-400">
                      <div className="text-center mb-6">
                        <div className="mb-4 flex justify-center">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-purple-800 mb-2">{member.name}</h3>
                        <p className="text-purple-500 font-medium">{member.title}</p>
                      </div>
                      <p className="text-purple-700 mb-6">{member.description}</p>
                      <div className="text-center mt-auto">
                        <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors flex items-center justify-center mx-auto text-sm">
                          Yaklaşımını incele <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-purple-700 hover:bg-purple-800 text-white rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-purple-700 hover:bg-purple-800 text-white rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex justify-center space-x-2 mt-8">
              {team.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-purple-700 w-8' : 'bg-purple-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}