import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface BlogArticle {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    imageUrl: string;
    date: string;
}

const categories = ['hepsi', 'anksiyete', 'stres', 'ilişkiler', 'bilinçli farkındalık', 'kendini keşif'];

const featuredArticle: BlogArticle = {
    id: 'featured',
    title: 'Şimdiki Anda Huzuru Bulmak',
    excerpt: 'Hayat bunaltıcı hissettirdiğinde kendinizi topraklamak için nazik pratikleri keşfedin. Bilinçli farkındalığın (mindfulness) günlük rutininizde nasıl sakinlik ve netlik alanı yaratabileceğini öğrenin.',
    category: 'bilinçli farkındalık',
    readTime: '6 dk okuma',
    imageUrl: 'https://images.unsplash.com/photo-1764192114257-ae9ecf97eb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzY3NDE4NTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2 Ocak 2026'
};

const blogArticles: BlogArticle[] = [
    {
        id: '1',
        title: 'Duygusal Kalıplarınızı Anlamak',
        excerpt: 'Tekrarlayan duyguları tanımanın, kendinizi ve ihtiyaçlarınızı daha iyi anlamanıza nasıl yardımcı olabileceğini keşfedin.',
        category: 'kendini keşif',
        readTime: '5 dk okuma',
        imageUrl: 'https://images.unsplash.com/photo-1569230919100-d3fd5e1132f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmV8ZW58MXx8fHwxNzY3NDQzMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        date: '30 Aralık 2025'
    },
    {
        id: '2',
        title: 'İlişkilerde Sınırları Şefkatle Belirlemek',
        excerpt: 'Sevdiklerinizle bağınızı ve empatiyi korurken nasıl sağlıklı sınırlar koyabileceğinizi öğrenin.',
        category: 'ilişkiler',
        readTime: '7 dk okuma',
        imageUrl: 'https://images.unsplash.com/photo-1690212079578-753046723c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwc3Vuc2V0JTIwc29mdHxlbnwxfHx8fDE3Njc0NDMxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        date: '28 Aralık 2025'
    },
    {
        id: '3',
        title: 'Günlük Stresi Yönetmenin Nazik Yolları',
        excerpt: 'Stresli anlarda daha merkezde hissetmenize yardımcı olacak basit, araştırma destekli teknikler.',
        category: 'stres',
        readTime: '4 dk okuma',
        imageUrl: 'https://images.unsplash.com/photo-1707576068862-6b0986cc31be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW50bGUlMjBtb3JuaW5nJTIwbGlnaHR8ZW58MXx8fHwxNzY3NDQzMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        date: '26 Aralık 2025'
    },
    {
        id: '4',
        title: 'Anksiyete Bunaltıcı Hissettirdiğinde',
        excerpt: 'Kaygının tek başınıza başa çıkamayacak kadar büyük hissettirdiği anlar için şefkatli rehberlik.',
        category: 'anksiyete',
        readTime: '6 dk okuma',
        imageUrl: 'https://images.unsplash.com/photo-1740350631565-6a5081a2f841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHNwYSUyMHdlbGxuZXNzfGVufDF8fHx8MTc2NzQ0MzE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
        date: '24 Aralık 2025'
    },
    {
        id: '5',
        title: 'Sizi Besleyen Bir Sabah Ritüeli Oluşturmak',
        excerpt: 'Zihinsel sağlığınızı destekleyen ve güne pozitif bir tonla başlamanızı sağlayan nazik bir sabah pratiği oluşturun.',
        category: 'bilinçli farkındalık',
        readTime: '5 dk okuma',
        imageUrl: 'https://images.unsplash.com/photo-1624914690410-178fba4e0a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcGxhbnRzJTIwd2luZG93fGVufDF8fHx8MTc2NzQ0MzE2MHww&ixlib=rb-4.1.0&q=80&w=1080',
        date: '22 Aralık 2025'
    },
    {
        id: '6',
        title: 'Zor Zamanlarda Öz-Şefkat Sanatı',
        excerpt: 'Kendinize nazik davranmak neden önemlidir ve en çok ihtiyaç duyduğunuzda öz-şefkati nasıl uygulayabilirsiniz?',
        category: 'kendini keşif',
        readTime: '8 dk okuma',
        imageUrl: 'https://images.unsplash.com/photo-1686562918923-074018588a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwd2F0ZXIlMjBuYXR1cmV8ZW58MXx8fHwxNzY3NDQzMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        date: '20 Aralık 2025'
    }
];

export function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('hepsi');

    const filteredArticles = selectedCategory === 'hepsi'
        ? blogArticles
        : blogArticles.filter(article => article.category === selectedCategory);

    return (
        <div className="pt-40 pb-32 min-h-screen bg-soft-gray">
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-4 pb-48 text-center">
                <div className="mb-8 inline-block px-6 py-2.5 rounded-full bg-purple-50 text-sm text-purple-700 font-medium tracking-widest uppercase">
                    Mindspace İçgörüler
                </div>
                <h1 className="mb-10 text-5xl md:text-7xl font-bold text-purple-900 hero-title leading-tight">
                    Zihnin için<br />küçük molalar
                </h1>
                <p className="text-xl md:text-2xl text-purple-600/60 max-w-xl mx-auto leading-loose font-light">
                    Yalnız olmadığını hatırlatan yazılar, rehberler ve düşünceler.
                </p>
            </section>

            {/* Category Filter */}
            <section className="container mx-auto px-4 mb-40">
                <div className="flex flex-wrap gap-5 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-10 py-4 rounded-full transition-all duration-300 font-medium text-lg tracking-wide ${selectedCategory === category
                                    ? 'bg-purple-700 text-white shadow-2xl shadow-purple-200/50 scale-105'
                                    : 'bg-white text-purple-600 hover:bg-purple-50 border border-purple-100 hover:-translate-y-1'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </section>

            {/* Featured Article */}
            <section className="container mx-auto px-4 mb-48">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-purple-900/5 border border-purple-50 hover:shadow-3xl hover:shadow-purple-900/10 transition-shadow duration-500">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-[32rem] md:h-auto overflow-hidden group">
                            <img
                                src={featuredArticle.imageUrl}
                                alt={featuredArticle.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                            />
                        </div>
                        <div className="p-12 md:p-20 flex flex-col justify-center">
                            <div className="inline-block mb-8">
                                <span className="px-5 py-2 rounded-full bg-pink-50 text-sm text-pink-700 font-medium tracking-widest uppercase">
                                    Öne Çıkan
                                </span>
                            </div>
                            <h2 className="mb-8 text-4xl md:text-5xl font-bold text-purple-900 leading-[1.1]">
                                {featuredArticle.title}
                            </h2>
                            <p className="text-purple-600/80 mb-10 leading-loose text-xl font-light">
                                {featuredArticle.excerpt}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-8 border-t border-purple-50">
                                <span className="text-sm text-purple-400 font-medium tracking-widest uppercase">{featuredArticle.readTime}</span>
                                <button className="inline-flex items-center gap-3 text-purple-700 font-semibold hover:gap-5 transition-all duration-300 text-lg">
                                    Bu yazıyı sakince oku
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="container mx-auto px-4 my-32 text-center">
                <div className="flex items-center justify-center gap-6 opacity-30">
                    <div className="h-px w-24 bg-purple-400"></div>
                    <span className="text-sm font-medium text-purple-400 uppercase tracking-[0.3em]">Son Yazılar</span>
                    <div className="h-px w-24 bg-purple-400"></div>
                </div>
            </div>

            {/* Blog Grid */}
            <section className="container mx-auto px-4 mb-48">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {filteredArticles.map((article) => (
                        <article
                            key={article.id}
                            className="bg-white rounded-[2rem] overflow-hidden border border-purple-50 shadow-sm hover:shadow-2xl hover:shadow-purple-900/5 hover:-translate-y-3 transition-all duration-500 group cursor-pointer"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-in-out"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="text-xs px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-purple-900 font-bold tracking-wider shadow-sm uppercase">
                                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                                    </span>
                                </div>
                            </div>
                            <div className="p-10 flex flex-col h-full">
                                <h3 className="mb-6 text-2xl font-bold text-purple-900 group-hover:text-purple-700 transition-colors leading-tight">
                                    {article.title}
                                </h3>
                                <p className="text-lg text-purple-600/70 mb-8 leading-relaxed font-light line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <div className="mt-auto pt-8 border-t border-purple-50 flex items-center justify-between text-xs font-medium text-purple-400 uppercase tracking-widest">
                                    <span>{article.date}</span>
                                    <span>{article.readTime}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Emotional CTA Section */}
            <section className="container mx-auto px-4 mb-32">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-purple-100 via-white to-pink-50 rounded-[2.5rem] p-16 md:p-24 text-center border border-purple-100 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-50"></div>
                        <h2 className="mb-6 text-3xl md:text-5xl font-bold text-purple-900 leading-tight">
                            Burada hissettiklerin anlaşılır.
                        </h2>
                        <p className="text-purple-700/80 leading-loose mb-12 max-w-2xl mx-auto text-xl font-light">
                            Zihinsel sağlığına özen göstermenin bencilce olmadığını unutma — bu bir zorunluluktur.
                            İster öğrenmek, ister düşünmek, ister sadece daha az yalnız hissetmek için burada ol; yolculuğunun bir parçası olmaktan onur duyuyoruz.
                        </p>
                        <div className="inline-flex items-center gap-3 text-purple-700 font-medium bg-white/80 px-8 py-3 rounded-full backdrop-blur-md shadow-sm border border-white/50 hover:scale-105 transition-transform duration-300 cursor-default">
                            <span>Bugün kendin için bir an ayır</span>
                            <Sparkles className="w-6 h-6 text-amber-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pre-Footer CTA */}
            <section className="container mx-auto px-4 mb-16">
                <div className="text-center space-y-8 max-w-2xl mx-auto">
                    <p className="text-purple-600/80 text-xl font-light">
                        Yazıları kaydetmek ve kendi yolculuğunu takip etmek ister misin?
                    </p>
                    <button className="px-12 py-5 bg-purple-700 text-white rounded-2xl hover:bg-purple-800 transition-all shadow-xl hover:shadow-purple-200/50 hover:-translate-y-1.5 font-semibold text-lg tracking-wide">
                        Kendin için bir alan oluştur
                    </button>
                </div>
            </section>
        </div>
    );
}
