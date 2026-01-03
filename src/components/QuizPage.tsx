import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { quizData } from '../data/quizData';
import { useNavigate } from 'react-router-dom';

export function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizData.length).fill(null));
    const [showResults, setShowResults] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const navigate = useNavigate();

    const handleAnswerSelect = (optionIndex: number) => {
        setSelectedAnswer(optionIndex);
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            // Load existing answer for next question if available
            setSelectedAnswer(answers[currentQuestion + 1]);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(answers[currentQuestion - 1]);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setAnswers(new Array(quizData.length).fill(null));
        setShowResults(false);
        setShowWelcome(true);
    };

    const startQuiz = () => {
        setShowWelcome(false);
    };

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Calculate Results
    const getResults = () => {
        // Categories based on 40 questions (10 per category)
        // 0-9: Relationships
        // 10-19: Stress
        // 20-29: Individual
        // 30-39: Coaching

        const calculateCategoryScore = (startIndex: number, endIndex: number) => {
            return answers.slice(startIndex, endIndex + 1).reduce((acc, curr) => acc! + (curr || 0), 0) || 0;
        };

        const relationshipsScore = calculateCategoryScore(0, 9);
        const stressScore = calculateCategoryScore(10, 19);
        const individualScore = calculateCategoryScore(20, 29);
        const coachingScore = calculateCategoryScore(30, 39);

        const totalScore = relationshipsScore + stressScore + individualScore + coachingScore;

        const recommendations = [];

        // Prioritize Comprehensive Support if total score is high
        if (totalScore > 100) {
            recommendations.push({
                title: 'Kapsamlı Destek Paketi',
                description: 'Genel esenlik halinizi iyileştirmek için bütüncül bir yaklaşıma ihtiyacınız olabilir. Sizin için özel oluşturulacak bir destek planı en doğrusu olacaktır.',
                link: '/#contact',
                type: 'comprehensive'
            });
        } else {
            // Check individual categories if total score isn't critical
            // Threshold > 25 indicates high need (Max score per category is 30)

            if (relationshipsScore > 25) {
                recommendations.push({
                    title: 'Çift Terapisi',
                    description: 'İlişki dinamiklerinde zorlanıyor olabilirsiniz. Profesyonel bir bakış açısı, iletişiminizi güçlendirebilir.',
                    link: '/service/couples',
                    type: 'couples'
                });
            }

            if (stressScore > 25) {
                recommendations.push({
                    title: 'Stres Yönetimi',
                    description: 'Günlük hayatın baskısı sizi yoruyor gibi görünüyor. Stresle başa çıkma teknikleri yaşam kalitenizi artırabilir.',
                    link: '/service/stress',
                    type: 'stress'
                });
            }

            if (individualScore > 25) {
                recommendations.push({
                    title: 'Bireysel Terapi',
                    description: 'Kendi iç dünyanızda bazı düğümler olabilir. Bireysel terapiyle bunları güvenle çözebilirsiniz.',
                    link: '/service/individual',
                    type: 'individual'
                });
            }

            if (coachingScore > 25) {
                recommendations.push({
                    title: 'Mutluluk Koçluğu & Mindfulness',
                    description: 'Hayatınızda daha fazla denge, farkındalık ve potansiyel keşfi için koçluk desteği size iyi gelebilir.',
                    link: '/service/happiness-coaching',
                    type: 'coaching'
                });
            }
        }

        // Default Fallback if no specific high scores
        if (recommendations.length === 0) {
            recommendations.push({
                title: 'Online Eğitimler & Mindfulness',
                description: 'Genel durumunuz dengeli görünüyor. Kişisel gelişiminizi desteklemek için online eğitimlerimizi inceleyebilirsiniz.',
                link: '/service/online-education',
                type: 'general'
            });
        }

        return { totalScore, recommendations };
    };

    // Welcome Screen
    if (showWelcome) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-purple-50 pt-24">
                <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-xl p-8 md:p-12 text-center border border-purple-100">
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-sm">
                            <span className="text-5xl">📝</span>
                        </div>
                        <h1 className="mb-4 text-purple-900 font-bold text-3xl md:text-4xl">Kapsamlı Zihinsel Esenlik Testi</h1>
                        <p className="text-purple-800/70 mb-2 text-lg">
                            Sizi daha iyi tanımak ve doğru yönlendirmek için 40 soruluk kapsamlı bir değerlendirme.
                        </p>
                        <p className="text-purple-600/60 text-sm">
                            Lütfen her soruyu dikkatlice okuyun ve size en uygun olanı seçin.
                        </p>
                    </div>

                    <div className="bg-purple-50/50 rounded-2xl p-6 mb-10 border border-purple-100">
                        <h3 className="mb-4 text-purple-900 font-bold text-lg">Nasıl İlerler?</h3>
                        <ul className="text-left space-y-3 text-purple-700/80">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="text-purple-500 mt-1 w-5 h-5 flex-shrink-0" />
                                <span>İlişkiler, Stres, Bireysel Durum ve Farkındalık alanlarında analiz yapılır.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="text-purple-500 mt-1 w-5 h-5 flex-shrink-0" />
                                <span>Cevaplarınıza göre size özel bir yol haritası sunulur.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="text-purple-500 mt-1 w-5 h-5 flex-shrink-0" />
                                <span>Sonuçlar tamamen kişiseldir ve yön göstericidir.</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={startQuiz}
                        className="btn btn-primary px-12 py-4 text-lg w-full md:w-auto shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                        Teste Başla
                    </button>
                </div>
            </div>
        );
    }

    if (showResults) {
        const { totalScore, recommendations } = getResults();

        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-purple-50 pt-24 pb-12">
                <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-purple-100">
                    <div className="text-center">
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-sm">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                            <h2 className="mb-4 text-purple-900 font-bold text-3xl">Analiz Tamamlandı!</h2>
                            <p className="text-purple-800/70 text-lg leading-relaxed mb-2">
                                Cevaplarınız analiz edildi.
                            </p>
                        </div>

                        <div className="bg-purple-50 rounded-3xl p-8 mb-8 text-left border border-purple-100">
                            <h3 className="text-xl font-bold text-purple-900 mb-6">Size Özel Önerilerimiz:</h3>
                            <div className="space-y-6">
                                {recommendations.map((rec, index) => (
                                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 transform hover:scale-[1.02] transition-transform">
                                        <h4 className="text-lg font-bold text-purple-800 mb-2">{rec.title}</h4>
                                        <p className="text-purple-600/80 mb-4 text-sm leading-relaxed">
                                            {rec.description}
                                        </p>
                                        <button
                                            onClick={() => {
                                                window.location.href = rec.link;
                                            }}
                                            className="text-purple-600 font-medium hover:text-purple-800 text-sm flex items-center gap-2 group"
                                        >
                                            Detaylı İncele <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/#contact')}
                                className="btn btn-primary px-8 py-3 shadow-lg"
                            >
                                Uzman Görüşmesi Planla
                            </button>
                            <button
                                onClick={restartQuiz}
                                className="btn bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3"
                            >
                                Testi Tekrarla
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const question = quizData[currentQuestion];
    const progress = ((currentQuestion + 1) / quizData.length) * 100;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-purple-50 pt-24 pb-10">
            <div className="w-full max-w-3xl">
                {/* Progress Bar */}
                <div className="mb-8 p-4 md:p-0">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-purple-600/70">
                            Soru {currentQuestion + 1} / {quizData.length}
                        </span>
                        <span className="text-sm font-medium text-purple-600/70">
                            %{Math.round(progress)} Tamamlandı
                        </span>
                    </div>
                    <div className="w-full h-3 bg-purple-100 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-[2rem] shadow-xl p-6 md:p-12 border border-purple-50 relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] opacity-50 pointer-events-none"></div>

                    <h2 className="mb-10 text-center text-purple-900 font-bold text-2xl md:text-3xl leading-snug relative z-10">
                        {question?.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-4 mb-10 relative z-10">
                        {question?.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 group relative overflow-hidden ${selectedAnswer === index
                                        ? 'border-purple-500 bg-purple-50 shadow-md transform scale-[1.01]'
                                        : 'border-gray-100 hover:border-purple-300 hover:bg-purple-50/30'
                                    }`}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div
                                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${selectedAnswer === index
                                                ? 'border-purple-500 bg-purple-500 text-white'
                                                : 'border-purple-200 text-purple-200 group-hover:border-purple-400 group-hover:text-purple-400'
                                            }`}
                                    >
                                        <span className="text-sm font-bold">{String.fromCharCode(65 + index)}</span>
                                    </div>
                                    <span className={`text-lg ${selectedAnswer === index ? 'text-purple-900 font-medium' : 'text-gray-600 group-hover:text-purple-800'}`}>
                                        {option}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-6 border-t border-purple-50 relative z-10">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestion === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-medium ${currentQuestion === 0
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-purple-600 hover:bg-purple-50 hover:text-purple-800'
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Önceki
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={selectedAnswer === null}
                            className={`flex items-center gap-2 px-8 py-4 rounded-xl transition-all shadow-lg font-medium ${selectedAnswer === null
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                    : 'btn-primary text-white'
                                }`}
                        >
                            {currentQuestion === quizData.length - 1 ? 'Analizi Bitir' : 'Sonraki'}
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
