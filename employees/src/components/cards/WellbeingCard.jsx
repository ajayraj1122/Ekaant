// import { useEffect, useState } from "react";
// import { Card, Typography } from "@mui/material";
// import { motion } from "framer-motion";

// // Mock function to simulate fetching wellbeing data
// const fetchWellbeingData = async () => {
//   return {
//     wellbeingScore: 6,
//     wellbeing: [
//       { name: "Health", value: 6 },
//       { name: "Resilience", value: 8 },
//       { name: "Culture", value: 7 },
//     ],
//   };
// };

// const WellbeingCard = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [wellbeingData, setWellbeingData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("Fetching wellbeing data...");
//         const data = await fetchWellbeingData();
//         if (!data) throw new Error("No wellbeing data received");
//         setWellbeingData(data);
//       } catch (err) {
//         console.error("Error fetching wellbeing data:", err.message);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading wellbeing data...</p>;
//   if (error) return <p className="text-center text-red-500">❌ {error}</p>;
//   if (!wellbeingData) return <p className="text-center text-lg font-semibold">Loading wellbeing data...</p>;

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//       <Card className="p-35 shadow-lg rounded-lg">
//         <Typography variant="h6" className="text-center">Wellbeing Profile</Typography>
//         <div className="text-4xl font-bold text-purple-600 text-center py-4">{wellbeingData.wellbeingScore}</div>
//         <div className="space-y-4">
//           {wellbeingData.wellbeing.map((item) => (
//             <div key={item.name} className="flex items-center justify-between">
//               <span className="text-gray-700">{item.name}</span>
//               <div className="bg-gray-200 h-2 w-full mx-2 rounded-full">
//                 <div className="h-2 bg-purple-600 rounded-full" style={{ width: `${item.value * 10}%` }} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </motion.div>
//   );
// };

// export default WellbeingCard;
import { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Mock function to simulate fetching wellbeing data
const fetchWellbeingData = async () => {
  const userId = localStorage.getItem("userId");
  const savedData = localStorage.getItem(`wellbeing_${userId}`);
  return savedData ? JSON.parse(savedData) : {
    wellbeingScore: 6,
    wellbeing: [
      { name: "Health", value: 6 },
      { name: "Resilience", value: 8 },
      { name: "Culture", value: 7 },
    ],
  };
};

const WellbeingCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wellbeingData, setWellbeingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching wellbeing data...");
        const data = await fetchWellbeingData();
        if (!data) throw new Error("No wellbeing data received");
        setWellbeingData(data);
      } catch (err) {
        console.error("Error fetching wellbeing data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading wellbeing data...</p>;
  if (error) return <p className="text-center text-red-500">❌ {error}</p>;
  if (!wellbeingData) return <p className="text-center text-lg font-semibold">Loading wellbeing data...</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="p-35 shadow-lg rounded-lg">
        <Typography variant="h6" className="text-center">Wellbeing Profile</Typography>
        <div className="text-4xl font-bold text-purple-600 text-center py-4">{wellbeingData.wellbeingScore}</div>
        <div className="space-y-4">
          {wellbeingData.wellbeing.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <span className="text-gray-700">{item.name}</span>
              <div className="bg-gray-200 h-2 w-full mx-2 rounded-full">
                <div className="h-2 bg-purple-600 rounded-full" style={{ width: `${item.value * 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default WellbeingCard;