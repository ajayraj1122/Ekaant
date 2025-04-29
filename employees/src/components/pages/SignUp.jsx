// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Signup = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     employeeId: "",
//     role: "",
//     phoneNumber: "",
//     department: "",
//     otp: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post("https://ekaant.onrender.com/api/sign-up", formData);
//       alert("OTP sent to your email!");
//       setStep(2);
//     } catch (err) {
//       setError(err.response?.data?.message || "Error sending OTP!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post("https://ekaant.onrender.com/api/verify-otp", {
//         email: formData.email,
//         otp: formData.otp,
//       });
//       alert("OTP verified successfully!");
//       setStep(3);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSetPassword = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post("https://ekaant.onrender.com/api/set-password", {
//         email: formData.email,
//         password: formData.password,
//       }, { withCredentials: true });

//       if (res.data.success) {
//         alert("Sign Up Successful!");
//         navigate("/sign-in");
//       }
//     } catch {
//       setError("Sign up failed!");
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#E6F3F3] to-[#F7FAFC] relative overflow-hidden">
//       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7')] opacity-100 bg-cover bg-center animate-gentle-sway" style={{
//         animation: 'gentleSway 20s ease-in-out infinite',
//         transformOrigin: 'center',
//         backgroundSize: '160% 160%'
//       }} />
//       <style>{`
//         @keyframes gentleSway {
//           0%, 100% { background-position: center; }
//           55% { background-position: 55% 65%; }
//         }
//       `}</style>
//       <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-pink-500 to-blue-500 rounded-bl-full blur-3xl -z-10" />
//       <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-100/40 to-indigo-100/40 rounded-tr-full blur-3xl -z-10" />
//       <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

//       <div className="w-full max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 backdrop-blur-sm p-6 rounded-xl">
//         <div className="order-2 lg:order-1 animate-fade-in">
//           <div className="space-y-6 max-w-lg mx-auto lg:mx-0 backdrop-blur-sm p-6 rounded-xl">
           
//           <div className="flex items-center mb-8 floating">
//               <img src="/logo-03.png" alt="Ekaant" className="h-12 w-12 transform transition-all duration-500 hover:rotate-12" />EKAANT
//             </div>

//             <h2 
//               className="text-[25px] text-[#333333] font-bold mb-12 text-center lg:text-left leading-tight"
//               style={{ fontFamily: 'Poppins, sans-serif' }}
//             >
//               Your Mental Health
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//                 Matters to Us
//               </span>
//             </h2>
//             <h2 className="text-[40px] text-[#333333] font-semibold mb-12 justify-center flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>We take your privacy seriously</h2>
//             <div className="space-y-12">
//               <div className="flex items-start space-x-6">
//                 <div className="bg-blue-100 p-4 rounded-full justify-center flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <span className="text-[#4A4A4A] text-left flex-1">
//                   <span className="font-semibold block mb-3 text-xl">Ekaant is 100% confidential</span>
//                   <span className="text-base">We'll never share your personal information with your employer</span>
//                 </span>
//               </div>
//               <div className="flex items-start space-x-6">
//                 <div className="bg-blue-100 p-4 rounded-full">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 </div>
//                 <span className="text-[#4A4A4A] text-left flex-1">
//                   <span className="font-semibold block mb-3 text-xl">Employers only see anonymised data</span>
//                   <span className="text-base">They can see overall company wellbeing- but not how you use Ekaant personally</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="order-1 lg:order-2 animate-fade-in">
//           <div className="bg-white/40 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-lg">
//             <div className="flex justify-between mb-8">
//               <Link to="/sign-in" className="text-base font-medium px-4 py-2 rounded text-gray-500">Sign In</Link>
//               <Link to="/sign-up" className="text-base font-medium px-4 py-2 rounded bg-gray-100 text-gray-900">Sign Up</Link>
//             </div>

//             {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//             {step === 1 && (
//               <form onSubmit={handleSendOTP} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
//                   <input
//                     type="text"
//                     name="username"
//                     placeholder="Enter username"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="name@example.com"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
//                   <input
//                     type="text"
//                     name="employeeId"
//                     placeholder="Enter Employee ID"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
//                   <input
//                     type="text"
//                     name="role"
//                     placeholder="Enter Role"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     placeholder="Enter Phone Number"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                     required
//                     pattern="[0-9]{10}"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
//                   <input
//                     type="text"
//                     name="department"
//                     placeholder="Enter Department"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-[#1E1B4B] text-white py-3 rounded-lg hover:bg-[#1E1B4B]/90 transition duration-200"
//                   disabled={loading}
//                 >
//                   {loading ? "Sending..." : "Send OTP"}
//                 </button>
//               </form>
//             )}

//             {step === 2 && (
//               <form onSubmit={handleVerifyOTP} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
//                   <input
//                     type="text"
//                     name="otp"
//                     placeholder="Enter OTP"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-[#1E1B4B] text-white py-3 rounded-lg hover:bg-[#1E1B4B]/90 transition duration-200"
//                   disabled={loading}
//                 >
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </form>
//             )}

//             {step === 3 && (
//               <form onSubmit={handleSetPassword} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="••••••••"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="••••••••"
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-[#1E1B4B] text-white py-3 rounded-lg hover:bg-[#1E1B4B]/90 transition duration-200"
//                   disabled={loading}
//                 >
//                   {loading ? "Setting..." : "Set Password"}
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>

//       <footer className="absolute bottom-8 left-8 flex items-center justify-center w-full">
//         <p className="text-gray-500 flex items-center justify-center">© {new Date().getFullYear()} Ekaant. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Signup;

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
                <h2 className="text-4xl font-bold">Secure & Private</h2>
              </div>
              <p className="text-xl opacity-90">Your data is protected with enterprise-grade security</p>
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
