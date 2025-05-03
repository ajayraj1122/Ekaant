
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { useCredits } from "../context/CreditsContext";

// const SignIn = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { refreshCredits } = useCredits();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     const formData = new FormData(e.target);
//     try {
//       const res = await axios.post("https://ekaant.onrender.com/api/sign-in", formData, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         }
//       });

//       if (res.data.success) {
//         const { employee, token } = res.data;
//         localStorage.setItem("user", JSON.stringify(employee));
//         localStorage.setItem("token", token);
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//         // Refresh credits from the context
//         await refreshCredits();

//         // Trigger bar chart data update before navigation
//         window.dispatchEvent(new Event('chartDataUpdated'));

//         // Small delay to ensure data is fetched before navigation
//         //await new Promise(resolve => setTimeout(resolve, 100));

//         navigate("/analytics");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Sign-in failed! Please try again.");
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
//             <div className="flex items-center mb-8 floating">
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
//               <Link to="/sign-in" className="text-base font-medium px-4 py-2 rounded bg-gray-100 text-gray-900">Sign In</Link>
//               <Link to="/sign-up" className="text-base font-medium px-4 py-2 rounded text-gray-500">Sign Up</Link>
//             </div>

//             {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="name@example.com"
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="••••••••"
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                   required
//                 />
//                 <div className="flex justify-end mt-2">
//                   <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
//                     Forgot password?
//                   </Link>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full  bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
//               >
//                 Sign In
//               </button>
//               <div className="text-center mt-4">
//                 <p className="text-sm text-gray-600">
//                   Don't have an account?{" "}
//                   <Link to="/sign-up" className="text-blue-600 hover:underline">
//                     Sign Up
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       <footer className="absolute bottom-8 left-8 flex items-center justify-center w-full">
//         <p className="text-gray-500 flex items-center justify-center">© {new Date().getFullYear()} Ekaant. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default SignIn;

// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { useCredits } from "../context/CreditsContext";

// const waveAnimationStyles = {
//   gradient: { animation: 'gradient 20s ease infinite' }
// };

// const SignIn = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [mounted, setMounted] = useState(false);
//   const navigate = useNavigate();
//   const { refreshCredits } = useCredits();

//   const slides = [
//     {
//       title: "100% Confidential",
//       description: "We'll never share your personal information with your employer"
//     },
//     {
//       title: "Anonymised Data",
//       description: "Employers only see overall company wellbeing metrics"
//     },
//     {
//       title: "Secured Data",
//       description: "Employers only see overall Growth and Progress"
//     }
//   ];

//   useEffect(() => {
//     setMounted(true);
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => {
//       clearInterval(interval);
//       setMounted(false);
//     };
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     const formData = new FormData(e.target);
//     try {
//       const res = await axios.post("https://ekaant.onrender.com/api/sign-in", formData, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         }
//       });

//       if (res.data.success) {
//         const { employee, token } = res.data;
//         localStorage.setItem("user", JSON.stringify(employee));
//         localStorage.setItem("token", token);
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         await refreshCredits();
//         window.dispatchEvent(new Event('chartDataUpdated'));
//         navigate("/analytics");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Sign-in failed! Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Section */}
//       <div 
//         className="w-2/5 flex flex-col relative overflow-hidden m-4 rounded-2xl"
//         style={{
//           background: 'linear-gradient(-45deg, #4171f5, #3451b2, #2196f3, #2979ff)',
//           backgroundSize: '300% 300%',
//           ...waveAnimationStyles.gradient
//         }}
//       >
//         <div className="absolute inset-0 grid grid-cols-12 grid-rows-16 gap-3 p-6 opacity-40">
//           {[...Array(192)].map((_, i) => (
//             <div
//               key={i}
//               className="rounded-lg backdrop-blur-sm"
//               style={{
//                 background: `rgba(255, 255, 255, ${0.1 + (i % 3) * 0.05})`,
//                 animation: `${i % 2 === 0 ? 'float' : 'scale'} ${3 + (i % 4)}s ease-in-out infinite`,
//                 animationDelay: `${i * 0.1}s`,
//                 transform: `rotate(${(i % 8) * 45}deg)`,
//                 height: i % 3 === 0 ? '100%' : i % 2 === 0 ? '75%' : '50%',
//                 width: i % 4 === 0 ? '100%' : i % 2 === 0 ? '80%' : '60%',
//                 '--rotation': `${(i % 4) * 90}deg`
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative z-10 flex flex-col h-full p-12">
//           <div className="flex-grow flex flex-col items-center justify-start pt-20">
//             <div className="flex items-center mb-12">
//               <img src="/logo-03.png" alt="Ekaant" className="h-16" />
//               <span className="text-white text-4xl font-bold ml-2">EKAANT</span>
//             </div>
//             <div className="text-white text-center mb-6">
//               <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
//               <p className="text-2xl">Sign in to continue your journey.</p>
//             </div>

//             <div className="text-white text-center mt-auto">
//               <div className="flex items-center justify-center gap-4 mb-6">
//                 <div className="bg-[#7C4DFF]/20 p-4 rounded-xl">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#B388FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <h2 className="text-4xl font-bold">{slides[currentSlide].title}</h2>
//               </div>
//               <p className="text-xl opacity-90">{slides[currentSlide].description}</p>
//             </div>

//             <div className="flex justify-center space-x-2 mt-12">
//               {slides.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`w-2 h-2 rounded-full transition-all ${
//                     currentSlide === index ? "bg-white w-8" : "bg-white/50"
//                   }`}
//                   onClick={() => setCurrentSlide(index)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="w-1/2 p-12 flex flex-col justify-center items-center">
//         <div className="w-full max-w-md">
//           <div className="flex items-center mb-12">
//             <img src="/logo-03.png" alt="Ekaant" className="h-16" />
//             <span className="text-4xl font-bold ml-2">EKAANT</span>
//           </div>

//           <div className="flex mb-8">
          
//             <Link 
//               to="/sign-in"
//               className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-all text-center"
//             >
//               Sign In
//             </Link>
//             <Link 
//               to="/sign-up"
//               className="flex-1 py-2 px-4 text-gray-600 rounded-l hover:bg-gray-100 transition-all text-center"
//             >
//               Sign Up
//             </Link>
//           </div>

//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="name@example.com"
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                 required
//               />
//             </div>
//             <div>
//               <div className="flex justify-between mb-2">
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
//                   Forgot Password?
//                 </Link>
//               </div>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="••••••••"
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full  bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
//             >
//               Sign In
//             </button>
//             <div className="text-center mt-4">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{" "}
//                 <Link to="/sign-up" className="text-blue-600 hover:underline">
//                   Sign Up
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>

//       <style>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes scale {
//           0% { transform: scale(1) rotate(var(--rotation, 0deg)); }
//           50% { transform: scale(1.1) rotate(var(--rotation, 180deg)); }
//           100% { transform: scale(1) rotate(var(--rotation, 360deg)); }
//         }
//         @keyframes float {
//           0% { transform: translateY(5px) rotate(var(--rotation, 10deg)); }
//           50% { transform: translateY(-10px) rotate(var(--rotation, 20deg)); }
//           100% { transform: translateY(10px) rotate(var(--rotation, 30deg)); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SignIn;
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCredits } from "../context/CreditsContext";

const waveAnimationStyles = {
  gradient: { animation: 'gradient 20s ease infinite' }
};

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "", showPassword: false });
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { refreshCredits } = useCredits();

  const slides = [
    {
      title: "100% Confidential",
      description: "We'll never share your personal information with your employer"
    },
    {
      title: "Anonymised Data",
      description: "Employers only see overall company wellbeing metrics"
    },
    {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    try {
      const res = await axios.post("https://ekaant.onrender.com/api/sign-in", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (res.data.success) {
        const { employee, token } = res.data;
        localStorage.setItem("user", JSON.stringify(employee));
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await refreshCredits();
        window.dispatchEvent(new Event('chartDataUpdated'));
        navigate("/analytics");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign-in failed! Please try again.");
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
              <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
              <p className="text-2xl">Sign in to continue your journey.</p>
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

      {/* Right Section */}
      <div className="w-1/2 p-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-12">
            <img src="/logo-03.png" alt="Ekaant" className="h-16" />
            <span className="text-4xl font-bold ml-2">EKAANT</span>
          </div>

          <div className="flex mb-8">
          
            <Link 
              to="/sign-in"
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-all text-center"
            >
              Sign In
            </Link>
            <Link 
              to="/sign-up"
              className="flex-1 py-2 px-4 text-gray-600 rounded-l hover:bg-gray-100 transition-all text-center"
            >
              Sign Up
            </Link>
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                >
                  {formData.showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full  bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
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

      <style>{`
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
      `}</style>
    </div>
  );
};

export default SignIn;