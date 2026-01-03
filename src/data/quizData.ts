export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // 0 index usually represents the 'healthiest' option for scoring calculation consistency in this MVP
}

export const quizData: Question[] = [
    // --- İLİŞKİLER (Çift Terapisi Analizi) ---
    {
        id: 1,
        question: 'Partnerinizle bir tartışma sonrası durum genellikle nasıl sonuçlanır?',
        options: ['Karşılıklı anlayışla orta yolu buluruz', 'Biraz zaman alır ama birbirimizi anlarız', 'Sorun çözülmeden üstü kapanır, gerginlik sürer', 'Günlerce konuşmayız, birbirimizden uzaklaşırız'],
        correctAnswer: 0,
    },
    {
        id: 2,
        question: 'İlişkinizde kendinizi ne kadar "anlaşılmış" hissediyorsunuz?',
        options: ['Tamamen anlaşıldığımı hissediyorum', 'Çoğu zaman anlar ama bazen çaba gerekiyor', 'Söylediklerim genellikle yanlış anlaşılıyor', 'Beni hiç anlamıyor, anlatmaktan vazgeçtim'],
        correctAnswer: 0,
    },
    {
        id: 3,
        question: 'Geleceğe dair ortak planlar yaparken hissettiğiniz temel duygu nedir?',
        options: ['Heyecan ve güven', 'Hafif bir belirsizlik ama umut', 'Endişe ve uzlaşamama korkusu', 'Hiçbir ortak gelecek göremiyorum'],
        correctAnswer: 0,
    },
    {
        id: 4,
        question: 'İlişkinizdeki güven duygusunu nasıl tanımlarsınız?',
        options: ['Tamamen güveniyorum, içim rahat', 'Bazı ufak kuşkularım olsa da genelde güvenli', 'Sık sık şüphe duyuyor ve kontrol ediyorum', 'Güven duygumuz tamamen zedelendi'],
        correctAnswer: 0,
    },
    {
        id: 5,
        question: 'Birlikte vakit geçirmek sizin için ne ifade ediyor?',
        options: ['Günün en keyifli ve dinlendirici anı', 'Bazen yorucu olsa da genelde güzel', 'Sorumluluk gibi hissettiriyor, zoraki yapıyoruz', 'Yan yana bile olsak birbirimize çok uzağız'],
        correctAnswer: 0,
    },
    {
        id: 6,
        question: 'Partnerinizle olan fiziksel yakınlığınız/temasınız sizi ne kadar tatmin ediyor?',
        options: ['Çok memnunum', 'Yeterli ama daha iyi olabilir', 'Ciddi bir soğukluk hissediyorum', 'Fiziksel temasımız neredeyse tamamen koptu'],
        correctAnswer: 0,
    },
    {
        id: 7,
        question: 'Partnerinizin ailesi veya çevresi ilişkinizi ne kadar etkiliyor?',
        options: ['Hiç olumsuz etkisi yok, sınırlarımız net', 'Nadiren küçük krizler yaşıyoruz', 'Sürekli bir müdahale ve huzursuzluk var', 'Üçüncü kişiler yüzünden kopma noktasındayız'],
        correctAnswer: 0,
    },
    {
        id: 8,
        question: 'İlişkinizde kendinizi ne kadar "değerli" hissediyorsunuz?',
        options: ['Çok değerli ve özel hissediyorum', 'Genellikle değerliyim', 'Kendimi bazen yetersiz ve değersiz hissediyorum', 'Partnerim beni sürekli eleştiriyor veya aşağılıyor'],
        correctAnswer: 0,
    },
    {
        id: 9,
        question: 'Tartışma sırasında üslubunuz genellikle nasıldır?',
        options: ['Sakin ve çözüm odaklıyım', 'Bazen sesimi yükseltiyorum', 'Genelde kırıcı ve suçlayıcı olabiliyorum', 'Sürekli bir kavga, hakaret veya duvar örme hali'],
        correctAnswer: 0,
    },
    {
        id: 10,
        question: 'Bu ilişkiyi kurtarmak veya iyileştirmek için ne kadar enerjiniz var?',
        options: ['Zaten iyiyiz, korumaya hazırım', 'Emek vermeye ve değişime hazırım', 'Emin değilim, çok yorgun hissediyorum', 'Hiç umudum kalmadı, çaba sarf etmek istemiyorum'],
        correctAnswer: 0,
    },

    // --- STRES VE İŞ HAYATI (Stres Yönetimi Analizi) ---
    {
        id: 11,
        question: 'Pazartesi sabahları güne başlarken hissettiğiniz duygu nedir?',
        options: ['Enerjik ve planlıyım', 'Normal bir iş günü gibi hissediyorum', 'Ayaklarım geri geri gidiyor, isteksizim', 'Mide bulantısı ve büyük bir kaygı duyuyorum'],
        correctAnswer: 0,
    },
    {
        id: 12,
        question: 'Gün sonunda kendinizi ne kadar "tükenmiş" hissediyorsunuz?',
        options: ['Tatlı bir yorgunluk, dinlenince geçiyor', 'Biraz gerginim ama kendime vakit ayırabiliyorum', 'Kolumu kaldıracak halim kalmıyor', 'Kronik bir bitkinlik, hiçbir şey yapamıyorum'],
        correctAnswer: 0,
    },
    {
        id: 13,
        question: 'Beklenmedik bir sorunla karşılaştığınızda tepkiniz ne olur?',
        options: ['Sakince çözüm yolları ararım', 'Önce biraz bozulur, sonra adapte olurum', 'Anında moralim bozulur ve sinirlenirim', 'Tamamen pes ederim, kendimi çaresiz hissederim'],
        correctAnswer: 0,
    },
    {
        id: 14,
        question: 'Hata yapma korkusu hayatınızı ne kadar etkiliyor?',
        options: ['Hataları öğrenme süreci olarak görürüm', 'Hata yapmamaya çalışırım ama çok dert etmem', 'Hata yapmamak için kendimi çok stres altına sokarım', 'Hata yapma korkusuyla harekete geçmekte zorlanıyorum'],
        correctAnswer: 0,
    },
    {
        id: 15,
        question: 'Aynı anda birden fazla sorumlulukla başa çıkma beceriniz nasıl?',
        options: ['Organize olur ve sırayla hallederim', 'Biraz panik yapsam da bitiririm', 'Kafam çok karışıyor, hatalar yapmaya başlıyorum', 'Sorumluluklar altında eziliyorum, kilitlenip kalıyorum'],
        correctAnswer: 0,
    },
    {
        id: 16,
        question: 'Stresli olduğunuzda fiziksel belirtiler yaşıyor musunuz?',
        options: ['Hayır, vücudum sakin kalıyor', 'Hafif omuz veya baş ağrıları oluyor', 'Mide yanması, çarpıntı veya uyku bozukluğu yaşıyorum', 'Sürekli kronik ağrılar ve panik belirtileri içindeyim'],
        correctAnswer: 0,
    },
    {
        id: 17,
        question: 'Tatillerde veya hafta sonlarında işi zihninizden atabiliyor musunuz?',
        options: ['Evet, tamamen dinlenmeye odaklanırım', 'Genellikle atıyorum ama bazen aklıma geliyor', 'Zihnim hep yapılacak işlerle dolu, dinlenemiyorum', 'Tatil yapmak bile bana ekstra bir stres yükü gibi geliyor'],
        correctAnswer: 0,
    },
    {
        id: 18,
        question: 'Başkalarından yardım istemek sizin için ne kadar zor?',
        options: ['İhtiyacım olduğunda rahatça isterim', 'Biraz zorlanırım ama gerektiğinde yaparım', 'Yardım istemeyi zayıflık gibi görür, her şeyi üstlenirim', 'Asla isteyemem, her şeyi tek başıma yapmalıyım'],
        correctAnswer: 0,
    },
    {
        id: 19,
        question: 'İş veya okul arkadaşlarınızla ilişkileriniz sizi nasıl etkiliyor?',
        options: ['Destekleyici ve pozitif bir ortamdayım', 'Nötr, profesyonel sınırlar içindeyim', 'Bazı kişilerle sürekli rekabet ve gerginlik yaşıyorum', 'Çalışma ortamım benim için tamamen toksik ve baskılayıcı'],
        correctAnswer: 0,
    },
    {
        id: 20,
        question: 'Gelecek 5 yılınızı düşündüğünüzde ne hissediyorsunuz?',
        options: ['Umutlu ve heyecanlıyım', 'Belirsiz ama olumlu bakmaya çalışıyorum', 'Büyük bir kaygı ve endişe içindeyim', 'Hiçbir gelecek göremiyorum, sadece bugün bitsin istiyorum'],
        correctAnswer: 0,
    },

    // --- BİREYSEL PSİKOLOJİ (Bireysel Terapi Analizi) ---
    {
        id: 21,
        question: 'Son zamanlarda sebepsiz yere hüzünlü veya ağlamaklı hissediyor musunuz?',
        options: ['Hiç hissetmiyorum', 'Çok nadiren, ayda bir kez', 'Sık sık bu duygulara kapılıyorum', 'Neredeyse her gün bu ruh halindeyim'],
        correctAnswer: 0,
    },
    {
        id: 22,
        question: 'Geçmişteki olumsuz anılarınız bugün kü hayatınızı ne kadar etkiliyor?',
        options: ['Etkilemiyor, geçmiş geçmişte kaldı', 'Arada aklıma gelse de günümü etkilemiyor', 'Eski travmalarım hala canımı acıtıyor', 'Geçmişin gölgesinden çıkamıyor, sürekli aynı acıyı yaşıyorum'],
        correctAnswer: 0,
    },
    {
        id: 23,
        question: 'Kendinize karşı ne kadar eleştirelsiniz?',
        options: ['Kendimi seviyor ve hatalarımla kabul ediyorum', 'Bazen kendime kızarım ama genelde barışığım', 'Sürekli kendimde kusur buluyor ve yetersiz hissediyorum', 'Kendi kendimin en büyük düşmanıyım, kendimden memnun değilim'],
        correctAnswer: 0,
    },
    {
        id: 24,
        question: 'Kendinizi sosyal ortamlarda nasıl hissediyorsunuz?',
        options: ['Rahatım, kendimi ifade edebiliyorum', 'Bazen çekiniyorum ama uyum sağlıyorum', 'Genellikle görünmez olmayı tercih ediyorum', 'İnsanlarla iletişim kurmak bana çok ağır geliyor, kaçıyorum'],
        correctAnswer: 0,
    },
    {
        id: 25,
        question: 'Duygu durumunuzda (ani öfke, ani üzüntü) dalgalanmalar oluyor mu?',
        options: ['Hayır, duygularım oldukça stabildir', 'Çok nadiren, belirli olaylar sonrası', 'Gün içinde sık sık ani değişimler yaşıyorum', 'Duygularımı kontrol edemiyorum, çok uçlarda yaşıyorum'],
        correctAnswer: 0,
    },
    {
        id: 26,
        question: 'Vücudunuzu ve dış görünüşünüzü ne kadar beğeniyorsunuz?',
        options: ['Kendimle tamamen barışığım', 'Bazı kusurlarımı biliyorum ama kabul ediyorum', 'Hiç beğenmiyorum, sürekli değiştirmek istiyorum', 'Aynaya bakmaya bile tahammül edemiyorum'],
        correctAnswer: 0,
    },
    {
        id: 27,
        question: 'Hayatın genel olarak bir anlamı olduğuna inanıyor musunuz?',
        options: ['Evet, hayat çok değerli ve anlamlı', 'Arada sorgulasam da evet', 'Her şey yavaş yavaş anlamını yitiriyor', 'Tamamen anlamsız ve boş bir boşluk içindeyim'],
        correctAnswer: 0,
    },
    {
        id: 28,
        question: 'Konsantrasyon ve odaklanma sorunu yaşıyor musunuz?',
        options: ['Hayır, işlerime odaklanabiliyorum', 'Bazen dikkatim dağılıyor ama toparlıyorum', 'Bir şeye odaklanmak benim için çok güçleşti', 'Zihnim tamamen darmadağın, hiçbir şeye odaklanamıyorum'],
        correctAnswer: 0,
    },
    {
        id: 29,
        question: 'Uyku düzeniniz ve kaliteniz ne durumda?',
        options: ['Düzenli ve dinlendirici uyuyorum', 'Arada bölünse de idare eder', 'Uykuya dalmakta veya uyanmakta çok zorlanıyorum', 'Sürekli uykusuzum veya kabuslarla uyanıyorum'],
        correctAnswer: 0,
    },
    {
        id: 30,
        question: 'Kendi geleceğinizle ilgili "umut" seviyeniz nedir?',
        options: ['Gelecekten çok umutluyum', 'Orta derecede umutluyum', 'Umutlarım gün geçtikçe azalıyor', 'Hiçbir umudum kalmadı, karanlık hissediyorum'],
        correctAnswer: 0,
    },

    // --- FARKINDALIK VE YAŞAM KOÇLUĞU (Mindfulness & Koçluk) ---
    {
        id: 31,
        question: 'Günlük hayattaki küçük şeylerden (kahve, hava, bir çiçek) ne kadar keyif alıyorsunuz?',
        options: ['Her gün bu anların tadını çıkarırım', 'Bazen fark ederim', 'Genellikle fark etmeden geçip giderim', 'Hiçbir şey bana keyif vermiyor'],
        correctAnswer: 0,
    },
    {
        id: 32,
        question: 'Şu anki duygularınızı isimlendirebiliyor musunuz?',
        options: ['Duygularımın farkındayım ve tanımlayabilirim', 'Genellikle ne hissettiğimi bilirim', 'Kafam karışık, hissettiklerimin adını koyamıyorum', 'Sadece büyük bir boşluk hissediyorum'],
        correctAnswer: 0,
    },
    {
        id: 33,
        question: 'Yeni bir hobi veya yetenek edinme isteğiniz ne durumda?',
        options: ['Çok istekliyim, sürekli yeni şeyler öğreniyorum', 'Arada bir hevesleniyorum', 'Enerjim yok, isteğim de azaldı', 'Hiçbir şeye karşı merak veya ilgi duymuyorum'],
        correctAnswer: 0,
    },
    {
        id: 34,
        question: 'Kendinize karşı ne kadar nazik (öz-şefkatli) davranıyorsunuz?',
        options: ['Hata yaptığımda kendimi teselli ederim', 'Bazen kızsam da kendime vakit ayırırım', 'Genellikle kendimi suçlar ve cezalandırırım', 'Sürekli kendimi hırpalıyor ve eleştiriyorum'],
        correctAnswer: 0,
    },
    {
        id: 35,
        question: 'Başkalarına "Hayır" diyebiliyor musunuz?',
        options: ['Evet, sınırlarımı net bir şekilde çizerim', 'Bazen zorlansam da gerektiğinde derim', 'Genelde diyemem, kendimden çok ödün veririm', 'Asla diyemem, herkesi memnun etmeye çalışırım'],
        correctAnswer: 0,
    },
    {
        id: 36,
        question: 'Anı yaşama (Mindfulness) seviyeniz nedir?',
        options: ['Çoğu zaman yaptığım işin ve anın farkındayım', 'Bazen dalıp gitsem de kendimi geri getirebilirim', 'Zihnim hep geçmişte veya gelecekte', 'Zihnimin içinde hapsolmuş durumdayım, anı kaçırıyorum'],
        correctAnswer: 0,
    },
    {
        id: 37,
        question: 'Sosyal medya kullanımınız sizi nasıl hissettiriyor?',
        options: ['Eğleniyorum veya ilham alıyorum', 'Bazen vaktimi çalıyor ama sorun değil', 'Kendimi başkalarıyla kıyaslayıp kötü hissediyorum', 'Sosyal medya bende ciddi bir yetersizlik duygusu yaratıyor'],
        correctAnswer: 0,
    },
    {
        id: 38,
        question: 'Kendi potansiyelinizi gerçekleştirmek için ne kadar cesursunuz?',
        options: ['Kendime güveniyorum, adımlar atıyorum', 'Bazen korksam da ilerliyorum', 'Çok çekingenim, harekete geçemiyorum', 'Hiçbir şey başaramayacağıma inanıyorum'],
        correctAnswer: 0,
    },
    {
        id: 39,
        question: 'Hayatınızda "keşke"lerin mi yoksa "iyiki"lerin mi sayısı daha fazla?',
        options: ['İyikilerim çok daha fazla', 'Dengeli diyebilirim', 'Keşkelerim yavaş yavaş artıyor', 'Tüm hayatım keşkelerden ibaret'],
        correctAnswer: 0,
    },
    {
        id: 40,
        question: 'Bugün kendiniz için bir değişim başlatacak olsanız bu ne olurdu?',
        options: ['Küçük bir alışkanlığımı değiştirmek', 'Kişisel gelişimime daha çok vakit ayırmak', 'Eski bir travmamı çözmek için yardım almak', 'Tüm hayatımı sil baştan kurmak'],
        correctAnswer: 0,
    },
];