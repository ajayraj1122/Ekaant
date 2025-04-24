
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCredits } from "../context/CreditsContext";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refreshCredits } = useCredits();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/sign-in", formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        const { employee, token } = res.data;
        localStorage.setItem("user", JSON.stringify(employee));
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Refresh credits from the context
        await refreshCredits();

        // Trigger bar chart data update before navigation
        window.dispatchEvent(new Event('chartDataUpdated'));

        // Small delay to ensure data is fetched before navigation
        //await new Promise(resolve => setTimeout(resolve, 100));

        navigate("/analytics");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign-in failed! Please try again.");
    }
  };

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
            <div className="flex items-center mb-8 floating">
              <img src="/logo-03.png" alt="Ekaant" className="h-24 w-auto rounded-full shadow-xl transform transition-all duration-500 hover:rotate-12" />
            </div>

            <h2 
              className="text-[25px] text-[#333333] font-bold mb-12 text-center lg:text-left leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Your Mental Health
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Matters to Us
              </span>
            </h2>

            <h2 className="text-[40px] text-[#333333] font-semibold mb-12 justify-center flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>We take your privacy seriously</h2>
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="bg-blue-100 p-4 rounded-full justify-center flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-[#4A4A4A] text-left flex-1">
                  <span className="font-semibold block mb-3 text-xl">Ekaant is 100% confidential</span>
                  <span className="text-base">We'll never share your personal information with your employer</span>
                </span>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-blue-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-[#4A4A4A] text-left flex-1">
                  <span className="font-semibold block mb-3 text-xl">Employers only see anonymised data</span>
                  <span className="text-base">They can see overall company wellbeing- but not how you use Ekaant personally</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 animate-fade-in">
          <div className="bg-white/40 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-lg">
            <div className="flex justify-between mb-8">
              <Link to="/sign-in" className="text-base font-medium px-4 py-2 rounded bg-gray-100 text-gray-900">Sign In</Link>
              <Link to="/sign-up" className="text-base font-medium px-4 py-2 rounded text-gray-500">Sign Up</Link>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
                <div className="flex justify-end mt-2">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#1E1B4B] text-white py-3 rounded-lg hover:bg-[#1E1B4B]/90 transition duration-200"
              >
                Sign In
              </button>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-blue-600 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-8 left-8 flex items-center justify-center w-full">
        <p className="text-gray-500 flex items-center justify-center">© {new Date().getFullYear()} Ekaant. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signin;