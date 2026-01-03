const express = require('express');
const {genrateFromSkills, getRoadmaps,updateTopic} = require('../controllers/roadmap.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();
const multer = require('multer')

const upload = multer({storage: multer.memoryStorage()})

// APIs: 
router.post('/create-from-skill',authMiddleware,genrateFromSkills);

router.post('/create-from-resume',authMiddleware, upload.single('resume'),genrateFromSkills);

router.post('/update-topic-data',authMiddleware,updateTopic);

router.get('/get-all-roadmaps',authMiddleware,getRoadmaps)
router.get('/health',(req,res)=>{
    res.json({status: true})
})
module.exports = router;    