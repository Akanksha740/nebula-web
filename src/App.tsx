import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { CheckEmail } from './pages/CheckEmail';
import { VerifyEmail } from './pages/VerifyEmail';
import { Dashboard } from './pages/Dashboard';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Markets } from './pages/Markets';
import { MarketDetail } from './pages/MarketDetail';
import { NotFound } from './pages/NotFound';
import { CategoryIndex } from './pages/CategoryIndex';
import { CategoryDetail } from './pages/CategoryDetail';
import { PseoPageView } from './pages/PseoPageView';

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/:coin" element={<Markets />} />
          <Route path="/markets/:coin/:slugOrTimeframe" element={<Markets />} />
          <Route path="/markets/:coin/market/:slug" element={<MarketDetail />} />
          <Route path="/category" element={<CategoryIndex />} />
          <Route path="/category/:slug" element={<CategoryDetail />} />
          <Route path="/p/:slug" element={<PseoPageView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
