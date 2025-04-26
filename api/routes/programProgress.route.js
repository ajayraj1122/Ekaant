
// import express from 'express';
// import { updateProgress, getProgress } from '../controllers/programProgress.controller.js';
// import { verifyToken } from '../utils/verifyemployee.js';

// const router = express.Router();

// router.post('/update', verifyToken, updateProgress);
// router.get('/', verifyToken, getProgress);

// export default router;
import express from 'express';
import { updateProgress, getProgress } from '../controllers/programProgress.controller.js';
import { verifyToken } from '../utils/verifyemployee.js';
import cors from 'cors';

const router = express.Router();

// Apply CORS options to all routes
const corsOptions = {
  origin: [
    'https://your-frontend.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true
};

// Handle OPTIONS requests first
router.options('/update', cors(corsOptions), (req, res) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  res.sendStatus(200);
});

router.options('/', cors(corsOptions), (req, res) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  res.sendStatus(200);
});

// Your existing routes
router.post('/update', verifyToken, updateProgress);
router.get('/', verifyToken, getProgress);
router.get('/:email', verifyToken, getProgress);

export default router;
