import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { BlogPage } from './components/BlogPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { QuizPage } from './components/QuizPage';
import { AuthPage } from './components/AuthPage';
import { DashboardPage } from './components/DashboardPage';
import { ProfileSettingsPage } from './components/ProfileSettingsPage';
import { SecurityPage } from './components/SecurityPage';
import { LegalPage } from './components/LegalPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/alanim" element={<DashboardPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/service/:type" element={<ServiceDetailPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/ayarlar/profil" element={<ProfileSettingsPage />} />
          <Route path="/ayarlar/guvenlik" element={<SecurityPage />} />
          <Route path="/yasal/:slug" element={<LegalPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}