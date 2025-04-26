
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#1a1f36] to-[#2d3250] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7')] opacity-20 bg-cover bg-center animate-gentle-sway" style={{
        animation: 'gentleSway 20s ease-in-out infinite',
        transformOrigin: 'center',
        backgroundSize: '160% 160%'
      }} />
      <style>{`
        @keyframes gentleSway {
          0%, 100% { background-position: center; }
          55% { background-position: 55% 65%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] rounded-bl-full opacity-30 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#9333ea] to-[#4f46e5] rounded-tr-full opacity-30 blur-3xl -z-10" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 p-6">
        <div className="order-2 lg:order-1 animate-fade-in">
          <div className="space-y-8 backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center mb-8 animate-[float_4s_ease-in-out_infinite]">
              <img src="/logo-03.png" alt="Ekaant" className="h-16 w-16 rounded-full" />
              <span className="ml-4 text-3xl font-bold bg-gradient-to-r from-violet-200 to-indigo-300 bg-clip-text text-transparent">EKAANT</span>
            </div>

            <h2 className="text-4xl font-bold mb-8 text-white leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>We take your privacy <span className="bg-gradient-to-r from
-purple-400 to-blue-400 bg-clip-text text-transparent">seriously</span></h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6 bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="bg-violet-500/20 p-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">100% Confidential</h3>
                  <p className="text-gray-300">We'll never share your personal information with your employer</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="bg-blue-500/20 p-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Anonymised Data</h3>
                  <p className="text-gray-300">Employers only see overall company wellbeing metrics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 animate-fade-in">
          <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Welcome to Ekaant</h2>
            <div className="flex justify-between space-x-4">
              <Link 
                to="/sign-in"
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-medium hover:from-violet-600 hover:to-indigo-600 transition-all duration-300 text-center"
              >
                Sign In
              </Link>
              <Link 
                to="/sign-up"
                className="flex-1 py-3 px-6 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300 text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} Ekaant. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
