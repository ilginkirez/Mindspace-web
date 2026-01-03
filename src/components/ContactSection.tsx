import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-800 mb-4">İletişim</h2>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto">
            Sorularınız mı var? Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="card border-2 border-purple-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label">Ad Soyad</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label className="label">E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className="label">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  placeholder="0555 555 55 55"
                />
              </div>

              <div>
                <label className="label">Mesajınız</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="textarea"
                  placeholder="Size nasıl yardımcı olabiliriz?"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Mesaj Gönder
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-purple-800 mb-6">İletişim Bilgileri</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-purple-700" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-800 mb-1">Telefon</p>
                    <p className="text-purple-600">+90 (212) 555 0123</p>
                    <p className="text-purple-600">+90 (212) 555 0124</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-purple-700" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-800 mb-1">E-posta</p>
                    <p className="text-purple-600">info@mindspace.com.tr</p>
                    <p className="text-purple-600">destek@mindspace.com.tr</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-purple-700" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-800 mb-1">Adres</p>
                    <p className="text-purple-600">
                      Nispetiye Cad. No: 45/3<br />
                      Levent, Beşiktaş<br />
                      İstanbul, Türkiye
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-xl">
              <h4 className="text-xl font-semibold text-purple-800 mb-4">Çalışma Saatlerimiz</h4>
              <div className="space-y-2 text-purple-700">
                <p>Pazartesi - Cuma: 09:00 - 20:00</p>
                <p>Cumartesi: 10:00 - 18:00</p>
                <p>Pazar: Kapalı</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}