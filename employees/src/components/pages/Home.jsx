import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#E6F3F3] to-[#F7FAFC] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7')] opacity-100 bg-cover bg-center animate-gentle-sway" style={{
        animation: 'gentleSway 20s ease-in-out infinite',
        transformOrigin: 'center',
        backgroundSize: '160% 160%'
      }} />
      <style>{`
        @keyframes gentleSway {
          0%, 100% { background-position: center; }
          55% { background-position: 55% 65%; }
        }
      `}</style>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-pink-500 to-blue-500 rounded-bl-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-100/40 to-indigo-100/40 rounded-tr-full blur-3xl -z-10" />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 backdrop-blur-sm p-6 rounded-xl">
        <div className="order-2 lg:order-1 animate-fade-in">
          <div className="space-y-6 max-w-lg mx-auto lg:mx-0 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center mb-8">
              <img src="\logo-03.png" alt="Ekaant" className="h-20 w-50 rounded-full" />

            </div>

            <h2 className="text-[40px] text-[#333333] font-semibold mb-12 justify-center flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>We take your privacy seriously</h2>
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="bg-blue-100 p-4 rounded-full justify-center flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-[#4A4A4A] text-left flex-1 ">
                  <span className="font-semibold block mb-3 text-xl ">Ekaant is 100% confidential</span>
                  <span className="text-base">We'll never share your personal information with your employer</span>
                </span>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-blue-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-[#4A4A4A] text-left flex-2">
                  <span className="font-semibold block mb-3 text-xl">Employers only see anonymised data</span>
                  <span className="text-base">They can see overall company wellbeing- but not how you use Ekaant personally</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 animate-fade-in">
          <div className="bg-white/40 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-lg ">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 items-center flex justify-center">Welcome to Ekaant</h2>
            <div className="flex justify-between mb-8">
              <Link 
                to="/sign-in"
                className="text-base font-medium px-4 py-2 rounded bg-gray-100 text-gray-900"
              >
                Sign In
              </Link>
              <Link 
                to="/sign-up"
                className="text-base font-medium px-4 py-2 rounded text-gray-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-8 left-8 flex items-center justify-center w-full">
        <p className="text- text-gray-500 flex items-center justify-center">© {new Date().getFullYear()} Ekaant. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;