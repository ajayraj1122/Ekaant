// import ProgramProgress from '../models/ProgramProgress.model.js';

// export const updateProgress = async (req, res) => {
//   try {
//     const { programId, programName, expertName, currentLevel, completedLevel, levelName } = req.body;
//     const employeeId = req.employee.id;

//     let progress = await ProgramProgress.findOne({ 
//       employeeId,
//       programId 
//     });

//     if (!progress) {
//       progress = new ProgramProgress({
//         employeeId,
//         programId,
//         programName,
//         expertName,
//         currentLevel,
//         completedLevels: completedLevel ? [{
//           levelIndex: completedLevel,
//           completedAt: new Date(),
//           name: levelName
//         }] : [],
//         startedAt: new Date(),
//         lastAccessedAt: new Date()
//       });
//     } else {
//       progress.currentLevel = currentLevel;
//       progress.lastAccessedAt = new Date();
      
//       if (completedLevel && !progress.completedLevels.some(level => level.levelIndex === completedLevel)) {
//         progress.completedLevels.push({
//           levelIndex: completedLevel,
//           completedAt: new Date(),
//           name: levelName
//         });
//       }
//     }

//     await progress.save();
//     res.status(200).json({ success: true, progress });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getProgress = async (req, res) => {
//   try {
//     const employeeId = req.employee.id;
//     const progress = await ProgramProgress.find({ employeeId });
//     res.status(200).json({ success: true, progress });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
import ProgramProgress from '../models/ProgramProgress.model.js';

export const updateProgress = async (req, res) => {
  try {
    const { programId, programName, expertName, currentLevel, completedLevel, levelName, employeeEmail } = req.body;
    const employeeId = req.employee.id;

    if (!programId || !employeeEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Program ID and employee email are required' 
      });
    }

    // Check if program progress exists using either employeeId or email
    let progress = await ProgramProgress.findOne({
      $or: [
        { employeeId, programId },
        { employeeEmail, programId }
      ]
    });

    if (!progress) {
      progress = new ProgramProgress({
        employeeId,
        programId,
        programName,
        expertName,
        employeeEmail,
        currentLevel,
        completedLevels: completedLevel ? [{
          levelIndex: completedLevel,
          completedAt: new Date(),
          name: levelName
        }] : [],
        startedAt: new Date(),
        lastAccessedAt: new Date()
      });
      console.log("✅ Created new program progress");
    } else {
      progress.currentLevel = currentLevel;
      progress.lastAccessedAt = new Date();
      
      if (completedLevel && !progress.completedLevels.some(level => level.levelIndex === completedLevel)) {
        progress.completedLevels.push({
          levelIndex: completedLevel,
          completedAt: new Date(),
          name: levelName
        });
      }
      console.log("✅ Updated existing program progress");
    }

    await progress.save();
    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("❌ Error updating progress:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const employeeId = req.employee.id;
    const employeeEmail = req.query.email;

    if (!employeeId && !employeeEmail) {
      return res.status(400).json({
        success: false,
        message: 'Either employee ID or email is required'
      });
    }

    const query = {
      $or: [
        { employeeId },
        { employeeEmail }
      ]
    };

    const progress = await ProgramProgress.find(query);

    if (!progress || progress.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No program progress found'
      });
    }
    console.log("✅ Fetched program progress for:", employeeEmail || employeeId);
    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("❌ Error fetching progress:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};