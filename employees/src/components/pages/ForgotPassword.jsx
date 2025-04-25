
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Email is required!");
      return;
    }

    try {
      const res = await axios.post("https://ekaant-backend.onrender.com/api/send-otp-reset", { email }, { withCredentials: true });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    if (!otp) {
      setError("OTP is required!");
      return;
    }
  
    try {
      const res = await axios.post("https://ekaant-backend.onrender.com/api/verify-otp-reset", { email, otp }, { withCredentials: true });
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Try again.");
    }
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    try {
      const res = await axios.post("https://ekaant-backend.onrender.com/api/reset-password", { email, newPassword }, { withCredentials: true });
      setMessage(res.data.message);
      navigate("/sign-in");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed. Try again.");
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
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-pink-500/30 to-blue-500/30 rounded-bl-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-100/40 to-indigo-100/40 rounded-tr-full blur-3xl -z-10" />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 backdrop-blur-sm p-6 rounded-xl">
        <div className="order-2 lg:order-1 animate-fade-in">
          <div className="space-y-6 max-w-lg mx-auto lg:mx-0 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center mb-8">
              <img src="/logo-03.png" alt="Ekaant" className="h-20 w-50 rounded-full" />
            </div>

            <h2 className="text-[40px] text-[#333333] font-semibold mb-12 justify-center flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>Reset your password securely</h2>
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="bg-blue-100 p-4 rounded-full justify-center flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-[#4A4A4A] text-left flex-1">
                  <span className="font-semibold block mb-3 text-xl">Secure Password Reset</span>
                  <span className="text-base">We'll help you reset your password safely and securely</span>
                </span>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-blue-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-[#4A4A4A] text-left flex-1">
                  <span className="font-semibold block mb-3 text-xl">Two-Step Verification</span>
                  <span className="text-base">We use OTP verification to ensure it's really you</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 animate-fade-in">
          <div className="bg-white/40 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-lg">
          

            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Password</h2>
            {message && <p className="text-green-500 text-center mb-4">{message}</p>}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full bg-[#1E1B4B] text-white py-3 rounded-lg hover:bg-[#1E1B4B]/90 transition duration-200">
                  Send OTP
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                  <input
                    type="text"
                    placeholder="Enter OTP sent to your email"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full bg-[#1E1B4B] text-white py-3 rounded-lg hover:bg-[#1E1B4B]/90 transition duration-200">
                  Verify OTP
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full bg-[#1E1B4B] text-white py-3 rounded-lg hover:bg-[#1E1B4B]/90 transition duration-200">
                  Reset Password
                </button>
              </form>
            )}

            <div className="text-center mt-6">
              <Link to="/sign-in" className="text-blue-600 hover:underline">
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-8 left-8 flex items-center justify-center w-full">
        <p className="text-gray-500 flex items-center justify-center">© {new Date().getFullYear()} Ekaant. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ForgotPassword;
