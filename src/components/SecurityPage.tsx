import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';

const BACKEND_URL = 'http://localhost:3000';

export function SecurityPage() {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (newPassword !== confirmPassword) {
            setError('Yeni şifreler eşleşmiyor.');
            return;
        }
        if (newPassword.length < 6) {
            setError('Yeni şifre en az 6 karakter olmalı.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) { navigate('/auth'); return; }

        setSaving(true);
        try {
            const res = await fetch(`${BACKEND_URL}/me/change-password`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => setSuccess(false), 4000);
            } else {
                setError(data.error || 'Şifre değiştirilemedi.');
            }
        } catch {
            setError('Sunucuya bağlanılamadı.');
        } finally {
            setSaving(false);
        }
    };

    const PasswordInput = ({
        value, onChange, show, onToggle, placeholder
    }: {
        value: string; onChange: (v: string) => void;
        show: boolean; onToggle: () => void; placeholder: string;
    }) => (
        <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />
            <input
                type={show ? 'text' : 'password'}
                value={value}
                onChange={e => onChange(e.target.value)}
                required
                className="w-full pl-11 pr-12 py-3 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 text-purple-900 bg-purple-50/30"
                placeholder={placeholder}
            />
            <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-500">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
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

                <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck size={28} className="text-purple-600" />
                    <h1 className="text-3xl font-bold text-purple-900">Güvenlik</h1>
                </div>
                <p className="text-purple-600/60 mb-10">Şifreni buradan değiştirebilirsin.</p>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-purple-50 space-y-6">
                    {/* Mevcut şifre */}
                    <div>
                        <label className="block text-sm font-medium text-purple-800 mb-2">Mevcut Şifre</label>
                        <PasswordInput
                            value={currentPassword}
                            onChange={setCurrentPassword}
                            show={showCurrent}
                            onToggle={() => setShowCurrent(p => !p)}
                            placeholder="Mevcut şifren"
                        />
                    </div>

                    <div className="border-t border-purple-50" />

                    {/* Yeni şifre */}
                    <div>
                        <label className="block text-sm font-medium text-purple-800 mb-2">Yeni Şifre</label>
                        <PasswordInput
                            value={newPassword}
                            onChange={setNewPassword}
                            show={showNew}
                            onToggle={() => setShowNew(p => !p)}
                            placeholder="En az 6 karakter"
                        />
                    </div>

                    {/* Yeni şifre tekrar */}
                    <div>
                        <label className="block text-sm font-medium text-purple-800 mb-2">Yeni Şifre (tekrar)</label>
                        <PasswordInput
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            show={showNew}
                            onToggle={() => setShowNew(p => !p)}
                            placeholder="Yeni şifreni tekrar gir"
                        />
                    </div>

                    {/* Şifre gücü göstergesi */}
                    {newPassword.length > 0 && (
                        <div className="space-y-1">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${newPassword.length >= i * 3
                                            ? i <= 1 ? 'bg-red-400'
                                                : i <= 2 ? 'bg-yellow-400'
                                                    : i <= 3 ? 'bg-blue-400'
                                                        : 'bg-green-400'
                                            : 'bg-purple-100'
                                        }`} />
                                ))}
                            </div>
                            <p className="text-xs text-purple-400">
                                {newPassword.length < 6 ? 'Çok kısa' : newPassword.length < 9 ? 'Orta' : newPassword.length < 12 ? 'İyi' : 'Çok güçlü'}
                            </p>
                        </div>
                    )}

                    {/* Hata & Başarı */}
                    {error && <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2">{error}</p>}
                    {success && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-2">
                            <CheckCircle size={18} />
                            <span className="text-sm">Şifren başarıyla değiştirildi!</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-purple-200"
                    >
                        <Lock size={18} />
                        {saving ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
                    </button>
                </form>
            </div>
        </div>
    );
}
