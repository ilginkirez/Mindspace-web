import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Save, ArrowLeft, CheckCircle } from 'lucide-react';

const BACKEND_URL = 'http://localhost:3000';

export function ProfileSettingsPage() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/auth'); return; }

        fetch(`${BACKEND_URL}/me/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    setFullName(data.data.user.full_name || '');
                    setEmail(data.data.user.email || '');
                }
            })
            .catch(() => setError('Profil yüklenemedi.'))
            .finally(() => setLoading(false));
    }, [navigate]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess(false);

        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${BACKEND_URL}/me/profile`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ full_name: fullName, email }),
            });
            const data = await res.json();
            if (data.success) {
                // Güncellenen kullanıcıyı localStorage'a da yaz
                const stored = JSON.parse(localStorage.getItem('user') || '{}');
                localStorage.setItem('user', JSON.stringify({ ...stored, full_name: fullName, email }));
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError(data.error || 'Güncelleme başarısız.');
            }
        } catch {
            setError('Sunucuya bağlanılamadı.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-purple-600">Yükleniyor...</div>
    );

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-lg">
                {/* Geri butonu */}
                <button
                    onClick={() => navigate('/alanim')}
                    className="flex items-center gap-2 text-purple-500 hover:text-purple-700 mb-10 transition-colors group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Panele dön
                </button>

                <h1 className="text-3xl font-bold text-purple-900 mb-2">Kişisel Bilgiler</h1>
                <p className="text-purple-600/60 mb-10">Adın ve e-posta adresin burada güncellenir.</p>

                <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 shadow-sm border border-purple-50 space-y-6">
                    {/* Ad Soyad */}
                    <div>
                        <label className="block text-sm font-medium text-purple-800 mb-2">Ad Soyad</label>
                        <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />
                            <input
                                type="text"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 text-purple-900 bg-purple-50/30"
                                placeholder="Adın Soyadın"
                            />
                        </div>
                    </div>

                    {/* E-posta */}
                    <div>
                        <label className="block text-sm font-medium text-purple-800 mb-2">E-posta</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 text-purple-900 bg-purple-50/30"
                                placeholder="ornek@mail.com"
                            />
                        </div>
                    </div>

                    {/* Hata & Başarı */}
                    {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2">{error}</p>}
                    {success && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-2">
                            <CheckCircle size={18} />
                            <span className="text-sm">Bilgilerin başarıyla güncellendi!</span>
                        </div>
                    )}

                    {/* Kaydet */}
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-purple-200"
                    >
                        <Save size={18} />
                        {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                </form>
            </div>
        </div>
    );
}
