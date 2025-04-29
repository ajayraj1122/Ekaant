import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      icon: (
        <div className="bg-[#7C4DFF]/20 p-4 rounded-xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#B388FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      ),
      title: "100% Confidential",
      description: "We'll never share your personal information with your employer"
    },
    {
      icon: (
        <div className="bg-[#536DFE]/20 p-4 rounded-xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#82B1FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      ),
      title: "Anonymised Data",
      description: "Employers only see overall company wellbeing metrics"
    }
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => {
      clearInterval(interval);
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7')",
            filter: 'brightness(0.9)'
          }}
        />
        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex-grow flex flex-col items-center justify-start pt-20">
            <img src="\logo-03.png" alt="SimpleFlow" className="h-16 mb-12" />
            <div className="text-white text-center mb-6">
              <h1 className="text-5xl font-bold mb-4">Welcome to EKAANT</h1>
              <p className="text-2xl">Your Gateway to Effortless Management.</p>
            </div>
            
            <div className="text-white text-center mt-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-[#7C4DFF]/20 p-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#B388FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold">{slides[currentSlide].title}</h2>
              </div>
              <p className="text-xl opacity-90">{slides[currentSlide].description}</p>
            </div>

            <div className="flex justify-center space-x-2 mt-12">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-white w-8" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Sign In Form */}
      <div className="w-1/2 p-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <img src="/SimpleFlow-logo.png" alt="SimpleFlow" className="h-8" />
          </div>

          <div className="flex mb-8">
            <button 
              onClick={() => navigate('/sign-up')}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-l hover:bg-blue-700 transition-all"
            >
              Sign Up
            </button>
            <button 
              onClick={() => navigate('/sign-in')}
              className="flex-1 py-2 px-4 bg-gray-100 text-gray-600 rounded-r hover:bg-gray-200 transition-all"
            >
              Sign In
            </button>
          </div>

         
          
        </div>
      </div>
    </div>
  );
};

export default Home;