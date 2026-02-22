import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, AlertCircle, ArrowRight } from 'lucide-react';

type AuthMode = 'login' | 'signup';

const BACKEND_URL = 'http://localhost:5000'; // Make sure this matches your backend

export function AuthPage() {
    const [mode, setMode] = useState<AuthMode>('signup');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (mode === 'signup') {
                if (password !== confirmPassword) {
                    setError('Şifreler eşleşmiyor.');
                    setIsLoading(false);
                    return;
                }

                const res = await fetch(`${BACKEND_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, full_name: fullName }),
                });

                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.error?.message || 'Kayıt sırasında bir hata oluştu.');
                }

                // Auto login after register (optional, or just save token)
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                navigate('/alanim'); // Redirect to dashboard

            } else {
                // Login Logic
                const res = await fetch(`${BACKEND_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();
                if (!data.success) {
                    throw new Error(data.error?.message || 'Giriş yapılamadı.');
                }

                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                navigate('/'); // Redirect to home or dashboard
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Bir şeyler ters gitti.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4 py-12">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px]">
                {/* Left Side: Form */}
                <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                    <div className="max-w-md mx-auto w-full">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kendin için bir alan</h1>
                        <p className="text-gray-600 mb-8">
                            Okuduklarını kaydedebileceğin, randevularını takip edebileceğin ve sana ait bir alan.
                        </p>

                        {/* Toggle */}
                        <div className="flex bg-purple-50 p-1 rounded-xl mb-8">
                            <button
                                onClick={() => setMode('signup')}
                                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${mode === 'signup'
                                    ? 'bg-white text-purple-700 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Alan oluştur
                            </button>
                            <button
                                onClick={() => setMode('login')}
                                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${mode === 'login'
                                    ? 'bg-white text-purple-700 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Giriş yap
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm flex items-center animate-fadeIn">
                                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'signup' && (
                                <div className="animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Adın Soyadın"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all outline-none"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="isim@ornek.com"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="En az 6 karakter"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {mode === 'signup' && (
                                <div className="animate-fadeIn">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Şifre Tekrarı</label>
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Şifreni onayla"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all outline-none"
                                    />
                                </div>
                            )}

                            {mode === 'login' && (
                                <div className="flex justify-end">
                                    <button type="button" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                                        Şifremi unuttum
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-purple-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : mode === 'signup' ? (
                                    'Kendime alan aç'
                                ) : (
                                    'Alanıma gir'
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center pt-8 border-t border-gray-100">
                            <p className="text-gray-500 mb-2 text-sm">Üye olmadan devam etmek ister misin?</p>
                            <Link to="/blog" className="inline-flex items-center text-purple-600 font-medium hover:underline">
                                Yazıları okumaya devam et <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>

                        {mode === 'signup' && (
                            <p className="text-xs text-gray-400 text-center mt-4">
                                Bilgilerin sadece senin alanın için kullanılır. İstediğin zaman ayrılabilirsin.
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Side: Visual */}
                <div className="relative bg-purple-600 hidden md:flex items-center justify-center p-12 overflow-hidden order-1 md:order-2">
                    {/* Abstract Shapes Background */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 animate-blob" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2 animate-blob animation-delay-2000" />
                    <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000" />

                    <div className="relative z-10 text-center text-white max-w-sm">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-inner">
                            <Check className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Zihnini Özgür Bırak</h3>
                        <p className="text-purple-100 leading-relaxed">
                            Binlerce kişi Mindspace ile kendine daha iyi bakıyor. Sen de aramıza katıl.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
