import { useParams } from 'react-router-dom';
import { Heart, Shield, Clock, UserCheck, MessageCircle, Calendar, BookOpen } from 'lucide-react';

type ServiceType = 'individual' | 'stress' | 'couples' | 'mindfulness' | 'online-education' | 'happiness-coaching';

export function ServiceDetailPage() {
    const { type } = useParams<{ type: string }>();
    const validTypes: ServiceType[] = ['individual', 'stress', 'couples', 'mindfulness', 'online-education', 'happiness-coaching'];

    // Default to 'individual' for safety
    const serviceType = (validTypes.includes(type as ServiceType) ? type : 'individual') as ServiceType;

    // Content varies by service type
    const content = getServiceContent(serviceType);

    return (
        <div className="min-h-screen bg-purple-50 animate-fade-in block pt-20">
            {/* Hero Section */}
            <section className="pt-20 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="mb-6 text-purple-900 font-bold text-4xl md:text-5xl">{content.title}</h1>
                    <p className="text-xl text-purple-800/80 leading-relaxed font-light max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>
            </section>

            {/* Is This For You Section */}
            <section className="py-16 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-purple-100/50">
                        <h2 className="mb-8 text-purple-900 font-bold text-3xl">Bu destek sizin için mi?</h2>
                        <p className="mb-10 text-purple-700/80 leading-relaxed text-lg">
                            {content.forYou.description}
                        </p>
                        <ul className="space-y-5">
                            {content.forYou.points.map((point, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="mt-2.5 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0 shadow-sm"></div>
                                    <span className="text-purple-800/90 text-lg">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* How This Support Helps Section */}
            <section className="py-16 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-center mb-16 text-purple-900 font-bold text-3xl">Bu destek nasıl yardımcı olur?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {content.howItHelps.map((item, index) => (
                            <div key={index} className="bg-white rounded-[2rem] p-8 shadow-sm border border-purple-50 hover:border-purple-200 transition-all text-center group hover:-translate-y-2 duration-300">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-50 mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-100">
                                    <div className="text-purple-600">
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 className="mb-4 text-purple-900 font-bold text-xl">{item.title}</h3>
                                <p className="text-purple-600/80 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What to Expect Section */}
            <section className="py-16 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-center mb-16 text-purple-900 font-bold text-3xl">Ne bekleyebilirsiniz?</h2>
                    <div className="space-y-6">
                        {content.whatToExpect.map((step, index) => (
                            <div key={index} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-purple-50 flex flex-col md:flex-row items-start gap-6 hover:shadow-lg transition-all hover:border-purple-100">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-xl border-4 border-purple-50">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="mb-3 text-purple-900 font-bold text-xl">{step.title}</h3>
                                    <p className="text-purple-600/80 leading-relaxed text-lg">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gentle Reassurance Section */}
            <section className="py-16 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-purple-100/50 rounded-[2.5rem] p-10 md:p-16 text-center">
                        <h2 className="mb-12 text-purple-900 font-bold text-3xl">Güvenle ilerleyebilirsiniz</h2>
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="flex flex-col items-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6 shadow-sm text-purple-500">
                                    <Shield size={28} />
                                </div>
                                <h4 className="mb-2 text-purple-900 font-bold text-lg">Tam Gizlilik</h4>
                                <p className="text-purple-600/80">
                                    Konuştuklarınız tamamen gizli kalır
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6 shadow-sm text-purple-500">
                                    <UserCheck size={28} />
                                </div>
                                <h4 className="mb-2 text-purple-900 font-bold text-lg">Profesyonel Destek</h4>
                                <p className="text-purple-600/80">
                                    Uzman terapistlerle çalışırsınız
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6 shadow-sm text-purple-500">
                                    <Clock size={28} />
                                </div>
                                <h4 className="mb-2 text-purple-900 font-bold text-lg">Baskı Yok</h4>
                                <p className="text-purple-600/80">
                                    Devam etme zorunluluğunuz yoktur
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Primary CTA Section */}
            <section className="py-24 px-6 md:pb-32">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl border border-purple-100 relative overflow-hidden">

                        {/* Decorative blob */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>

                        <div className="relative z-10">
                            <h2 className="mb-4 text-purple-900 font-bold text-3xl">Emin olamıyor musunuz?</h2>
                            <p className="mb-10 text-xl text-purple-800/70 font-light leading-relaxed max-w-2xl mx-auto">
                                Herkesin ihtiyacı ve yolu farklıdır. Hangisinin size daha uygun olduğunu birlikte keşfedebiliriz.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={() => {
                                        window.location.href = '/quiz';
                                    }}
                                    className="btn btn-primary px-10 py-5 text-lg rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full sm:w-auto"
                                >
                                    Bana uygun desteği bulmama yardım et
                                </button>
                                <a
                                    href="/blog"
                                    className="btn bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 px-10 py-5 text-lg rounded-2xl w-full sm:w-auto"
                                >
                                    Önce yazıları okumak istiyorum
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

function getServiceContent(serviceType: 'individual' | 'stress' | 'couples' | 'mindfulness' | 'online-education' | 'happiness-coaching') {
    const contents = {
        individual: {
            title: 'Bireysel Terapi',
            subtitle: 'Kendinize dönmek, anlamak ve değişmek için güvenli bir alan',
            forYou: {
                description: 'Bazen hayat beklenmedik şekilde zorlaşır. Kendinizi yalnız, kayıp veya anlaşılmamış hissedebilirsiniz.',
                points: [
                    'Sürekli bir endişe veya huzursuzluk hissediyorsanız',
                    'Hayatınızda değişim yapmak istediğiniz ama nasıl başlayacağınızı bilemiyorsanız',
                    'Geçmişte yaşadıklarınızın bugünkü ilişkilerinizi etkilediğini düşünüyorsanız',
                    'Kendinizi ifade etmekte zorlanıyorsanız',
                    'Sadece dinlenilmek ve anlaşılmak istiyorsanız'
                ]
            },
            howItHelps: [
                {
                    icon: <Heart className="w-8 h-8" />,
                    title: 'Kendinizi Anlama',
                    description: 'Duygularınızı ve düşüncelerinizi keşfederek kendinizle daha iyi bir ilişki kurarsınız'
                },
                {
                    icon: <MessageCircle className="w-8 h-8" />,
                    title: 'Güvenli İfade',
                    description: 'Yargılanmadan konuşabileceğiniz bir alan bulursunuz'
                },
                {
                    icon: <Calendar className="w-8 h-8" />,
                    title: 'Sürekli Gelişim',
                    description: 'Adım adım, kendi hızınızda ilerlersiniz'
                }
            ],
            whatToExpect: [
                {
                    title: 'İlk konuşma',
                    description: 'Terapistinizle tanışır, kendinizi rahat hissettiğinizden emin olursunuz. İlk görüşmede hedeflerinizi ve beklentilerinizi konuşursunuz.'
                },
                {
                    title: 'Düzenli destek',
                    description: 'Haftalık veya ihtiyacınıza göre görüşmeler yaparsınız. Her oturum sizin için ayrılmış bir zamandır.'
                },
                {
                    title: 'Esnek tempo',
                    description: 'Süreç tamamen sizin hızınıza göre ilerler. Ne kadar süre devam edeceğinize birlikte karar verirsiniz.'
                }
            ]
        },
        stress: {
            title: 'Stres Yönetimi',
            subtitle: 'Günlük hayatın stresini kontrol altına almak için etkili teknikler',
            forYou: {
                description: 'Modern hayatın temposu bazen dayanılmaz hale gelebilir. Kendinizi sürekli gergin ve yorgun hissedebilirsiniz.',
                points: [
                    'İş veya okul yükünüzün sizi aşırı yorduğunu hissediyorsanız',
                    'Uyku problemi yaşıyor veya sürekli kaygılıysanız',
                    'Fiziksel belirtiler (baş ağrısı, mide sorunları) yaşıyorsanız',
                    'Kendinize zaman ayıramıyor ve tükenmişlik hissediyorsanız',
                    'Daha sakin ve dengeli bir yaşam istiyorsanız'
                ]
            },
            howItHelps: [
                {
                    icon: <Heart className="w-8 h-8" />,
                    title: 'Stres Tanıma',
                    description: 'Stresinizin kaynaklarını anlayarak kontrol etmeyi öğrenirsiniz'
                },
                {
                    icon: <MessageCircle className="w-8 h-8" />,
                    title: 'Pratik Teknikler',
                    description: 'Günlük hayatta kullanabileceğiniz somut yöntemler edinirsiniz'
                },
                {
                    icon: <Calendar className="w-8 h-8" />,
                    title: 'Sürdürülebilir Çözümler',
                    description: 'Uzun vadede sizi destekleyecek alışkanlıklar geliştirirsiniz'
                }
            ],
            whatToExpect: [
                {
                    title: 'Durum değerlendirmesi',
                    description: 'Stres kaynaklarınızı ve etkilerini birlikte inceleriz. Hangi alanlarda destek istediğinizi belirleriz.'
                },
                {
                    title: 'Teknik öğrenimi',
                    description: 'Nefes egzersizleri, gevşeme teknikleri ve zihinsel stratejiler öğrenirsiniz. Her hafta yeni araçlar edinirsiniz.'
                },
                {
                    title: 'Günlük uygulama',
                    description: 'Öğrendiklerinizi hayatınıza entegre edersiniz. İlerlemelerinizi birlikte gözden geçiririz.'
                }
            ]
        },
        couples: {
            title: 'Çift Terapisi',
            subtitle: 'İlişkinizi güçlendirmek ve birlikte büyümek için profesyonel rehberlik',
            forYou: {
                description: 'Her ilişkide zorluklar yaşanır. Önemli olan bu zorlukları birlikte aşma iradenizdir.',
                points: [
                    'Partnerinizle iletişim kurmakta zorlanıyorsanız',
                    'Sık sık aynı konular üzerinde tartışıyorsanız',
                    'Birbirinizi anlamakta güçlük çekiyorsanız',
                    'İlişkinizde yeni bir başlangıç yapmak istiyorsanız',
                    'Birlikte daha mutlu ve sağlıklı olmak istiyorsanız'
                ]
            },
            howItHelps: [
                {
                    icon: <Heart className="w-8 h-8" />,
                    title: 'Bağ Güçlendirme',
                    description: 'Birbirinizi daha iyi anlar ve duygusal bağınızı derinleştirirsiniz'
                },
                {
                    icon: <MessageCircle className="w-8 h-8" />,
                    title: 'Sağlıklı İletişim',
                    description: 'Çatışmaları yapıcı şekilde çözmeyi öğrenirsiniz'
                },
                {
                    icon: <Calendar className="w-8 h-8" />,
                    title: 'Ortak Gelecek',
                    description: 'Birlikte büyüyebileceğiniz bir temel oluşturursunuz'
                }
            ],
            whatToExpect: [
                {
                    title: 'Birlikte başlangıç',
                    description: 'Her ikinizle de tanışırız. İlişkinizdeki güçlü yanları ve gelişim alanlarını konuşuruz.'
                },
                {
                    title: 'Destekli diyalog',
                    description: 'Güvenli bir ortamda birbirinizi dinler ve anlamaya çalışırsınız. Terapist size rehberlik eder.'
                },
                {
                    title: 'Yeni desenler',
                    description: 'İlişkinizde yeni, sağlıklı alışkanlıklar geliştirirsiniz. Her hafta birlikte ilerleme kaydedersiniz.'
                }
            ]
        },
        mindfulness: {
            title: 'Mindfulness',
            subtitle: 'Anda kalmayı öğrenmek, zihninize nazikçe alan açmak.',
            forYou: {
                description: 'Gün içinde zihninizin hiç durmadığını hissediyorsanız, anda kalmakta zorlanıyor veya sürekli geçmiş–gelecek arasında gidip geliyorsanız, mindfulness size iyi gelebilir.',
                points: [
                    'Zihniniz sürekli düşüncelerle doluysa',
                    'Rahatlamaya çalıştığınızda bile gevşeyemiyorsanız',
                    'Küçük anların tadını kaçırdığınızı hissediyorsanız',
                    'Bedeninizin sinyallerini fark etmekte zorlanıyorsanız'
                ]
            },
            howItHelps: [
                {
                    icon: <Heart className="w-8 h-8" />,
                    title: 'Farkındalık geliştirme',
                    description: 'Düşüncelerinizi ve duygularınızı yargılamadan gözlemlemeyi öğrenirsiniz.'
                },
                {
                    icon: <MessageCircle className="w-8 h-8" />,
                    title: 'Bedensel sakinlik',
                    description: 'Nefes ve beden odaklı pratiklerle gevşeme hissi artar.'
                },
                {
                    icon: <Calendar className="w-8 h-8" />,
                    title: 'Günlük hayata uyum',
                    description: 'Öğrendiklerinizi sadece oturumlarda değil, günlük yaşamda da kullanabilirsiniz.'
                }
            ],
            whatToExpect: [
                {
                    title: 'Pratik Yaklaşım',
                    description: 'Kısa ve uygulanabilir pratikler.'
                },
                {
                    title: 'Yumuşak Tempo',
                    description: 'Zorlayıcı olmayan, yumuşak bir tempo.'
                },
                {
                    title: 'Özgür Alan',
                    description: 'Denemek, bırakmak, yeniden başlamak için özgürlük.'
                }
            ]
        },
        'online-education': {
            title: 'Online Eğitimler',
            subtitle: 'Kendi hızınızda öğrenebileceğiniz güvenli bir gelişim alanı.',
            forYou: {
                description: 'Kendiniz üzerinde çalışmak istiyor ama bunu kendi zamanınızda yapmak istiyorsanız, online eğitimler sizin için uygun olabilir.',
                points: [
                    'Kendi başınıza ilerlemeyi tercih ediyorsanız',
                    'Belirli bir konuda (stres, farkındalık, ilişkiler gibi) bilgi edinmek istiyorsanız',
                    'Yüz yüze görüşmeye hazır hissetmiyorsanız',
                    'Öğrendiklerinizi tekrar tekrar gözden geçirmek istiyorsanız'
                ]
            },
            howItHelps: [
                {
                    icon: <Heart className="w-8 h-8" />,
                    title: 'Yapılandırılmış içerik',
                    description: 'Konular adım adım, anlaşılır bir şekilde sunulur.'
                },
                {
                    icon: <MessageCircle className="w-8 h-8" />,
                    title: 'Esnek erişim',
                    description: 'Dilediğiniz zaman durabilir, devam edebilirsiniz.'
                },
                {
                    icon: <Calendar className="w-8 h-8" />,
                    title: 'Güvenli öğrenme alanı',
                    description: 'Kendinizi zorlamadan, kendi sınırlarınız içinde ilerlersiniz.'
                }
            ],
            whatToExpect: [
                {
                    title: 'Zengin İçerik',
                    description: 'Video, yazılı içerik ve küçük egzersizler.'
                },
                {
                    title: 'Uyarlanabilirlik',
                    description: 'Günlük hayata uyarlanabilir bilgiler.'
                },
                {
                    title: 'Bireysel Süreç',
                    description: 'Kendi temponuza saygılı bir öğrenme süreci.'
                }
            ]
        },
        'happiness-coaching': {
            title: 'Mutluluk Koçluğu',
            subtitle: 'Hayatınızda neyin sizi gerçekten beslediğini keşfetmek.',
            forYou: {
                description: 'Hayatınızda genel olarak her şey yolunda görünse bile içten içe bir eksiklik hissediyorsanız, mutluluk koçluğu size yön gösterici olabilir.',
                points: [
                    'Hayatınızda daha fazla denge ve anlam arıyorsanız',
                    'Kendinizi sık sık başkalarıyla kıyaslıyorsanız',
                    'Ne istediğinizi netleştirmekte zorlanıyorsanız',
                    'Günlük hayatta daha tatmin edici hissetmek istiyorsanız'
                ]
            },
            howItHelps: [
                {
                    icon: <Heart className="w-8 h-8" />,
                    title: 'Hedef netliği',
                    description: 'Sizin için gerçekten önemli olanı fark etmenize yardımcı olur.'
                },
                {
                    icon: <MessageCircle className="w-8 h-8" />,
                    title: 'Güçlü yönler',
                    description: 'Sahip olduğunuz kaynakları ve güçlü yanları görünür kılar.'
                },
                {
                    icon: <Calendar className="w-8 h-8" />,
                    title: 'Yaşam dengesi',
                    description: 'İş, ilişkiler ve kişisel alan arasında daha sağlıklı bir denge kurmanıza destek olur.'
                }
            ],
            whatToExpect: [
                {
                    title: 'Görüşmeler',
                    description: 'Yönlendirici ama baskısız görüşmeler.'
                },
                {
                    title: 'Keşif Soruları',
                    description: 'Kendinizi daha iyi tanımanıza alan açan sorular.'
                },
                {
                    title: 'Küçük Adımlar',
                    description: 'Küçük ama sürdürülebilir adımlar.'
                }
            ]
        }
    };

    return contents[serviceType];
}
