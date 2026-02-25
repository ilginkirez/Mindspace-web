import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

const content: Record<string, { title: string; body: ReactNode }> = {
    gizlilik: {
        title: 'Gizlilik Politikası',
        body: (
            <div className="space-y-6 text-purple-800/80 leading-relaxed">
                <p>Bu Gizlilik Politikası, Mindspace platformunun kullanıcı verilerini nasıl topladığını, kullandığını ve koruduğunu açıklar.</p>
                <h2 className="text-xl font-semibold text-purple-900">1. Toplanan Veriler</h2>
                <p>Ad, e-posta adresi, randevu bilgileri ve platform kullanım verileri toplanabilir.</p>
                <h2 className="text-xl font-semibold text-purple-900">2. Verilerin Kullanımı</h2>
                <p>Toplanan veriler yalnızca hizmet sunumu, kullanıcı iletişimi ve platform iyileştirmeleri amacıyla kullanılır. Üçüncü taraflarla paylaşılmaz.</p>
                <h2 className="text-xl font-semibold text-purple-900">3. Veri Güvenliği</h2>
                <p>Verileriniz endüstri standardı şifreleme yöntemleriyle korunur.</p>
                <h2 className="text-xl font-semibold text-purple-900">4. İletişim</h2>
                <p>Gizlilik ile ilgili sorularınız için info@mindspace.com adresine ulaşabilirsiniz.</p>
            </div>
        ),
    },
    kullanim: {
        title: 'Kullanım Koşulları',
        body: (
            <div className="space-y-6 text-purple-800/80 leading-relaxed">
                <p>Mindspace platformunu kullanarak bu kullanım koşullarını kabul etmiş sayılırsınız.</p>
                <h2 className="text-xl font-semibold text-purple-900">1. Hizmet Kapsamı</h2>
                <p>Mindspace, ruh sağlığı desteği ve psikolojik danışmanlık hizmetleri sunan bir platformdur.</p>
                <h2 className="text-xl font-semibold text-purple-900">2. Kullanıcı Sorumlulukları</h2>
                <p>Kullanıcılar doğru bilgi vermekle ve platformu yasalara uygun biçimde kullanmakla yükümlüdür.</p>
                <h2 className="text-xl font-semibold text-purple-900">3. Yasak İçerikler</h2>
                <p>Hakaret, yanıltma veya başkalarına zarar verecek nitelikte içerik paylaşmak yasaktır.</p>
                <h2 className="text-xl font-semibold text-purple-900">4. Değişiklikler</h2>
                <p>Mindspace, bu koşulları önceden bildirmeksizin değiştirme hakkını saklı tutar.</p>
            </div>
        ),
    },
    kvkk: {
        title: 'KVKK Aydınlatma Metni',
        body: (
            <div className="space-y-6 text-purple-800/80 leading-relaxed">
                <p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinize ilişkin haklarınız aşağıda açıklanmıştır.</p>
                <h2 className="text-xl font-semibold text-purple-900">1. Veri Sorumlusu</h2>
                <p>Mindspace, kişisel verilerinizin işlenmesinden sorumlu veri sorumlusudur.</p>
                <h2 className="text-xl font-semibold text-purple-900">2. İşleme Amaçları</h2>
                <p>Kişisel verileriniz; randevu yönetimi, kimlik doğrulama ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenir.</p>
                <h2 className="text-xl font-semibold text-purple-900">3. Haklarınız</h2>
                <p>KVKK'nın 11. maddesi kapsamında; verilerinize erişim, düzeltme, silme ve işlemeye itiraz haklarına sahipsiniz.</p>
                <h2 className="text-xl font-semibold text-purple-900">4. Başvuru</h2>
                <p>Taleplerinizi kvkk@mindspace.com adresine iletebilirsiniz.</p>
            </div>
        ),
    },
    cerez: {
        title: 'Çerez Politikası',
        body: (
            <div className="space-y-6 text-purple-800/80 leading-relaxed">
                <p>Mindspace, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır.</p>
                <h2 className="text-xl font-semibold text-purple-900">1. Zorunlu Çerezler</h2>
                <p>Oturum yönetimi için gerekli olan çerezlerdir. Kapatılamaz.</p>
                <h2 className="text-xl font-semibold text-purple-900">2. Analitik Çerezler</h2>
                <p>Platform kullanımını anlamamıza yardımcı olur. Tercihlerinize göre kapatabilirsiniz.</p>
                <h2 className="text-xl font-semibold text-purple-900">3. Çerezleri Yönetme</h2>
                <p>Tarayıcı ayarlarınızdan çerezleri istediğiniz zaman silebilir veya devre dışı bırakabilirsiniz.</p>
            </div>
        ),
    },
};

export function LegalPage() {
    const { slug } = useParams<{ slug: string }>();
    const page = content[slug || ''];

    if (!page) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-purple-400">
                <p className="text-2xl mb-6">Sayfa bulunamadı.</p>
                <Link to="/" className="text-purple-600 hover:underline flex items-center gap-2">
                    <ArrowLeft size={18} /> Ana sayfaya dön
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-2xl">
                <Link to="/" className="flex items-center gap-2 text-purple-500 hover:text-purple-700 mb-10 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Ana sayfaya dön
                </Link>
                <h1 className="text-3xl font-bold text-purple-900 mb-10">{page.title}</h1>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-purple-50">
                    {page.body}
                </div>
                <p className="text-center text-sm text-purple-400 mt-8">Son güncelleme: Şubat 2026</p>
            </div>
        </div>
    );
}
