// import { useState, useEffect} from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Avatar,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Box,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import { useCredits } from "../context/CreditsContext";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const LiveSession = () => {
//   const [employeeEmail, setEmployeeEmail] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedStartTime, setSelectedStartTime] = useState("");
//   const [selectedEndTime, setSelectedEndTime] = useState("");
//   const [bookingInProgress, setBookingInProgress] = useState(new Set());
//   const [feedbackDialog, setFeedbackDialog] = useState(false);
//   const [userRating, setUserRating] = useState(5);
//   const [feedback, setFeedback] = useState("");
//   const [notification, setNotification] = useState({ open: false, message: "", type: "success" });
//   const [sessionStats, setSessionStats] = useState(() => {
//     const saved = localStorage.getItem("sessionStats");
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [bookedSessions, setBookedSessions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterTopic, setFilterTopic] = useState("all");
//   const [sortOption, setSortOption] = useState("default");
//   const [bookmarkedSessions, setBookmarkedSessions] = useState(() => {
//     const saved = localStorage.getItem("bookmarkedSessions");
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
//   const { credits, updateCredits } = useCredits(); 

//   useEffect(() => {
//     if (employeeEmail) {
//       const saved = localStorage.getItem(`bookedSessions_${employeeEmail}`);
//       setBookedSessions(saved ? JSON.parse(saved) : []);
//     }
//   }, [employeeEmail]);

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("❌ No authentication token found");
//           setNotification({
//             open: true,
//             message: "Please log in to access sessions",
//             type: "error"
//           });
//           return;
//         }

//         setIsLoading(true);
//         const response = await axios.get("http://localhost:3000/api/employee/profile", {
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.data?.employee) {
//           throw new Error('No employee data found in response');
//         }

//         console.log("✅ Fetched Employee Data:", response.data);
//         setEmployeeEmail(response.data.employee.email);

//         const sessionsResponse = await axios.get(
//           `http://localhost:3000/api/live-sessions/${response.data.employee.email}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           }
//         );

//         if (sessionsResponse.data.success) {
//           setBookedSessions(sessionsResponse.data.sessions);
//         }

//       } catch (error) {
//         console.error("❌ Error fetching employee data:", error);
//         setNotification({
//           open: true,
//           message: "Failed to fetch your profile. Please try logging in again.",
//           type: "error"
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchEmployeeData();
//   }, []);

//   const sessions = [
//     {
//       id: 61,
//       title: "Prevent Burnout",
//       credits: 100,
//       image: "https://recruitment.growmo.re/wp-content/uploads/2022/09/7-how-to-prevent-burnout.jpg",
//       expert: {
//         name: "Dr. Kuldeep Singh",
//         photo: "https://tse4.mm.bing.net/th?id=OIP.VFVFnOHFUcnYKkiE58CIIQHaHa&pid=Api&P=0&h=180",
//         specialization: "Expert in stress and Anxiety",
//         rating: 4.8,
//         sessions: 520,
//         mail: "mansi.91289@gmail.com",
//         availability: [
//           {
//             date: "2025-05-15",
//             slots: [
//               { start: "2:00 PM", end: "3:00 PM" },
//               { start: "4:00 PM", end: "5:00 PM" }
//             ]
//           },
//           {
//             date: "2025-04-16",
//             slots: [
//               { start: "10:00 AM", end: "11:00 AM" },
//               { start: "3:00 PM", end: "4:00 PM" }
//             ]
//           }
//         ]
//       },
//       description: "Learn effective techniques to manage workplace stress and prevent burnout.",
//       topics: ["Stress Management", "Work-Life Balance", "Mental Well-being"],
//     },
//         {
//         id: 14,
//         title: "Manage Your Stress",
//         credits: 100,
//         image: "https://tse3.mm.bing.net/th?id=OIP.7iFU_lcul3qC31HHEHbEdgHaHa&pid=Api&P=0&h=180",
//         expert: {
//           name: "Mahira Khan",
//           photo: "https://i2.wp.com/www.americanbazaaronline.com/wp-content/uploads/2014/12/Mahira-Khan.jpg",
//           specialization: "Expert in Sleep Quality",
//           rating: 4.9,
//           sessions: 480,
//           mail: "mansi.91289@gmail.com",
//           availability: [
//             {
//               date: "2025-04-16",
//               slots: [
//                 { start: "10:00 AM", end: "11:00 AM" },
//                 { start: "2:00 PM", end: "3:00 PM" },
//                 { start: "5:00 PM", end: "6:00 PM" },
//               ],
//             },
//             {
//               date: "2025-04-17",
//               slots: [
//                 { start: "11:00 AM", end: "12:00 PM" },
//                 { start: "3:00 PM", end: "4:00 PM" },
//               ],
//             },
//           ],
//         },
//         description: "Expert guidance on managing daily stress and improving mental health.",
//         topics: ["Sleep Quality", "Stress Relief", "Mental Health"],
//       },

//     {
//       id: 34,
//       title: "Mindful Meditation",
//       credits: 100,
//       image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
//       expert: {
//         name: "Sarah Johnson",
//         photo: "https://randomuser.me/api/portraits/women/44.jpg",
//         specialization: "Meditation Coach",
//         rating: 4.9,
//         sessions: 650,
//         mail: "mansi.91289@gmail.com",
//         availability: [
//           {
//             date: "2025-04-15",
//             slots: [
//               { start: "2:00 PM", end: "3:00 PM" },
//               { start: "4:00 PM", end: "5:00 PM" }
//             ]
//           },
//           {
//             date: "2025-04-16",
//             slots: [
//               { start: "10:00 AM", end: "11:00 AM" },
//               { start: "3:00 PM", end: "4:00 PM" }
//             ]
//           }
//         ]
//       },
//       description: "Learn mindfulness techniques for better focus and inner peace.",
//       topics: ["Meditation", "Mindfulness", "Stress Relief"],
//     },
//     {
//       id: 46,
//       title: "Career Growth Strategy",
//       credits: 100,
//       image: "https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg",
//       expert: {
//         name: "Robert Chen",
//         photo: "https://randomuser.me/api/portraits/men/32.jpg",
//         specialization: "Career Coach",
//         rating: 4.7,
//         sessions: 320,
//         mail: "ajayguptap8210p@gmail.com",
//         availability: [
//           {
//             date: "2024-04-26",
//             slots: [
//               { start: "10:00 AM", end: "11:00 AM" },
//               { start: "1:00 PM", end: "2:00 PM" },
//               { start: "4:00 PM", end: "5:00 PM" },
//             ],
//           },
//         ],
//       },
//       description: "Strategic planning for career advancement and professional growth.",
//       topics: ["Career Development", "Leadership", "Professional Growth"],
//     },
//     {
//       id: 57,
//       title: "Emotional Intelligence",
//       credits: 100,
//       image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
//       expert: {
//         name: "Dr. Emily White",
//         photo: "https://randomuser.me/api/portraits/women/68.jpg",
//         specialization: "EQ Expert",
//         rating: 4.8,
//         sessions: 430,
//         mail: "ajayguptap8210p@gmail.com",
//         availability: [
//           {
//             date: "2024-03-25",
//             slots: [
//               { start: "10:00 AM", end: "11:00 AM" },
//               { start: "2:00 PM", end: "3:00 PM" },
//               { start: "4:00 PM", end: "5:00 PM" },
//             ],
//           },
//         ],
//       },
//       description: "Develop emotional intelligence for better relationships and leadership.",
//       topics: ["Emotional Intelligence", "Communication", "Personal Development"],
//     },
//     {
//       id: 16,
//       title: "Emote",
//       credits: 100,
//       image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
//       expert: {
//         name: "Dr. Emily White",
//         photo: "https://randomuser.me/api/portraits/women/68.jpg",
//         specialization: "EQ Expert",
//         rating: 4.8,
//         sessions: 430,
//         mail: "ajayguptap8210p@gmail.com",
//         availability: [
//           {
//             date: "2024-03-25",
//             slots: [
//               { start: "10:00 AM", end: "11:00 AM" },
//               { start: "2:00 PM", end: "3:00 PM" },
//               { start: "4:00 PM", end: "5:00 PM" },
//             ],
//           },
//         ],
//       },
//       description: "Develop emotional intelligence for better relationships and leadership.",
//       topics: ["Emotional Intelligence", "Communication", "Personal Development"],
//     },
//     {
//       id: 7,
//       title: "Intelligence",
//       credits: 100,
//       image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
//       expert: {
//         name: "Dr. Emily White",
//         photo: "https://randomuser.me/api/portraits/women/68.jpg",
//         specialization: "EQ Expert",
//         rating: 4.8,
//         sessions: 430,
//         mail: "ajayguptap8210p@gmail.com",
//         availability: [
//           {
//             date: "2024-06-25",
//             slots: [
//               { start: "10:00 AM", end: "11:00 AM" },
//               { start: "2:00 PM", end: "3:00 PM" },
//               { start: "5:00 PM", end: "6:00 PM" },
//             ],
//           },
//         ],
//       },
//       description: "Develop emotional intelligence for better relationships and leadership.",
//       topics: ["Emotional Intelligence", "Communication", "Personal Development"],
//     },
//     {
//       id: 8,
//       title: "Emotion",
//       credits: 100,
//       image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
//       expert: {
//         name: "Dr. Emily White",
//         photo: "https://randomuser.me/api/portraits/women/68.jpg",
//         specialization: "EQ Expert",
//         rating: 4.8,
//         sessions: 430,
//         mail: "ajayguptap8210p@gmail.com",
//         availability: [
//           {
//             date: "2024-04-25",
//             slots: [
//               { start: "10:00 AM", end: "11:00 AM" },
//               { start: "1:00 PM", end: "2:00 PM" },
//               { start: "3:00 PM", end: "4:00 PM" },
//             ],
//           },
//         ],
//       },
//       description: "Develop emotional intelligence for better relationships and leadership.",
//       topics: ["Emotional Intelligence", "Communication", "Personal Development"],
//     },
//   ];

//   const confirmBooking = async () => {
//     if (!selectedSession) {
//       setNotification({
//         open: true,
//         message: "No session selected!",
//         type: "error"
//       });
//       return;
//     }

//     if (!selectedDate || !selectedStartTime || !selectedEndTime) {
//       setNotification({
//         open: true,
//         message: "Please select date and time",
//         type: "error"
//       });
//       return;
//     }

//     if (credits < selectedSession.credits) {
//       setNotification({
//         open: true,
//         message: "Insufficient credits for this session",
//         type: "error"
//       });
//       return;
//     }

//     try {
//       if (bookingInProgress.has(selectedSession.id)) {
//         return;
//       }

//       setBookingInProgress(prev => new Set([...prev, selectedSession.id]));

//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:3000/api/live-sessions/book",
//         {
//           employeeEmail,
//           expertEmail: selectedSession.expert.mail,
//           expertName: selectedSession.expert.name,
//           sessionDate: selectedDate,
//           specialization: selectedSession.expert.specialization,
//           startTime: selectedStartTime,
//           endTime: selectedEndTime,
//           credits: selectedSession.credits
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.success) {
//         // Update credits using context
//         await updateCredits(selectedSession.credits, 'subtract');
//         console.log("✅ Credits deducted successfully");

//         // Update booked sessions
//         const updatedBookings = [...bookedSessions, response.data.sessionDetails];
//         setBookedSessions(updatedBookings);
//         localStorage.setItem(`bookedSessions_${employeeEmail}`, JSON.stringify(updatedBookings));

//         // Update bar chart data in MongoDB
//         const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
//         try {
//           const token = localStorage.getItem("token");
//           if (!token) {
//             throw new Error('No authentication token found');
//           }

//           const response = await fetch('http://localhost:3000/api/barchart/update', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               month: currentMonth,
//               category: 'LiveSessions',
//               operation: 'increase'
//             })
//           });

//           if (!response.ok) {
//             throw new Error('Failed to update bar chart data');
//           }

//           // Refresh chart data
//           window.dispatchEvent(new Event('chartDataUpdated'));
//         } catch (error) {
//           console.error('❌ Failed to update bar chart:', error.message);
//         }

//         // Update LineChart data with session duration
//         const startTime = selectedStartTime.replace(' AM', '').replace(' PM', '');
//         const endTime = selectedEndTime.replace(' AM', '').replace(' PM', '');
//         const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
//         const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
//         const durationMinutes = endMinutes - startMinutes;

//         // Update MongoDB LineChart
//         try {
//           const token = localStorage.getItem("token");
//           await fetch('http://localhost:3000/api/linechart/update', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               month: currentMonth,
//               category: 'livesessions',
//               duration: durationMinutes,
//               operation: 'increase'
//             })
//           });
//         } catch (error) {
//           console.error('Failed to update line chart:', error);
//         }

//         setNotification({
//           open: true,
//           message: "✅ Session booked successfully! Check your email for details.",
//           type: "success"
//         });
//         setOpenDialog(false);
//       }
//     } catch (error) {
//       console.error("❌ Booking Error:", error);
//       setNotification({
//         open: true,
//         message: error.response?.data?.message || "Failed to book session",
//         type: "error"
//       });
//     } finally {
//       setBookingInProgress(prev => {
//         const next = new Set(prev);
//         next.delete(selectedSession.id);
//         return next;
//       });
//     }
//   };

//   const handleBookSession = (session) => {
//     if (!employeeEmail) {
//       setNotification({
//         open: true,
//         message: "Please log in to book sessions",
//         type: "error"
//       });
//       return;
//     }
//     setSelectedSession(session);
//     setSelectedDate(null);
//     setSelectedStartTime("");
//     setSelectedEndTime("");
//     setOpenDialog(true);
//   };

//   const toggleBookmark = (sessionId) => {
//     const isBookmarked = bookmarkedSessions.includes(sessionId);
//     let updatedBookmarks;

//     if (isBookmarked) {
//       updatedBookmarks = bookmarkedSessions.filter(id => id !== sessionId);
//     } else {
//       updatedBookmarks = [...bookmarkedSessions, sessionId];
//     }

//     setBookmarkedSessions(updatedBookmarks);
//     localStorage.setItem("bookmarkedSessions", JSON.stringify(updatedBookmarks));

//     setNotification({
//       open: true,
//       message: isBookmarked ? "Session removed from bookmarks" : "Session bookmarked for later",
//       type: "success",
//     });
//   };

//   const allTopics = [...new Set(sessions.flatMap((session) => session.topics))];

//   let filteredSessions = sessions.filter((session) => {
//     const matchesSearch =
//       session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       session.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesTopic = filterTopic === "all" || session.topics.includes(filterTopic);
//     const matchesBookmarkFilter = showBookmarksOnly ? bookmarkedSessions.includes(session.id) : true;
//     return matchesSearch && matchesTopic && matchesBookmarkFilter;
//   });

//   if (sortOption === "priceAsc") {
//     filteredSessions = [...filteredSessions].sort((a, b) => a.credits - b.credits);
//   } else if (sortOption === "priceDesc") {
//     filteredSessions = [...filteredSessions].sort((a, b) => b.credits - a.credits);
//   } else if (sortOption === "rating") {
//     filteredSessions = [...filteredSessions].sort((a, b) => {
//       const aRating = sessionStats[a.id]?.ratings.length > 0
//         ? sessionStats[a.id].ratings.reduce((acc, val) => acc + val, 0) / sessionStats[a.id].ratings.length
//         : a.expert.rating;
//       const bRating = sessionStats[b.id]?.ratings.length > 0
//         ? sessionStats[b.id].ratings.reduce((acc, val) => acc + val, 0) / sessionStats[b.id].ratings.length
//         : b.expert.rating;
//       return bRating - aRating;
//     });
//   } else if (sortOption === "sessions") {
//     filteredSessions = [...filteredSessions].sort((a, b) => {
//       const aSessions = (sessionStats[a.id]?.totalSessions || 0) + a.expert.sessions;
//       const bSessions = (sessionStats[b.id]?.totalSessions || 0) + b.expert.sessions;
//       return bSessions - aSessions;
//     });
//   }

//   const handleCancelBooking = async (sessionId) => {
//     try {
//       setIsLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setNotification({
//           open: true,
//           message: "Authentication required. Please log in again.",
//           type: "error"
//         });
//         return;
//       }

//       const booking = bookedSessions.find(session => session._id === sessionId);
//       if (!booking) {
//         setNotification({
//           open: true,
//           message: "Booking not found",
//           type: "error"
//         });
//         return;
//       }

//       // Validate cancellation timing
//       const sessionDateTime = new Date(`${booking.sessionDate}T${booking.startTime}`);
//       const now = new Date();
//       if (sessionDateTime < now) {
//         setNotification({
//           open: true,
//           message: "Cannot cancel past sessions",
//           type: "error"
//         });
//         return;
//       }

//       const response = await axios.post(
//         `http://localhost:3000/api/live-sessions/${employeeEmail}/cancel/${sessionId}`,
//         { 
//           expertEmail: booking.expertEmail,
//           expertName: booking.expertName,
//           sessionDate: booking.sessionDate,
//           startTime: booking.startTime,
//           reason: 'Cancelled by employee'
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.success) {
//           try {
//             await updateCredits(booking.credits, 'add');
//             console.log("✅ Credits refunded successfully");

//             const updatedSessions = bookedSessions.filter(session => session._id !== sessionId);
//             setBookedSessions(updatedSessions);
//             localStorage.setItem(`bookedSessions_${employeeEmail}`, JSON.stringify(updatedSessions));

//             // Update bar chart data in MongoDB for cancellation
//             const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
//             try {
//               const token = localStorage.getItem("token");
//               if (!token) {
//                 throw new Error('No authentication token found');
//               }

//               const response = await fetch('http://localhost:3000/api/barchart/update', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                   month: currentMonth,
//                   category: 'LiveSessions',
//                   operation: 'decrease',
//                   value: -1
//                 })
//               });

//               if (!response.ok) {
//                 throw new Error('Failed to update bar chart data');
//               }

//               // Refresh chart data
//               window.dispatchEvent(new Event('chartDataUpdated'));
//             } catch (error) {
//               console.error('❌ Failed to update bar chart:', error.message);
//             }

//             // Update MongoDB LineChart
//             const startTime = booking.startTime.replace(' AM', '').replace(' PM', '');
//             const endTime = booking.endTime.replace(' AM', '').replace(' PM', '');
//             const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
//             const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
//             const durationMinutes = endMinutes - startMinutes;

//             try {
//               const token = localStorage.getItem("token");
//               await fetch('http://localhost:3000/api/linechart/update', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                   month: currentMonth,
//                   category: 'livesessions',
//                   duration: durationMinutes,
//                   operation: 'decrease'
//                 })
//               });
//             } catch (error) {
//               console.error('Failed to update line chart:', error);
//             }

//             // Dispatch events to update UI
//             window.dispatchEvent(new Event('chartDataUpdated'));
//             window.dispatchEvent(new Event('viewDataUpdated'));

//             setNotification({
//               open: true,
//               message: "Booking cancelled successfully",
//               type: "success"
//             });
//           } catch (error) {
//             console.error("Failed to refund credits:", error);
//             setNotification({
//               open: true,
//               message: "Failed to refund credits",
//               type: "error"
//             });
//           }
//         }
//     } catch (error) {
//       console.error("Error cancelling booking:", error);
//       setNotification({
//         open: true,
//         message: error.response?.data?.message || "Failed to cancel booking",
//         type: "error"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   const submitFeedback = () => {
//     if (!userRating || !feedback.trim()) {
//       setNotification({
//         open: true,
//         message: "Please provide a rating and feedback.",
//         type: "error",
//       });
//       return;
//     }

//     if (selectedSession) {
//       const sessionId = selectedSession.id;
//       const currentStats = sessionStats[sessionId] || { ratings: [], totalSessions: 0 };

//       const updatedStats = {
//         ...currentStats,
//         ratings: [...currentStats.ratings, userRating],
//         totalSessions: currentStats.totalSessions + 1,
//       };

//       const newSessionStats = {
//         ...sessionStats,
//         [sessionId]: updatedStats,
//       };

//       setSessionStats(newSessionStats);
//       localStorage.setItem("sessionStats", JSON.stringify(newSessionStats));

//       setFeedbackDialog(false);
//       setNotification({
//         open: true,
//         message: "Thank you for your feedback!",
//         type: "success",
//       });
//     }
//   };

//   const handleBooking = async () => {
//     if (!selectedSession || !selectedDate || !selectedStartTime || !selectedEndTime) {
//       setNotification({
//         open: true,
//         message: "Please select session, date and time slot",
//         type: "error"
//       });
//       return;
//     }

//     // Validate date and time
//     const now = new Date();
//     const selectedDateTime = new Date(`${selectedDate}T${selectedStartTime}`);
//     const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const selectedDay = new Date(selectedDate);

//     // Check if selected date is in the past
//     if (selectedDay < startOfToday) {
//       setNotification({
//         open: true,
//         message: "Cannot select past dates",
//         type: "error"
//       });
//       return;
//     }

//     // If same day, check if time is in the past
//     if (selectedDay.getTime() === startOfToday.getTime()) {
//       const currentTime = now.getHours() * 60 + now.getMinutes();
//       const selectedTime = parseInt(selectedStartTime.split(':')[0]) * 60 + parseInt(selectedStartTime.split(':')[1]);

//       if (selectedTime <= currentTime) {
//         setNotification({
//           open: true,
//           message: "Cannot book slots from past time",
//           type: "error"
//         });
//         return;
//       }
//     }

//     // Add buffer time for immediate bookings
//     const bufferTime = new Date(now.getTime() + 15 * 60000); // 15 minutes buffer
//     if (selectedDateTime < bufferTime) {
//       setNotification({
//         open: true,
//         message: "Please book sessions at least 15 minutes in advance",
//         type: "error"
//       });
//       return;
//     }

//     if (credits < selectedSession.credits) {
//       setNotification({
//         open: true,
//         message: `Insufficient credits. Need ${selectedSession.credits} credits.`,
//         type: "error"
//       });
//       return;
//     }

//     try {
//       setIsLoading(true);
//       await updateCredits(selectedSession.credits, 'subtract');

//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:3000/api/live-sessions/book",
//         {
//           employeeEmail,
//           expertEmail: selectedSession.expert.mail,
//           expertName: selectedSession.expert.name,
//           specialization: selectedSession.expert.specialization,
//           sessionDate: selectedDate,
//           startTime: selectedStartTime,
//           endTime: selectedEndTime,
//           credits: selectedSession.credits
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.success) {
//         const updatedSessions = [...bookedSessions, response.data.session];
//         setBookedSessions(updatedSessions);
//         localStorage.setItem(`bookedSessions_${employeeEmail}`, JSON.stringify(updatedSessions));

//         // Update bar chart data in MongoDB
//         const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
//         try {
//           const token = localStorage.getItem("token");
//           if (!token) {
//             throw new Error('No authentication token found');
//           }

//           const response = await fetch('http://localhost:3000/api/barchart/update', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               month: currentMonth,
//               category: 'LiveSessions',
//               operation: 'increase'
//             })
//           });

//           if (!response.ok) {
//             throw new Error('Failed to update bar chart data');
//           }

//           // Refresh chart data
//           window.dispatchEvent(new Event('chartDataUpdated'));
//         } catch (error) {
//           console.error('❌ Failed to update bar chart:', error.message);
//         }

//         // Update LineChart data with session duration
//         const startTime = selectedStartTime.replace(' AM', '').replace(' PM', '');
//         const endTime = selectedEndTime.replace(' AM', '').replace(' PM', '');
//         const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
//         const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
//         const durationMinutes = endMinutes - startMinutes;

//         // Update MongoDB LineChart
//         try {
//           const token = localStorage.getItem("token");
//           await fetch('http://localhost:3000/api/linechart/update', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               month: currentMonth,
//               category: 'livesessions',
//               duration: durationMinutes,
//               operation: 'increase'
//             })
//           });
//         } catch (error) {
//           console.error('Failed to update line chart:', error);
//         }

//         // Create notification
//         try {
//           const token = localStorage.getItem("token");
//           const notificationData = {
//             title: "Live Session Booked",
//             date: selectedDate,
//             time: selectedStartTime,
//             duration: `${durationMinutes} minutes`,
//             price: `${selectedSession.credits} credits`,
//             doctorName: selectedSession.expert.name,
//             doctorSpecialty: selectedSession.expert.specialization,
//             sessionDate: new Date(selectedDate),
//             type: 'live'
//           };

//           await axios.post(
//             "http://localhost:3000/api/notifications",
//             notificationData,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//               }
//             }
//           );

//           // Dispatch events to update UI
//           window.dispatchEvent(new Event('chartDataUpdated'));
//           window.dispatchEvent(new Event('viewDataUpdated'));
//           window.dispatchEvent(new Event('notificationCreated'));
//         } catch (error) {
//           console.error("Error creating notification:", error);
//         }

//         setNotification({
//           open: true,
//           message: "Session booked successfully!",
//           type: "success"
//         });

//         setOpenDialog(false);
//       }
//     } catch (error) {
//       console.error("Error booking session:", error);
//       setNotification({
//         open: true,
//         message: error.response?.data?.message || "Failed to book session",
//         type: "error"
//       });

//       // Refund credits if booking failed
//       try {
//         await updateCredits(selectedSession.credits, 'add');
//       } catch (refundError) {
//         console.error("Failed to refund credits:", refundError);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isBookedForSelectedSlot = selectedSession && selectedDate && selectedStartTime    ? bookedSessions.filter(booking => booking).some(
//         (booking) =>
//           booking.expertEmail === selectedSession.expert.mail &&
//           booking.sessionDate === selectedDate &&
//           booking.startTime === selectedStartTime &&
//           booking.status !== "cancelled"
//       )
//     : false;

//   return (
//     <div className="p-6">
//       <Typography variant="h4" gutterBottom>
//         Live Sessions
//       </Typography>

//       <Box sx={{ mb: 4, display: "flex", flexDirection: {xs: "column", md: "row"}, gap: 2 }}>
//         <TextField
//           label="Search sessions"
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ flexGrow: 1 }}
//         />
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//           <FormControl sx={{ minWidth: 150 }}>
//             <InputLabel>Filter by Topic</InputLabel>
//             <Select
//               value={filterTopic}
//               onChange={(e) => setFilterTopic(e.target.value)}
//               label="Filter by Topic"
//             >
//               <MenuItem value="all">All Topics</MenuItem>
//               {allTopics.map((topic) => (
//                 <MenuItem key={topic} value={topic}>
//                   {topic}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl sx={{ minWidth: 150 }}>
//             <InputLabel>Sort By</InputLabel>
//             <Select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               label="Sort By"
//             >
//               <MenuItem value="default">Default</MenuItem>
//               <MenuItem value="rating">Highest Rated</MenuItem>
//               <MenuItem value="sessions">Most Popular</MenuItem>
//             </Select>
//           </FormControl>

//           <Button 
//             variant={showBookmarksOnly ? "contained" : "outlined"}
//             color="primary"
//             onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
//             startIcon={<span role="img" aria-label="bookmark">🔖</span>}
//           >
//             {showBookmarksOnly ? "All Sessions" : "Bookmarks Only"}
//           </Button>
//         </Box>
//       </Box>

//       <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
//         Showing {filteredSessions.length} of {sessions.length} sessions
//         {showBookmarksOnly && ` (Bookmarked: ${bookmarkedSessions.length})`}
//       </Typography>

//       <Grid container spacing={4}>
//         {isLoading ? (
//           Array.from(new Array(4)).map((_, index) => (
//             <Grid item xs={12} md={6} key={`skeleton-${index}`}>
//               <Card sx={{ height: '100%' }}>
//                 <CardContent>
//                   <Box sx={{ width: '100%', height: 200, bgcolor: 'grey.300', borderRadius: 1 }} />
//                   <Box sx={{ mt: 2, mb: 1, height: 32, width: '60%', bgcolor: 'grey.300', borderRadius: 1 }} />
//                   <Box sx={{ height: 24, width: '30%', bgcolor: 'grey.300', borderRadius: 1, mb: 2 }} />
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                     <Box sx={{ width: 64, height: 64, bgcolor: 'grey.300', borderRadius: '50%' }} />
//                     <Box sx={{ ml: 2 }}>
//                       <Box sx={{ height: 20, width: 120, bgcolor: 'grey.300', borderRadius: 1, mb: 1 }} />
//                       <Box sx={{ height: 16, width: 150, bgcolor: 'grey.300', borderRadius: 1 }} />
//                     </Box>
//                   </Box>
//                   <Box sx={{ height: 40, width: '100%', bgcolor: 'grey.300', borderRadius: 1, mt: 3 }} />
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : filteredSessions.length === 0 ? (
//           <Grid item xs={12}>
//             <Typography variant="h6" align="center" sx={{ my: 4 }}>
//               No sessions found. Try adjusting your filters.
//             </Typography>
//           </Grid>
//         ) : (
//           filteredSessions.map((session) => {
//             const isBookedForAnySlot = bookedSessions && bookedSessions.some(booking => booking && booking._id && booking.expertEmail === session.expert.mail);            return (
//               <Grid item xs={12} md={6} key={session.id}>
//                 <motion.div
//                   whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <Card>
//                     <CardContent>
//                       <img
//                         src={session.image}
//                         alt={session.title}
//                         style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
//                       />

//                       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 1 }}>
//                         <Typography variant="h5">
//                           {session.title}
//                         </Typography>
//                         <IconButton 
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleBookmark(session.id);
//                           }}
//                           color={bookmarkedSessions.includes(session.id) ? "primary" : "default"}
//                         >
//                           {bookmarkedSessions.includes(session.id) ? "★" : "☆"}
//                         </IconButton>
//                       </Box>

//                       <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
//                         <Chip
//                           label={`${session.credits} credits`}
//                           color="primary"
//                           size="small"
//                         />

//                       </Box>

//                       <div className="flex items-center gap-4 mb-4">
//                         <Avatar src={session.expert.photo} sx={{ width: 64, height: 64 }} />
//                         <div>
//                           <Typography variant="h6">{session.expert.name}</Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             {session.expert.specialization}
//                           </Typography>
//                           <div className="flex items-center gap-2">
//                             <Chip                              label={`${
//                                 sessionStats[session.id]?.ratings.length > 0
//                                   ? (
//                                       sessionStats[session.id].ratings.reduce((a, b) => a + b, 0) /
//                                       sessionStats[session.id].ratings.length
//                                     ).toFixed(1)
//                                   : session.expert.rating
//                               } ★`}
//                               size="small"
//                               color="primary"
//                             />
//                             <Chip
//                               label={`${
//                                 (sessionStats[session.id]?.totalSessions || 0) + session.expert.sessions
//                               }+ sessions`}
//                               size="small"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <Typography variant="body2" sx={{ mb: 2 }}>
//                         {session.description}
//                       </Typography>

//                       <div className="flex gap-2 mb-4 flex-wrap">
//                         {session.topics.map((topic, index) => (
//                           <Chip key={index} label={topic} size="small" />
//                         ))}
//                       </div>

//                       <Box sx={{ width: '100%' }}>

//                         <Button
//                           variant="contained"
//                           color={isBookedForAnySlot ? "primary" : "primary"}
//                           fullWidth
//                           onClick={() => handleBookSession(session)}
//                           disabled={bookingInProgress.has(session.id)}
//                           sx={{
//                             mt: 2,
//                             opacity: isBookedForAnySlot ? 0.8 : 1,
//                             cursor: bookingInProgress.has(session.id) ? 'not-allowed' : 'pointer',
//                             '&.Mui-disabled': {
//                               backgroundColor: bookingInProgress.has(session.id) ? '#9e9e9e' : undefined,
//                               color: 'white',
//                               opacity: 1
//                             }
//                           }}
//                         >
//                           {bookingInProgress.has(session.id) ? (
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                               <CircularProgress size={20} color="inherit" />
//                               <span>Booking...</span>
//                             </Box>
//                           ) : (
//                             "BOOK LIVE SESSION"
//                           )}
//                         </Button>
//                       </Box>

//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </Grid>
//             )
//           })
//         )}
//       </Grid>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
//         <div className="flex flex-col md:flex-row relative">
//           <IconButton 
//             onClick={() => setOpenDialog(false)}
//             sx={{ 
//               position: 'absolute', 
//               right: 8, 
//               top: 8,
//               zIndex: 1
//             }}
//           >
//             ✕
//           </IconButton>
//           {/* Left side - Expert info */}
//           <div className="md:w-2/5 bg-indigo-700 text-white p-6 flex flex-col items-center justify-center relative">
//             {selectedSession && (
//               <>
//                 <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white mb-4 shadow-lg">
//                   <img 
//                     src={selectedSession.expert.photo} 
//                     alt={selectedSession.expert.name} 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <h2 className="text-2xl font-bold mb-1 text-center">{selectedSession.expert.name}</h2>
//                 <span className="inline-block bg-white text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
//                   {selectedSession.expert.specialization}
//                 </span>

//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <span 
//                       key={i} 
//                       className={`text-2xl ${i < Math.floor(selectedSession.expert.rating) ? "text-yellow-300" : "text-gray-400"}`}
//                     >
//                       ★
//                     </span>
//                   ))}
//                   <span className="ml-2">{selectedSession.expert.rating}</span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 w-full">
//                   <div className="bg-indigo-600 rounded-lg p-3 text-center">
//                     <span className="block text-xs text-indigo-200">Experience</span>
//                     <span className="font-bold text-lg">10 Years</span>
//                   </div>
//                   <div className="bg-indigo-600 rounded-lg p-3 text-center">
//                     <span className="block text-xs text-indigo-200">Sessions</span>
//                     <span className="font-bold text-lg">{selectedSession.expert.sessions}+</span>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Right side - Booking details */}
//           <div className="md:w-3/5 p-6">
//             <Typography variant="h5" gutterBottom>
//               {selectedSession?.title}
//             </Typography>

//             {/* Show booked sessions in dialog */}
//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h6" gutterBottom className="flex items-center">
//                 <span role="img" aria-label="calendar" className="mr-2">📅</span>
//                 Booked Sessions
//               </Typography>
//               <Paper elevation={0} sx={{ 
//                 bgcolor: '#f8f9fa', 
//                 p: 2, 
//                 borderRadius: 2,
//                 maxHeight: '300px',
//                 overflowY: 'auto',
//                 '&::-webkit-scrollbar': {
//                   width: '8px'
//                 },
//                 '&::-webkit-scrollbar-track': {
//                   backgroundColor: '#f1f1f1',
//                   borderRadius: '4px'
//                 },
//                 '&::-webkit-scrollbar-thumb': {
//                   backgroundColor: '#888',
//                   borderRadius: '4px',
//                   '&:hover': {
//                     backgroundColor: '#555'
//                   }
//                 }
//               }}>
//                 {bookedSessions
//                   .filter(booking => 
//                     booking && 
//                     booking.expertEmail === selectedSession?.expert.mail &&
//                     booking.expertName === selectedSession?.expert.name &&
//                     booking.status === 'booked' &&
//                     !booking.cancelledAt &&
//                     new Date(`${booking.sessionDate} ${booking.startTime}`) > new Date()
//                   )
//                   .map((booking, idx) => (
//                     <Box 
//                       key={idx} 
//                       sx={{ 
//                         mb: 2, 
//                         p: 2, 
//                         bgcolor: 'white', 
//                         borderRadius: 1,
//                         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//                       }}
//                     >
//                       <Box sx={{ 
//                         display: 'flex', 
//                         justifyContent: 'space-between', 
//                         alignItems: 'center',
//                         mb: 1 
//                       }}>
//                         <Box>
//                           <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1a237e' }}>
//                             {new Date(booking.sessionDate).toLocaleDateString('en-US', {
//                               weekday: 'short',
//                               month: 'short',
//                               day: 'numeric'
//                             })}
//                           </Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             {booking.startTime} - {booking.endTime}
//                           </Typography>
//                         </Box>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           size="small"
//                           onClick={() => handleCancelBooking(booking._id)}
//                           startIcon={<span>🗑️</span>}
//                         >
//                           Cancel
//                         </Button>
//                       </Box>
//                     </Box>
//                   ))}
//                 {!bookedSessions.some(booking => 
//                   booking && 
//                   booking.expertEmail === selectedSession?.expert.mail &&
//                   booking.expertName === selectedSession?.expert.name &&
//                   booking.status === 'booked' &&
//                   !booking.cancelledAt &&
//                   new Date(`${booking.sessionDate} ${booking.startTime}`) > new Date()
//                 ) && (
//                   <Box sx={{ 
//                     textAlign: 'center', 
//                     py: 3,
//                     color: 'text.secondary'
//                   }}>
//                     <Typography variant="body1" sx={{ mb: 1 }}>
//                       No session booked, yet!
//                     </Typography>
//                     <Typography variant="body2">
//                       Select a date and time below to book your first session
//                     </Typography>
//                   </Box>
//                 )}
//               </Paper>
//             </Box>

//             {/* Date and Time Selection */}
//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h6" gutterBottom>
//                 Book an Appointment
//               </Typography>

//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" sx={{ mb: 1 }}>Select a date:</Typography>
//                 <DatePicker
//                   selected={selectedDate ? new Date(selectedDate) : null}
//                   onChange={(date) => setSelectedDate(date.toISOString().split('T')[0])}
//                   includeDates={selectedSession?.expert.availability.map(date => new Date(date.date))}
//                   minDate={new Date()}
//                   dateFormat="MMMM d, yyyy"
//                   className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//                   placeholderText="Click to select a date"
//                 />
//               </Box>

//               {selectedDate && selectedSession && (
//                 <Box sx={{ mb: 3 }}>
//                   <Typography variant="subtitle2" sx={{ mb: 1 }}>Select Time Slot:</Typography>
//                   <div className="grid grid-cols-2 gap-2">
//                     {selectedSession.expert.availability
//                       .find(date => date.date === selectedDate)
//                       ?.slots.map((slot, index) => {
//                         const isBooked = bookedSessions.some(
//                           booking => 
//                             booking &&
//                             booking.expertEmail === selectedSession.expert.mail && 
//                             booking.sessionDate === selectedDate && 
//                             booking.startTime === slot.start &&
//                             booking.status !== 'cancelled'
//                         );

//                         return (
//                           <Button
//                             key={index}
//                             variant={selectedStartTime === slot.start ? "contained" : "outlined"}
//                             color={isBooked ? "success" : "primary"}
//                             onClick={() => {
//                               if (!isBooked) {
//                                 setSelectedStartTime(slot.start);
//                                 setSelectedEndTime(slot.end);
//                               }
//                             }}
//                             disabled={isBooked}
//                             fullWidth
//                           >
//                             {slot.start} - {slot.end}
//                             {isBooked && " (Booked)"}
//                           </Button>
//                         );
//                       })}
//                   </div>
//                 </Box>
//               )}

//               {/* Credits Information */}
//               <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
//                 <Typography variant="subtitle2" gutterBottom>Session Details:</Typography>
//                 <div className="flex justify-between items-center">
//                   <Typography>Credits Required:</Typography>
//                   <Typography variant="h6" color="primary">{selectedSession?.credits}</Typography>
//                 </div>
//                 <div className="flex justify-between items-center mt-2">
//                   <Typography>Your Credits:</Typography>
//                   <Typography variant="h6" color={credits >= (selectedSession?.credits || 0) ? "success" : "error"}>
//                     {credits}
//                   </Typography>
//                 </div>
//               </Box>

//               {/* Action Buttons */}
//               <Button
//                 variant="contained"
//                 color={isBookedForSelectedSlot ? "error" : "primary"}
//                 fullWidth
//                 onClick={() => isBookedForSelectedSlot ? handleCancelBooking(selectedSession._id) : handleBooking()}
//                 disabled={isLoading || (!selectedStartTime && !isBookedForSelectedSlot)}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   {isLoading && <CircularProgress size={20} color="inherit" />}
//                   <span>{isBookedForSelectedSlot ? "Cancel Session" : "Confirm Booking"}</span>
//                 </Box>
//               </Button>

//               <Typography variant="caption" display="block" textAlign="center" color="blue" sx={{ mt: 1 }}>
//                 By booking, you agree to our terms and conditions
//               </Typography>
//             </Box>
//           </div>
//         </div>
//       </Dialog>

//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//       >
//         <Alert onClose={handleCloseNotification} severity={notification.type}>
//           {notification.message}
//         </Alert>
//       </Snackbar>

//       <Dialog open={feedbackDialog} onClose={() => setFeedbackDialog(false)}>
//         <DialogTitle>Session Feedback</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             Please rate your experience and provide feedback
//           </Typography>
//           <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//             {[1, 2, 3, 4, 5].map((star) => (
//               <IconButton
//                 key={star}
//                 onClick={() => setUserRating(star)}
//                 color={star <= userRating ? "primary" : "default"}
//               >
//                 ★
//               </IconButton>
//             ))}
//           </Box>
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             label="Your feedback"
//             variant="outlined"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setFeedbackDialog(false)}>Cancel</Button>
//           <Button onClick={submitFeedback} variant="contained" color="primary">
//             Submit Feedback
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default LiveSession;
import { useState, useEffect} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import { useCredits } from "../context/CreditsContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LiveSession = () => {
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [bookingInProgress, setBookingInProgress] = useState(new Set());
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [notification, setNotification] = useState({ open: false, message: "", type: "success" });
  const [sessionStats, setSessionStats] = useState(() => {
    const saved = localStorage.getItem("sessionStats");
    return saved ? JSON.parse(saved) : {};
  });
  const [bookedSessions, setBookedSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelInProgress, setCancelInProgress] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTopic, setFilterTopic] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [bookmarkedSessions, setBookmarkedSessions] = useState(() => {
    const saved = localStorage.getItem("bookmarkedSessions");
    return saved ? JSON.parse(saved) : [];
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const { credits, updateCredits } = useCredits(); 

  useEffect(() => {
    if (employeeEmail) {
      const saved = localStorage.getItem(`bookedSessions_${employeeEmail}`);
      setBookedSessions(saved ? JSON.parse(saved) : []);
    }
  }, [employeeEmail]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ No authentication token found");
          setNotification({
            open: true,
            message: "Please log in to access sessions",
            type: "error"
          });
          return;
        }

        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/api/employee/profile", {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.data?.employee) {
          throw new Error('No employee data found in response');
        }

        console.log("✅ Fetched Employee Data:", response.data);
        setEmployeeEmail(response.data.employee.email);

        const sessionsResponse = await axios.get(
          `http://localhost:3000/api/live-sessions/${response.data.employee.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (sessionsResponse.data.success) {
          setBookedSessions(sessionsResponse.data.sessions);
        }

      } catch (error) {
        console.error("❌ Error fetching employee data:", error);
        setNotification({
          open: true,
          message: "Failed to fetch your profile. Please try logging in again.",
          type: "error"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const sessions = [
    {
      id: 61,
      title: "Prevent Burnout",
      credits: 100,
      image: "https://recruitment.growmo.re/wp-content/uploads/2022/09/7-how-to-prevent-burnout.jpg",
      expert: {
        name: "Dr. Kuldeep Singh",
        photo: "https://tse4.mm.bing.net/th?id=OIP.VFVFnOHFUcnYKkiE58CIIQHaHa&pid=Api&P=0&h=180",
        specialization: "Expert in stress and Anxiety",
        rating: 4.8,
        sessions: 520,
        mail: "mansi.91289@gmail.com",
        availability: [
          {
            date: "2025-04-21",
            slots: [
              { start: "2:00 PM", end: "3:00 PM" },
              { start: "4:00 PM", end: "5:00 PM" }
            ]
          },
          {
            date: "2025-04-29",
            slots: [
              { start: "10:00 AM", end: "11:00 AM" },
              { start: "3:00 PM", end: "4:00 PM" }
            ]
          }
        ]
      },
      description: "Learn effective techniques to manage workplace stress and prevent burnout.",
      topics: ["Stress Management", "Work-Life Balance", "Mental Well-being"],
    },
        {
        id: 14,
        title: "Manage Your Stress",
        credits: 100,
        image: "https://tse3.mm.bing.net/th?id=OIP.7iFU_lcul3qC31HHEHbEdgHaHa&pid=Api&P=0&h=180",
        expert: {
          name: "Mahira Khan",
          photo: "https://i2.wp.com/www.americanbazaaronline.com/wp-content/uploads/2014/12/Mahira-Khan.jpg",
          specialization: "Expert in Sleep Quality",
          rating: 4.9,
          sessions: 480,
          mail: "mansi.91289@gmail.com",
          availability: [
            {
              date: "2025-04-16",
              slots: [
                { start: "10:00 AM", end: "11:00 AM" },
                { start: "2:00 PM", end: "3:00 PM" },
                { start: "5:00 PM", end: "6:00 PM" },
              ],
            },
            {
              date: "2025-04-17",
              slots: [
                { start: "11:00 AM", end: "12:00 PM" },
                { start: "3:00 PM", end: "4:00 PM" },
              ],
            },
          ],
        },
        description: "Expert guidance on managing daily stress and improving mental health.",
        topics: ["Sleep Quality", "Stress Relief", "Mental Health"],
      },

    {
      id: 34,
      title: "Mindful Meditation",
      credits: 100,
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
      expert: {
        name: "Sarah Johnson",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        specialization: "Meditation Coach",
        rating: 4.9,
        sessions: 650,
        mail: "mansi.91289@gmail.com",
        availability: [
          {
            date: "2025-04-15",
            slots: [
              { start: "2:00 PM", end: "3:00 PM" },
              { start: "4:00 PM", end: "5:00 PM" }
            ]
          },
          {
            date: "2025-04-16",
            slots: [
              { start: "10:00 AM", end: "11:00 AM" },
              { start: "3:00 PM", end: "4:00 PM" }
            ]
          }
        ]
      },
      description: "Learn mindfulness techniques for better focus and inner peace.",
      topics: ["Meditation", "Mindfulness", "Stress Relief"],
    },
    {
      id: 46,
      title: "Career Growth Strategy",
      credits: 100,
      image: "https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg",
      expert: {
        name: "Robert Chen",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        specialization: "Career Coach",
        rating: 4.7,
        sessions: 320,
        mail: "ajayguptap8210p@gmail.com",
        availability: [
          {
            date: "2024-04-26",
            slots: [
              { start: "10:00 AM", end: "11:00 AM" },
              { start: "1:00 PM", end: "2:00 PM" },
              { start: "4:00 PM", end: "5:00 PM" },
            ],
          },
        ],
      },
      description: "Strategic planning for career advancement and professional growth.",
      topics: ["Career Development", "Leadership", "Professional Growth"],
    },
    {
      id: 57,
      title: "Emotional Intelligence",
      credits: 100,
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
      expert: {
        name: "Dr. Emily White",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
        specialization: "EQ Expert",
        rating: 4.8,
        sessions: 430,
        mail: "ajayguptap8210p@gmail.com",
        availability: [
          {
            date: "2024-03-25",
            slots: [
              { start: "10:00 AM", end: "11:00 AM" },
              { start: "2:00 PM", end: "3:00 PM" },
              { start: "4:00 PM", end: "5:00 PM" },
            ],
          },
        ],
      },
      description: "Develop emotional intelligence for better relationships and leadership.",
      topics: ["Emotional Intelligence", "Communication", "Personal Development"],
    },
    {
      id: 16,
      title: "Emote",
      credits: 100,
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
      expert: {
        name: "Dr. Emily White",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
        specialization: "EQ Expert",
        rating: 4.8,
        sessions: 430,
        mail: "ajayguptap8210p@gmail.com",
        availability: [
          {
            date: "2024-03-25",
            slots: [
              { start: "10:00 AM", end: "11:00 AM" },
              { start: "2:00 PM", end: "3:00 PM" },
              { start: "4:00 PM", end: "5:00 PM" },
            ],
          },
        ],
      },
      description: "Develop emotional intelligence for better relationships and leadership.",
      topics: ["Emotional Intelligence", "Communication", "Personal Development"],
    },
    {
      id: 7,
      title: "Intelligence",
      credits: 100,
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
      expert: {
        name: "Dr. Emily White",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
        specialization: "EQ Expert",
        rating: 4.8,
        sessions: 430,
        mail: "ajayguptap8210p@gmail.com",
        availability: [
          {
            date: "2024-06-25",
            slots: [
              { start: "10:00 AM", end: "11:00 AM" },
              { start: "2:00 PM", end: "3:00 PM" },
              { start: "5:00 PM", end: "6:00 PM" },
            ],
          },
        ],
      },
      description: "Develop emotional intelligence for better relationships and leadership.",
      topics: ["Emotional Intelligence", "Communication", "Personal Development"],
    },
    {
      id: 8,
      title: "Emotion",
      credits: 100,
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
      expert: {
        name: "Dr. Emily White",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
        specialization: "EQ Expert",
        rating: 4.8,
        sessions: 430,
        mail: "ajayguptap8210p@gmail.com",
        availability: [
          {
            date: "2024-04-25",
            slots: [
              { start: "10:00 AM", end: "11:00 AM" },
              { start: "1:00 PM", end: "2:00 PM" },
              { start: "3:00 PM", end: "4:00 PM" },
            ],
          },
        ],
      },
      description: "Develop emotional intelligence for better relationships and leadership.",
      topics: ["Emotional Intelligence", "Communication", "Personal Development"],
    },
  ];

  const confirmBooking = async () => {
    if (!selectedSession) {
      setNotification({
        open: true,
        message: "No session selected!",
        type: "error"
      });
      return;
    }

    if (!selectedDate || !selectedStartTime || !selectedEndTime) {
      setNotification({
        open: true,
        message: "Please select date and time",
        type: "error"
      });
      return;
    }

    if (credits < selectedSession.credits) {
      setNotification({
        open: true,
        message: "Insufficient credits for this session",
        type: "error"
      });
      return;
    }

    try {
      if (bookingInProgress.has(selectedSession.id)) {
        return;
      }

      setBookingInProgress(prev => new Set([...prev, selectedSession.id]));

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/live-sessions/book",
        {
          employeeEmail,
          expertEmail: selectedSession.expert.mail,
          expertName: selectedSession.expert.name,
          sessionDate: selectedDate,
          specialization: selectedSession.expert.specialization,
          startTime: selectedStartTime,
          endTime: selectedEndTime,
          credits: selectedSession.credits
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        // Update credits using context
        await updateCredits(selectedSession.credits, 'subtract');
        console.log("✅ Credits deducted successfully");

        // Update booked sessions
        const updatedBookings = [...bookedSessions, response.data.sessionDetails];
        setBookedSessions(updatedBookings);
        localStorage.setItem(`bookedSessions_${employeeEmail}`, JSON.stringify(updatedBookings));

        // Update bar chart data in MongoDB
        const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error('No authentication token found');
          }

          const response = await fetch('http://localhost:3000/api/barchart/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              month: currentMonth,
              category: 'LiveSessions',
              operation: 'increase'
            })
          });

          if (!response.ok) {
            throw new Error('Failed to update bar chart data');
          }

          // Refresh chart data
          window.dispatchEvent(new Event('chartDataUpdated'));
        } catch (error) {
          console.error('❌ Failed to update bar chart:', error.message);
        }

        // Update LineChart data with session duration
        const startTime = selectedStartTime.replace(' AM', '').replace(' PM', '');
        const endTime = selectedEndTime.replace(' AM', '').replace(' PM', '');
        const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
        const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
        const durationMinutes = endMinutes - startMinutes;

        // Update MongoDB LineChart
        try {
          const token = localStorage.getItem("token");
          await fetch('http://localhost:3000/api/linechart/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              month: currentMonth,
              category: 'livesessions',
              duration: durationMinutes,
              operation: 'increase'
            })
          });
        } catch (error) {
          console.error('Failed to update line chart:', error);
        }

        // Create notification
        try {
          const token = localStorage.getItem("token");
          const notificationData = {
            title: "Live Session Booked",
            date: selectedDate,
            time: selectedStartTime,
            duration: `${durationMinutes} minutes`,
            price: `${selectedSession.credits} credits`,
            doctorName: selectedSession.expert.name,
            doctorSpecialty: selectedSession.expert.specialization,
            sessionDate: new Date(selectedDate),
            type: 'live'
          };

          const notificationResponse = await axios.post(
            "http://localhost:3000/api/notifications",
            notificationData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (notificationResponse.data.success) {
            // Dispatch events to update UI
            window.dispatchEvent(new Event('chartDataUpdated'));
            window.dispatchEvent(new Event('viewDataUpdated'));
            // Create and dispatch custom notification event
            const notificationEvent = new CustomEvent('notificationCreated', {
              detail: notificationResponse.data.notification
            });
            window.dispatchEvent(notificationEvent);
          }
        } catch (error) {
          console.error("Error creating notification:", error);
        }

        setNotification({
          open: true,
          message: "Session booked successfully!",
          type: "success"
        });

        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error booking session:", error);
      setNotification({
        open: true,
        message: error.response?.data?.message || "Failed to book session",
        type: "error"
      });

      // Refund credits if booking failed
      try {
        await updateCredits(selectedSession.credits, 'add');
      } catch (refundError) {
        console.error("Failed to refund credits:", refundError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookSession = (session) => {
    if (!employeeEmail) {
      setNotification({
        open: true,
        message: "Please log in to book sessions",
        type: "error"
      });
      return;
    }
    setSelectedSession(session);
    setSelectedDate(null);
    setSelectedStartTime("");
    setSelectedEndTime("");
    setOpenDialog(true);
  };

  const toggleBookmark = (sessionId) => {
    const isBookmarked = bookmarkedSessions.includes(sessionId);
    let updatedBookmarks;

    if (isBookmarked) {
      updatedBookmarks = bookmarkedSessions.filter(id => id !== sessionId);
    } else {
      updatedBookmarks = [...bookmarkedSessions, sessionId];
    }

    setBookmarkedSessions(updatedBookmarks);
    localStorage.setItem("bookmarkedSessions", JSON.stringify(updatedBookmarks));

    setNotification({
      open: true,
      message: isBookmarked ? "Session removed from bookmarks" : "Session bookmarked for later",
      type: "success",
    });
  };

  const allTopics = [...new Set(sessions.flatMap((session) => session.topics))];

  let filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = filterTopic === "all" || session.topics.includes(filterTopic);
    const matchesBookmarkFilter = showBookmarksOnly ? bookmarkedSessions.includes(session.id) : true;
    return matchesSearch && matchesTopic && matchesBookmarkFilter;
  });

  if (sortOption === "priceAsc") {
    filteredSessions = [...filteredSessions].sort((a, b) => a.credits - b.credits);
  } else if (sortOption === "priceDesc") {
    filteredSessions = [...filteredSessions].sort((a, b) => b.credits - a.credits);
  } else if (sortOption === "rating") {
    filteredSessions = [...filteredSessions].sort((a, b) => {
      const aRating = sessionStats[a.id]?.ratings.length > 0
        ? sessionStats[a.id].ratings.reduce((acc, val) => acc + val, 0) / sessionStats[a.id].ratings.length
        : a.expert.rating;
      const bRating = sessionStats[b.id]?.ratings.length > 0
        ? sessionStats[b.id].ratings.reduce((acc, val) => acc + val, 0) / sessionStats[b.id].ratings.length
        : b.expert.rating;
      return bRating - aRating;
    });
  } else if (sortOption === "sessions") {
    filteredSessions = [...filteredSessions].sort((a, b) => {
      const aSessions = (sessionStats[a.id]?.totalSessions || 0) + a.expert.sessions;
      const bSessions = (sessionStats[b.id]?.totalSessions || 0) + b.expert.sessions;
      return bSessions - aSessions;
    });
  }

  const handleCancelBooking = async (sessionId) => {
    try {
      if (cancelInProgress.has(sessionId)) return;
      setCancelInProgress(prev => new Set([...prev, sessionId]));
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setNotification({
          open: true,
          message: "Authentication required. Please log in again.",
          type: "error"
        });
        return;
      }

      const booking = bookedSessions.find(session => session._id === sessionId);
      if (!booking) {
        setNotification({
          open: true,
          message: "Booking not found",
          type: "error"
        });
        return;
      }

      // Validate cancellation timing
      const sessionDateTime = new Date(`${booking.sessionDate}T${booking.startTime}`);
      const now = new Date();
      if (sessionDateTime < now) {
        setNotification({
          open: true,
          message: "Cannot cancel past sessions",
          type: "error"
        });
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/api/live-sessions/${employeeEmail}/cancel/${sessionId}`,
        { 
          expertEmail: booking.expertEmail,
          expertName: booking.expertName,
          sessionDate: booking.sessionDate,
          startTime: booking.startTime,
          reason: 'Cancelled by employee'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
          try {
            await updateCredits(booking.credits, 'add');
            console.log("✅ Credits refunded successfully");

            const updatedSessions = bookedSessions.filter(session => session._id !== sessionId);
            setBookedSessions(updatedSessions);
            localStorage.setItem(`bookedSessions_${employeeEmail}`, JSON.stringify(updatedSessions));

            // Update bar chart data in MongoDB for cancellation
            const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
            try {
              const token = localStorage.getItem("token");
              if (!token) {
                throw new Error('No authentication token found');
              }

              const response = await fetch('http://localhost:3000/api/barchart/update', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  month: currentMonth,
                  category: 'LiveSessions',
                  operation: 'decrease',
                  value: -1
                })
              });

              if (!response.ok) {
                throw new Error('Failed to update bar chart data');
              }

              // Refresh chart data
              window.dispatchEvent(new Event('chartDataUpdated'));
            } catch (error) {
              console.error('❌ Failed to update bar chart:', error.message);
            }

            // Update MongoDB LineChart
            const startTime = booking.startTime.replace(' AM', '').replace(' PM', '');
            const endTime = booking.endTime.replace(' AM', '').replace(' PM', '');
            const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
            const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
            const durationMinutes = endMinutes - startMinutes;

            try {
              const token = localStorage.getItem("token");
              await fetch('http://localhost:3000/api/linechart/update', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  month: currentMonth,
                  category: 'livesessions',
                  duration: durationMinutes,
                  operation: 'decrease'
                })
              });
            } catch (error) {
              console.error('Failed to update line chart:', error);
            }

            // Create cancellation notification
            try {
              const notificationData = {
                title: "Live Session Cancelled",
                date: booking.sessionDate,
                time: booking.startTime,
                duration: "Cancelled",
                price: `${booking.credits} credits refunded`,
                doctorName: booking.expertName,
                doctorSpecialty: booking.specialization,
                sessionDate: new Date(booking.sessionDate),
                type: 'live'
              };

              const notificationResponse = await axios.post(
                "http://localhost:3000/api/notifications",
                notificationData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                }
              );

              if (notificationResponse.data.success) {
                // Dispatch all update events
                window.dispatchEvent(new Event('chartDataUpdated'));
                window.dispatchEvent(new Event('viewDataUpdated'));
                const notificationEvent = new CustomEvent('notificationCreated', {
                  detail: notificationResponse.data.notification
                });
                window.dispatchEvent(notificationEvent);
              }
            } catch (error) {
              console.error("Error creating cancellation notification:", error);
            }

            setNotification({
              open: true,
              message: "Booking cancelled successfully",
              type: "success"
            });
          } catch (error) {
            console.error("Failed to refund credits:", error);
            setNotification({
              open: true,
              message: "Failed to refund credits",
              type: "error"
            });
          }
        }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setNotification({
        open: true,
        message: error.response?.data?.message || "Failed to cancel booking",
        type: "error"
      });
    } finally {
      setIsLoading(false);
      setCancelInProgress(prev => {
        const next = new Set(prev);
        next.delete(sessionId);
        return next;
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const submitFeedback = () => {
    if (!userRating || !feedback.trim()) {
      setNotification({
        open: true,
        message: "Please provide a rating and feedback.",
        type: "error",
      });
      return;
    }

    if (selectedSession) {
      const sessionId = selectedSession.id;
      const currentStats = sessionStats[sessionId] || { ratings: [], totalSessions: 0 };

      const updatedStats = {
        ...currentStats,
        ratings: [...currentStats.ratings, userRating],
        totalSessions: currentStats.totalSessions + 1,
      };

      const newSessionStats = {
        ...sessionStats,
        [sessionId]: updatedStats,
      };

      setSessionStats(newSessionStats);
      localStorage.setItem("sessionStats", JSON.stringify(newSessionStats));

      setFeedbackDialog(false);
      setNotification({
        open: true,
        message: "Thank you for your feedback!",
        type: "success",
      });
    }
  };

  const handleBooking = async () => {
    if (!selectedSession || !selectedDate || !selectedStartTime || !selectedEndTime) {
      setNotification({
        open: true,
        message: "Please select session, date and time slot",
        type: "error"
      });
      return;
    }

    // Validate date and time
    const now = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${selectedStartTime}`);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDay = new Date(selectedDate);

    // Check if selected date is in the past
    if (selectedDay < startOfToday) {
      setNotification({
        open: true,
        message: "Cannot select past dates",
        type: "error"
      });
      return;
    }

    // If same day, check if time is in the past
    if (selectedDay.getTime() === startOfToday.getTime()) {
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const selectedTime = parseInt(selectedStartTime.split(':')[0]) * 60 + parseInt(selectedStartTime.split(':')[1]);

      if (selectedTime <= currentTime) {
        setNotification({
          open: true,
          message: "Cannot book slots from past time",
          type: "error"
        });
        return;
      }
    }

    // Add buffer time for immediate bookings
    const bufferTime = new Date(now.getTime() + 15 * 60000); // 15 minutes buffer
    if (selectedDateTime < bufferTime) {
      setNotification({
        open: true,
        message: "Please book sessions at least 15 minutes in advance",
        type: "error"
      });
      return;
    }

    if (credits < selectedSession.credits) {
      setNotification({
        open: true,
        message: `Insufficient credits. Need ${selectedSession.credits} credits.`,
        type: "error"
      });
      return;
    }

    try {
      setIsLoading(true);
      await updateCredits(selectedSession.credits, 'subtract');

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/live-sessions/book",
        {
          employeeEmail,
          expertEmail: selectedSession.expert.mail,
          expertName: selectedSession.expert.name,
          specialization: selectedSession.expert.specialization,
          sessionDate: selectedDate,
          startTime: selectedStartTime,
          endTime: selectedEndTime,
          credits: selectedSession.credits
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        const updatedSessions = [...bookedSessions, response.data.session];
        setBookedSessions(updatedSessions);
        localStorage.setItem(`bookedSessions_${employeeEmail}`, JSON.stringify(updatedSessions));

        // Update bar chart data in MongoDB
        const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error('No authentication token found');
          }

          const response = await fetch('http://localhost:3000/api/barchart/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              month: currentMonth,
              category: 'LiveSessions',
              operation: 'increase'
            })
          });

          if (!response.ok) {
            throw new Error('Failed to update bar chart data');
          }

          // Refresh chart data
          window.dispatchEvent(new Event('chartDataUpdated'));
        } catch (error) {
          console.error('❌ Failed to update bar chart:', error.message);
        }

        // Update LineChart data with session duration
        const startTime = selectedStartTime.replace(' AM', '').replace(' PM', '');
        const endTime = selectedEndTime.replace(' AM', '').replace(' PM', '');
        const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
        const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
        const durationMinutes = endMinutes - startMinutes;

        // Update MongoDB LineChart
        try {
          const token = localStorage.getItem("token");
          await fetch('http://localhost:3000/api/linechart/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              month: currentMonth,
              category: 'livesessions',
              duration: durationMinutes,
              operation: 'increase'
            })
          });
        } catch (error) {
          console.error('Failed to update line chart:', error);
        }

        // Create notification
        try {
          const token = localStorage.getItem("token");
          const notificationData = {
            title: "Live Session Booked",
            date: selectedDate,
            time: selectedStartTime,
            duration: `${durationMinutes} minutes`,
            price: `${selectedSession.credits} credits`,
            doctorName: selectedSession.expert.name,
            doctorSpecialty: selectedSession.expert.specialization,
            sessionDate: new Date(selectedDate),
            type: 'live'
          };

          const notificationResponse = await axios.post(
            "http://localhost:3000/api/notifications",
            notificationData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (notificationResponse.data.success) {
            // Dispatch events to update UI
            window.dispatchEvent(new Event('chartDataUpdated'));
            window.dispatchEvent(new Event('viewDataUpdated'));
            // Create and dispatch custom notification event
            const notificationEvent = new CustomEvent('notificationCreated', {
              detail: notificationResponse.data.notification
            });
            window.dispatchEvent(notificationEvent);
          }
        } catch (error) {
          console.error("Error creating notification:", error);
        }

        setNotification({
          open: true,
          message: "Session booked successfully!",
          type: "success"
        });

        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error booking session:", error);
      setNotification({
        open: true,
        message: error.response?.data?.message || "Failed to book session",
        type: "error"
      });

      // Refund credits if booking failed
      try {
        await updateCredits(selectedSession.credits, 'add');
      } catch (refundError) {
        console.error("Failed to refund credits:", refundError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isBookedForSelectedSlot = selectedSession && selectedDate && selectedStartTime    ? bookedSessions.filter(booking => booking).some(
        (booking) =>
          booking.expertEmail === selectedSession.expert.mail &&
          booking.sessionDate === selectedDate &&
          booking.startTime === selectedStartTime &&
          booking.status !== "cancelled"
      )
    : false;

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Live Sessions
      </Typography>

      <Box sx={{ mb: 4, display: "flex", flexDirection: {xs: "column", md: "row"}, gap: 2 }}>
        <TextField
          label="Search sessions"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Topic</InputLabel>
            <Select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              label="Filter by Topic"
            >
              <MenuItem value="all">All Topics</MenuItem>
              {allTopics.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="rating">Highest Rated</MenuItem>
              <MenuItem value="sessions">Most Popular</MenuItem>
            </Select>
          </FormControl>

          <Button 
            variant={showBookmarksOnly ? "contained" : "outlined"}
            color="primary"
            onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
            startIcon={<span role="img" aria-label="bookmark">🔖</span>}
          >
            {showBookmarksOnly ? "All Sessions" : "Bookmarks Only"}
          </Button>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
        Showing {filteredSessions.length} of {sessions.length} sessions
        {showBookmarksOnly && ` (Bookmarked: ${bookmarkedSessions.length})`}
      </Typography>

      <Grid container spacing={4}>
        {isLoading ? (
          Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} md={6} key={`skeleton-${index}`}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ width: '100%', height: 200, bgcolor: 'grey.300', borderRadius: 1 }} />
                  <Box sx={{ mt: 2, mb: 1, height: 32, width: '60%', bgcolor: 'grey.300', borderRadius: 1 }} />
                  <Box sx={{ height: 24, width: '30%', bgcolor: 'grey.300', borderRadius: 1, mb: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ width: 64, height: 64, bgcolor: 'grey.300', borderRadius: '50%' }} />
                    <Box sx={{ ml: 2 }}>
                      <Box sx={{ height: 20, width: 120, bgcolor: 'grey.300', borderRadius: 1, mb: 1 }} />
                      <Box sx={{ height: 16, width: 150, bgcolor: 'grey.300', borderRadius: 1 }} />
                    </Box>
                  </Box>
                  <Box sx={{ height: 40, width: '100%', bgcolor: 'grey.300', borderRadius: 1, mt: 3 }} />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : filteredSessions.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" sx={{ my: 4 }}>
              No sessions found. Try adjusting your filters.
            </Typography>
          </Grid>
        ) : (
          filteredSessions.map((session) => {
            const isBookedForAnySlot = bookedSessions && bookedSessions.some(booking => booking && booking._id && booking.expertEmail === session.expert.mail);            return (
              <Grid item xs={12} md={6} key={session.id}>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardContent>
                      <img
                        src={session.image}
                        alt={session.title}
                        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                      />

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 1 }}>
                        <Typography variant="h5">
                          {session.title}
                        </Typography>
                        <IconButton 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(session.id);
                          }}
                          color={bookmarkedSessions.includes(session.id) ? "primary" : "default"}
                        >
                          {bookmarkedSessions.includes(session.id) ? "★" : "☆"}
                        </IconButton>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                        <Chip
                          label={`${session.credits} credits`}
                          color="primary"
                          size="small"
                        />

                      </Box>

                      <div className="flex items-center gap-4 mb-4">
                        <Avatar src={session.expert.photo} sx={{ width: 64, height: 64 }} />
                        <div>
                          <Typography variant="h6">{session.expert.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {session.expert.specialization}
                          </Typography>
                          <div className="flex items-center gap-2">
                            <Chip                              label={`${
                                sessionStats[session.id]?.ratings.length > 0
                                  ? (
                                      sessionStats[session.id].ratings.reduce((a, b) => a + b, 0) /
                                      sessionStats[session.id].ratings.length
                                    ).toFixed(1)
                                  : session.expert.rating
                              } ★`}
                              size="small"
                              color="primary"
                            />
                            <Chip
                              label={`${
                                (sessionStats[session.id]?.totalSessions || 0) + session.expert.sessions
                              }+ sessions`}
                              size="small"
                            />
                          </div>
                        </div>
                      </div>

                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {session.description}
                      </Typography>

                      <div className="flex gap-2 mb-4 flex-wrap">
                        {session.topics.map((topic, index) => (
                          <Chip key={index} label={topic} size="small" />
                        ))}
                      </div>

                      <Box sx={{ width: '100%' }}>

                        <Button
                          variant="contained"
                          color={isBookedForAnySlot ? "primary" : "primary"}
                          fullWidth
                          onClick={() => handleBookSession(session)}
                          disabled={bookingInProgress.has(session.id)}
                          sx={{
                            mt: 2,
                            opacity: isBookedForAnySlot ? 0.8 : 1,
                            cursor: bookingInProgress.has(session.id) ? 'not-allowed' : 'pointer',
                            '&.Mui-disabled': {
                              backgroundColor: bookingInProgress.has(session.id) ? '#9e9e9e' : undefined,
                              color: 'white',
                              opacity: 1
                            }
                          }}
                        >
                          {bookingInProgress.has(session.id) ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CircularProgress size={20} color="inherit" />
                              <span>Booking...</span>
                            </Box>
                          ) : (
                            "BOOK LIVE SESSION"
                          )}
                        </Button>
                      </Box>

                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          })
        )}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <div className="flex flex-col md:flex-row relative">
          <IconButton 
            onClick={() => setOpenDialog(false)}
            sx={{ 
              position: 'absolute', 
              right: 8, 
              top: 8,
              zIndex: 1
            }}
          >
            ✕
          </IconButton>
          {/* Left side - Expert info */}
          <div className="md:w-2/5 bg-indigo-700 text-white p-6 flex flex-col items-center justify-center relative">
            {selectedSession && (
              <>
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white mb-4 shadow-lg">
                  <img 
                    src={selectedSession.expert.photo} 
                    alt={selectedSession.expert.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-2xl font-bold mb-1 text-center">{selectedSession.expert.name}</h2>
                <span className="inline-block bg-white text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {selectedSession.expert.specialization}
                </span>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-2xl ${i < Math.floor(selectedSession.expert.rating) ? "text-yellow-300" : "text-gray-400"}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2">{selectedSession.expert.rating}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="bg-indigo-600 rounded-lg p-3 text-center">
                    <span className="block text-xs text-indigo-200">Experience</span>
                    <span className="font-bold text-lg">10 Years</span>
                  </div>
                  <div className="bg-indigo-600 rounded-lg p-3 text-center">
                    <span className="block text-xs text-indigo-200">Sessions</span>
                    <span className="font-bold text-lg">{selectedSession.expert.sessions}+</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right side - Booking details */}
          <div className="md:w-3/5 p-6">
            <Typography variant="h5" gutterBottom>
              {selectedSession?.title}
            </Typography>

            {/* Show booked sessions in dialog */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom className="flex items-center">
                <span role="img" aria-label="calendar" className="mr-2">📅</span>
                Booked Sessions
              </Typography>
              <Paper elevation={0} sx={{ 
                bgcolor: '#f8f9fa', 
                p: 2, 
                borderRadius: 2,
                maxHeight: '300px',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px'
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1',
                  borderRadius: '4px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#555'
                  }
                }
              }}>
                {bookedSessions
                  .filter(booking => 
                    booking && 
                    booking.expertEmail === selectedSession?.expert.mail &&
                    booking.expertName === selectedSession?.expert.name &&
                    booking.status === 'booked' &&
                    !booking.cancelledAt &&
                    new Date(`${booking.sessionDate} ${booking.startTime}`) > new Date()
                  )
                  .map((booking, idx) => (
                    <Box 
                      key={idx} 
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        bgcolor: 'white', 
                        borderRadius: 1,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 1 
                      }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1a237e' }}>
                            {new Date(booking.sessionDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {booking.startTime} - {booking.endTime}
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancelInProgress.has(booking._id)}
                          startIcon={cancelInProgress.has(booking._id) ? <CircularProgress size={16} color="inherit" /> : <span>🗑️</span>}
                        >
                          {cancelInProgress.has(booking._id) ? 'Cancelling...' : 'Cancel'}
                        </Button>
                      </Box>
                    </Box>
                  ))}
                {!bookedSessions.some(booking => 
                  booking && 
                  booking.expertEmail === selectedSession?.expert.mail &&
                  booking.expertName === selectedSession?.expert.name &&
                  booking.status === 'booked' &&
                  !booking.cancelledAt &&
                  new Date(`${booking.sessionDate} ${booking.startTime}`) > new Date()
                ) && (
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 3,
                    color: 'text.secondary'
                  }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      No session booked, yet!
                    </Typography>
                    <Typography variant="body2">
                      Select a date and time below to book your first session
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>

            {/* Date and Time Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Book an Appointment
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Select a date:</Typography>
                <DatePicker
                  selected={selectedDate ? new Date(selectedDate) : null}
                  onChange={(date) => setSelectedDate(date.toISOString().split('T')[0])}
                  includeDates={selectedSession?.expert.availability.map(date => new Date(date.date))}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholderText="Click to select a date"
                />
              </Box>

              {selectedDate && selectedSession && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Select Time Slot:</Typography>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedSession.expert.availability
                      .find(date => date.date === selectedDate)
                      ?.slots.map((slot, index) => {
                        const isBooked = bookedSessions.some(
                          booking => 
                            booking &&
                            booking.expertEmail === selectedSession.expert.mail && 
                            booking.sessionDate === selectedDate && 
                            booking.startTime === slot.start &&
                            booking.status !== 'cancelled'
                        );

                        return (
                          <Button
                            key={index}
                            variant={selectedStartTime === slot.start ? "contained" : "outlined"}
                            color={isBooked ? "success" : "primary"}
                            onClick={() => {
                              if (!isBooked) {
                                setSelectedStartTime(slot.start);
                                setSelectedEndTime(slot.end);
                              }
                            }}
                            disabled={isBooked}
                            fullWidth
                          >
                            {slot.start} - {slot.end}
                            {isBooked && " (Booked)"}
                          </Button>
                        );
                      })}
                  </div>
                </Box>
              )}

              {/* Credits Information */}
              <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="subtitle2" gutterBottom>Session Details:</Typography>
                <div className="flex justify-between items-center">
                  <Typography>Credits Required:</Typography>
                  <Typography variant="h6" color="primary">{selectedSession?.credits}</Typography>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Typography>Your Credits:</Typography>
                  <Typography variant="h6" color={credits >= (selectedSession?.credits || 0) ? "success" : "error"}>
                    {credits}
                  </Typography>
                </div>
              </Box>

              {/* Action Buttons */}
              <Button
                variant="contained"
                color={isBookedForSelectedSlot ? "error" : "primary"}
                fullWidth
                onClick={() => isBookedForSelectedSlot ? handleCancelBooking(selectedSession._id) : handleBooking()}
                disabled={isLoading || (!selectedStartTime && !isBookedForSelectedSlot)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {isLoading && <CircularProgress size={20} color="inherit" />}
                  <span>{isBookedForSelectedSlot ? "Cancel Session" : "Confirm Booking"}</span>
                </Box>
              </Button>

              <Typography variant="caption" display="block" textAlign="center" color="blue" sx={{ mt: 1 }}>
                By booking, you agree to our terms and conditions
              </Typography>
            </Box>
          </div>
        </div>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notification.type}>
          {notification.message}
        </Alert>
      </Snackbar>

      <Dialog open={feedbackDialog} onClose={() => setFeedbackDialog(false)}>
        <DialogTitle>Session Feedback</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please rate your experience and provide feedback
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton
                key={star}
                onClick={() => setUserRating(star)}
                color={star <= userRating ? "primary" : "default"}
              >
                ★
              </IconButton>
            ))}
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            label="Your feedback"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackDialog(false)}>Cancel</Button>
          <Button onClick={submitFeedback} variant="contained" color="primary">
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LiveSession;