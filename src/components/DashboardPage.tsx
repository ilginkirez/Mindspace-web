import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, BookOpen, Heart, Settings, LogOut, ChevronRight, User as UserIcon, Smile, Meh, Frown } from 'lucide-react';

// Types
interface HelperFlags {
    is_past: boolean;
    can_cancel: boolean;
    can_feedback: boolean;
}

interface Appointment {
    id: string;
    datetime: string;
    type: 'ONLINE' | 'IN_PERSON';
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
    expert: {
        expert_profile: {
            full_name: string;
            title: string;
        };
        email: string;
    };
    is_past: boolean;
    can_cancel: boolean;
    can_feedback: boolean;
}

interface SavedPost {
    id: string; // SavedPost ID
    post: {
        id: string;
        title: string;
        category: string;
        author: {
            expert_profile?: {
                full_name: string;
            }
        }
    }
}

interface UserData {
    id: string;
    email: string;
    role: string;
    full_name?: string;
    expert_profile?: { full_name: string };
}

const BACKEND_URL = 'http://localhost:5000';

export function DashboardPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'saved' | 'history'>('saved');

    // Fetch data
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth');
            return;
        }

        const fetchData = async () => {
            try {
                const headers = { 'Authorization': `Bearer ${token}` };

                // 1. Get User
                // We use localStorage user for speed, but could refresh from /auth/me
                const storedUser = localStorage.getItem('user');
                if (storedUser) setUser(JSON.parse(storedUser));

                // 2. Get Appointments
                const apptRes = await fetch(`${BACKEND_URL}/me/appointments`, { headers });
                const apptData = await apptRes.json();
                if (apptData.success) setAppointments(apptData.data.appointments);

                // 3. Get Saved Posts
                const savedRes = await fetch(`${BACKEND_URL}/me/saved-posts`, { headers });
                const savedData = await savedRes.json();
                if (savedData.success) setSavedPosts(savedData.data.saved_posts);

            } catch (err) {
                console.error("Dashboard loaded error", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload(); // Force header update
    };

    if (loading) return <div className="min-h-screen bg-transparent flex items-center justify-center text-purple-600">Yükleniyor...</div>;

    // Derived State
    const upcomingAppointment = appointments.find(a => !a.is_past && a.status === 'SCHEDULED');
    const waitingFeedback = appointments.find(a => a.can_feedback);
    const assignedExpert = upcomingAppointment?.expert || appointments[0]?.expert; // Simple logic: latest expert is "yours"

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* 1. Welcome Section */}
                <header className="mb-16 animate-fadeIn text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold text-purple-900 mb-3 tracking-tight">
                        Hoş geldin, {user?.full_name || user?.email.split('@')[0]}
                    </h1>
                    <p className="text-xl text-purple-800/70 font-light">
                        Burası sana ait. Burada acele yok.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN (Main Content) */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* 2. My Sessions */}
                        <section className="animate-slideUp">
                            <h2 className="text-2xl font-semibold text-purple-900 mb-6 flex items-center">
                                Seanslarım
                            </h2>

                            {upcomingAppointment ? (
                                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 transition-all hover:shadow-md border border-purple-100 shadow-sm">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-purple-50 p-3 rounded-2xl text-purple-600">
                                                <Calendar size={24} />
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold text-purple-900">
                                                    {new Date(upcomingAppointment.datetime).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' })}
                                                </div>
                                                <div className="flex items-center text-purple-800/60 mt-1 gap-3">
                                                    <span className="flex items-center gap-1"><Clock size={16} /> {new Date(upcomingAppointment.datetime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    <span className="w-1 h-1 bg-purple-200 rounded-full"></span>
                                                    <span className="flex items-center gap-1"><MapPin size={16} /> {upcomingAppointment.type === 'ONLINE' ? 'Online Görüşme' : 'Yüz Yüze'}</span>
                                                </div>
                                                <div className="mt-2 text-purple-700 font-medium">
                                                    {upcomingAppointment.expert.expert_profile?.full_name} ile
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button className="bg-purple-600 text-white font-medium py-2 px-6 rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
                                                Detayları gör
                                            </button>
                                            {upcomingAppointment.can_cancel && (
                                                <button className="text-sm text-purple-400 hover:text-red-400 py-1 transition-colors">
                                                    İptal et
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center border border-purple-50">
                                    <p className="text-purple-800/60 mb-4">Henüz planlanmış bir seansın yok.</p>
                                    <Link to="/service/bireysel" className="text-purple-600 font-medium hover:text-purple-700 inline-flex items-center hover:underline">
                                        Destek seçeneklerini incele <ChevronRight size={16} />
                                    </Link>
                                </div>
                            )}

                            {/* 6. Gentle Feedback (Contextual) */}
                            {waitingFeedback && (
                                <div className="mt-6 bg-white border border-purple-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn shadow-sm">
                                    <div>
                                        <p className="text-purple-900 font-medium">Son görüşme senin için nasıldı?</p>
                                        <p className="text-sm text-purple-500/60">{new Date(waitingFeedback.datetime).toLocaleDateString('tr-TR')} tarihli seans</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-green-50 rounded-xl text-gray-400 hover:text-green-600 transition-colors" title="İyi hissettirdi"><Smile size={24} /></button>
                                        <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 transition-colors" title="Nötr"><Meh size={24} /></button>
                                        <button className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-colors" title="Zorlayıcıydı"><Frown size={24} /></button>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* 4. Saved Content */}
                        <section className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-purple-900">Kaydettiklerim</h2>
                                <div className="flex bg-white/50 backdrop-blur-sm rounded-lg p-1 border border-purple-100">
                                    <button
                                        onClick={() => setActiveTab('saved')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'saved' ? 'bg-purple-100 text-purple-900 shadow-sm' : 'text-purple-600/70 hover:text-purple-800'}`}
                                    >
                                        Kaydedilenler
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('history')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-purple-100 text-purple-900 shadow-sm' : 'text-purple-600/70 hover:text-purple-800'}`}
                                    >
                                        Geçmiş
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {savedPosts.length > 0 ? (
                                    savedPosts.map((item) => (
                                        <div key={item.id} className="group flex items-start justify-between p-4 rounded-2xl bg-white hover:bg-purple-50/50 transition-colors border border-purple-50 hover:border-purple-100 shadow-sm">
                                            <div className="flex gap-4">
                                                <div className="bg-purple-100 text-purple-600 p-3 rounded-xl h-fit">
                                                    <BookOpen size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium text-purple-900 group-hover:text-purple-700 transition-colors">
                                                        {item.post.title}
                                                    </h3>
                                                    <div className="flex gap-2 text-sm text-purple-600/60 mt-1">
                                                        <span className="bg-purple-50 px-2 py-0.5 rounded text-xs uppercase tracking-wider">{item.post.category}</span>
                                                        <span>• {item.post.author.expert_profile?.full_name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="text-purple-300 hover:text-purple-600 p-2" title="Oku">
                                                    <ChevronRight size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-purple-400/50 font-light italic bg-white/50 rounded-3xl border border-dashed border-purple-100">
                                        Henüz kaydettiğin bir içerik yok.
                                    </div>
                                )}
                            </div>
                        </section>

                    </div>


                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="space-y-12">

                        {/* 3. My Psychologist */}
                        {assignedExpert && (
                            <section className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
                                <h2 className="text-xl font-semibold text-purple-900 mb-6">Psikologum</h2>
                                <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-purple-50">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl font-bold">
                                            {assignedExpert.expert_profile?.full_name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{assignedExpert.expert_profile?.full_name}</div>
                                            <div className="text-sm text-purple-600">{assignedExpert.expert_profile?.title}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">Bu uzmanla çalışıyorsun.</p>
                                    <button className="w-full py-2.5 rounded-xl border border-purple-200 text-purple-700 text-sm font-medium hover:bg-purple-50 transition-colors">
                                        Mesaj Gönder
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* 7. Settings (Visual Only) */}
                        <section className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
                            <h2 className="text-xl font-semibold text-purple-900 mb-6">Ayarlar</h2>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-purple-50 transition-colors text-left group border border-transparent hover:border-purple-100 shadow-sm">
                                    <span className="flex items-center gap-3 text-purple-900/80 group-hover:text-purple-900">
                                        <UserIcon size={18} className="text-purple-400 group-hover:text-purple-600" /> Kişisel Bilgiler
                                    </span>
                                    <ChevronRight size={16} className="text-purple-200 group-hover:text-purple-400" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-purple-50 transition-colors text-left group border border-transparent hover:border-purple-100 shadow-sm">
                                    <span className="flex items-center gap-3 text-purple-900/80 group-hover:text-purple-900">
                                        <Settings size={18} className="text-purple-400 group-hover:text-purple-600" /> Güvenlik
                                    </span>
                                    <ChevronRight size={16} className="text-purple-200 group-hover:text-purple-400" />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-red-50 transition-colors text-left group text-red-400 hover:text-red-500 border border-transparent hover:border-red-100 shadow-sm"
                                >
                                    <span className="flex items-center gap-3">
                                        <LogOut size={18} /> Çıkış Yap
                                    </span>
                                </button>
                            </div>
                        </section>

                    </div>

                </div>
            </div>
        </div>
    );
}
