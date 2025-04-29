
import { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const waveAnimationStyles = {
  gradient: { animation: 'gradient 20s ease infinite' }
};

const keyframesStyle = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes scale {
    0% { transform: scale(1) rotate(var(--rotation, 0deg)); }
    50% { transform: scale(1.1) rotate(var(--rotation, 180deg)); }
    100% { transform: scale(1) rotate(var(--rotation, 360deg)); }
  }
  @keyframes float {
    0% { transform: translateY(5px) rotate(var(--rotation, 10deg)); }
    50% { transform: translateY(-10px) rotate(var(--rotation, 20deg)); }
    100% { transform: translateY(10px) rotate(var(--rotation, 30deg)); }
  }
`;


const Signup = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    employeeId: "",
    role: "",
    phoneNumber: "",
    department: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Add keyframes to document
    const style = document.createElement('style');
    style.textContent = keyframesStyle;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
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
    },
    {
      icon: (
        <div className="bg-[#4CAF50]/20 p-4 rounded-xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#81C784]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      ),
      title: "Secured Data",
      description: "Employers only see overall Growth and Progress"
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://ekaant.onrender.com/api/sign-up", formData);
      alert("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending OTP!");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://ekaant.onrender.com/api/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      alert("OTP verified successfully!");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP!");
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("https://ekaant.onrender.com/api/set-password", {
        email: formData.email,
        password: formData.password,
      }, { withCredentials: true });

      if (res.data.success) {
        alert("Sign Up Successful!");
        navigate("/sign-in");
      }
    } catch {
      setError("Sign up failed!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div 
        className="w-2/5 flex flex-col relative overflow-hidden m-4 rounded-2xl"
        style={{
          background: 'linear-gradient(-45deg, #4171f5, #3451b2, #2196f3, #2979ff)',
          backgroundSize: '300% 300%',
          ...waveAnimationStyles.gradient
        }}
      >
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-16 gap-3 p-6 opacity-40">
          {[...Array(192)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg backdrop-blur-sm"
              style={{
                background: `rgba(255, 255, 255, ${0.1 + (i % 3) * 0.05})`,
                animation: `${i % 2 === 0 ? 'float' : 'scale'} ${3 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
                transform: `rotate(${(i % 8) * 45}deg)`,
                height: i % 3 === 0 ? '100%' : i % 2 === 0 ? '75%' : '50%',
                width: i % 4 === 0 ? '100%' : i % 2 === 0 ? '80%' : '60%',
                '--rotation': `${(i % 4) * 90}deg`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex-grow flex flex-col items-center justify-start pt-20">
            <div className="flex items-center mb-12">
              <img src="/logo-03.png" alt="Ekaant" className="h-16" />
              <span className="text-white text-4xl font-bold ml-2">EKAANT</span>
            </div>
            <div className="text-white text-center mb-6">
              <h1 className="text-5xl font-bold mb-4">Create Account</h1>
              <p className="text-2xl">Join us on your journey to better management.</p>
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

      {/* Right Section - Sign Up Form */}
      <div className="w-1/2 p-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-12">
            <img src="/logo-03.png" alt="Ekaant" className="h-16" />
            <span className="text-4xl font-bold ml-2">EKAANT</span>
          </div>

          <div className="flex mb-8">
          <button 
              onClick={() => navigate('/sign-up')}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-all"
            >
              Sign Up
            </button>
            <button 
              onClick={() => navigate('/sign-in')}
              className="flex-1 py-2 px-4 bg-gray-100 text-gray-600 rounded-l hover:bg-gray-200 transition-all"
            >
              Sign In
            </button>
            
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  placeholder="Enter Role"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                  pattern="[0-9]{10}"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Enter Department"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSetPassword} className="space-y-4">
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Setting..." : "Set Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;