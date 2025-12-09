import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Booking from './components/Booking';
import Assistant from './components/Assistant';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePackageSelect = (pkgId: string) => {
    setSelectedPackage(pkgId);
    handleNavigate('booking');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Gallery />
            <Pricing onSelectPackage={handlePackageSelect} />
          </>
        );
      case 'portfolio':
        return <Gallery />;
      case 'pricing':
        return <Pricing onSelectPackage={handlePackageSelect} />;
      case 'booking':
        return <Booking preselectedPackage={selectedPackage} />;
      case 'about':
        return (
            <div className="max-w-4xl mx-auto py-20 px-4">
                <h1 className="text-4xl font-extrabold text-ph-dark mb-8">About Me</h1>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <img src="https://picsum.photos/400/500?grayscale" alt="Photographer" className="w-full md:w-1/3 rounded-2xl shadow-xl" />
                    <div className="text-lg text-gray-600 space-y-6">
                        <p>
                            Hi, I'm Zahir. I started shooting with a disposable Kodak when I was 7, and I haven't put a camera down since.
                        </p>
                        <p>
                            My philosophy is simple: <strong>Perfection is boring.</strong> 
                            I don't care about the perfect smile or the perfect hair. I care about the laugh that makes your nose scrunch up, 
                            the way your partner looks at you when you aren't paying attention, and the chaotic energy of a family reunion.
                        </p>
                        <p>
                            I shoot with Sony gear, edit with a film-inspired look, and deliver galleries that feel like memories, not stock photos.
                        </p>
                    </div>
                </div>
            </div>
        );
      default:
        return <Hero onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-ph-dark">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
      <Assistant />
    </div>
  );
};

export default App;
