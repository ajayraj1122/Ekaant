// // import dotenv from 'dotenv';
// // dotenv.config();
// // const express = require('express');

// // const mongoose = require('mongoose');

// // const cors = require('cors');
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));

// // // Logging middleware
// // app.use((req, res, next) => {
// //   const start = Date.now();
// //   res.on("finish", () => {
// //     const duration = Date.now() - start;
// //     if (req.path.startsWith("/api")) {
// //       console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
// //     }
// //   });
// //   next();
// // });

// // // User routes
// // const userRoutes = require('./routes/userRoutes');
// // app.use('/api/users', userRoutes);

// // // Session routes
// // const sessionRoutes = require('./routes/sessionRoutes');
// // app.use('/api/sessions', sessionRoutes);


// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({ message: 'Internal server error' });
// // });

// // mongoose.connect(process.env.MONGO).then
// // (() => {
// //   console.log('Connected to MongoDB');
// // }).catch((error) => {
// //   console.log('Error:', error.message);
// // });
// // app.listen(3000, () => {
// //   console.log('Server is running on port 3000');
// // });
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Logging middleware
// app.use((req, res, next) => {
//   const start = Date.now();
//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     if (req.path.startsWith("/api")) {
//       console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
//     }
//   });
//   next();
// });

// // Connect to MongoDB (adjust the connection string as needed)
// mongoose.connect('mongodb://localhost:27017/ekaant', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((error) => console.error('MongoDB connection error:', error));

// // User routes
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// // Session routes
// const sessionRoutes = require('./send-email/sessionRoutes');
// app.use('/api/sessions', sessionRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal server error' });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Handle cleanup on shutdown
// process.on('SIGTERM', () => {
//   console.log('Shutting down gracefully...');
//   mongoose.connection.close(() => {
//     console.log('MongoDB connection closed.');
//     process.exit(0);
//   });
// });