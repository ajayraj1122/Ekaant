
import { useState, useEffect } from "react";
import { Users as Team, MedalIcon, TrophyIcon, SheetIcon, CircleDashed, BarChart4Icon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LogOutPopup from "../pages/LogOut";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10
    });

    setParticles(Array.from({ length: 20 }, createParticle));

    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(1),
        createParticle()
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { name: "Analytics", icon: <BarChart4Icon size={30} />, link: "/analytics" },
    { name: "Program", icon: <SheetIcon size={30} />, link: "/program" },
    { name: "Serene AI", icon: <CircleDashed size={30} />, link: "/serene-ai" },
    { name: "Challenges", icon: <TrophyIcon size={30} />, link: "/challenges" },
    { name: "Expert", icon: <Team size={30} />, link: "/expert" },
    { name: "Group Coaching", icon: <MedalIcon size={30} />, link: "/group-coaching" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <motion.div 
      className="h-screen-full w-80 text-white flex flex-col shadow-xl p-4 relative overflow-hidden bg-gradient animate-gradient"
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <style>{`
        .bg-gradient {
          background: linear-gradient(
            45deg,
rgb(23, 5, 82),
rgb(47, 6, 91),
            #800080,
            #8B008B,
            #9400D3,
            #4B0082,
            #663399,
            #DA70D6
          );
          background-size: 400% 400%;
          animation: gradientShift 15s cubic-bezier(0.4, 0, 0.2, 1) infinite,
                     pulseGlow 8s ease-in-out infinite;
          position: relative;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulseGlow {
          0% { filter: brightness(1) saturate(1); }
          50% { filter: brightness(1.2) saturate(1.3); }
          100% { filter: brightness(1) saturate(1); }
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          pointer-events: none;
        }

        .particle-animation {
          animation: float linear infinite;
        }

        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-20px, -100px) rotate(360deg);
            opacity: 0;
          }
        }

        .menu-item {
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }

        .menu-item:hover {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle particle-animation"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}

      <div className="mb-6 text-center py-4">
        <img src="\logo-03.png" alt="EKAANT" className="h-20 mx-auto"/>
      </div>
      <div className="flex-2 bg-black/30 backdrop-blur-sm p-4 rounded-tr-[40px] rounded-tl-[40px] mt-6 py-4 px-4">
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={() => setActive(item.name)}
              className={`menu-item flex items-center p-3 rounded-lg cursor-pointer mb-2 transition-all duration-300 ${
                active === item.name 
                  ? "bg-white/20 text-white transform scale-105" 
                  : "hover:bg-white/10 hover:text-white hover:scale-105"
              }`}
            >
              {item.icon}
              <span className="ml-3 font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto">
        <button
          onClick={() => setShowLogoutPopup(true)}
          className="menu-item flex items-center p-4 w-full rounded-lg bg-black/20 hover:bg-white/10 transition-all duration-300 text-white hover:scale-105"
        >
          <LogOut size={30} />
          <span className="ml-5 font-medium">Logout</span>
        </button>
      </div>

      {showLogoutPopup && <LogOutPopup onClose={() => setShowLogoutPopup(false)} onConfirm={handleLogout} />}
    </motion.div>
  );
};

export default Sidebar;
