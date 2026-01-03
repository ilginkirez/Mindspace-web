import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { BlogPage } from './components/BlogPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { QuizPage } from './components/QuizPage';
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
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/service/:type" element={<ServiceDetailPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}