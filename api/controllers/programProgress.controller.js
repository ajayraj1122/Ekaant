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

    // Check if program progress exists
    let progress = await ProgramProgress.findOne({ 
      employeeId,
      programId,
      employeeEmail 
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

    const query = { employeeId };
    if (employeeEmail) {
      query.employeeEmail = employeeEmail;
    }

    const progress = await ProgramProgress.find(query);
    console.log("✅ Fetched program progress for:", employeeEmail || employeeId);
    
    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("❌ Error fetching progress:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
