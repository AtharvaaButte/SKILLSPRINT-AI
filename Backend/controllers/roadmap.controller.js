const { genrateRoadmap } = require('../services/gemini.service');
const { parseRoadmap } = require("../services/xmlParser.service")
const { storeRoadmap, getRoadmapsFrommDB, updateTopicDB } = require('../services/roadmap.service')

async function genrateFromSkills(req, res) {
    try {

        const data = req.body;
        const user = req.user;
        
        let xmlText = await genrateRoadmap(data);
        let Roadmap = parseRoadmap(xmlText);

        // Add completed flag
        Roadmap.Months.Month.forEach((eachmonth) => {
            eachmonth.Weeks.Week.forEach((eachweek) => {
                eachweek.Topics.Topic.forEach((topic) => {
                    topic.completed = false;
                })
            })
        })

        let roadmap = await storeRoadmap(user.uid, Roadmap);

        if (!xmlText) {
            return res.status(500).json({ error: "AI failed to generate data" });
        }

        res.json({
            status: true,
            roadmap
        });

    } catch (err) {
        res.status(500).json({ status: false,error: err.message });
        console.log(err.message);

    }
}

async function getRoadmaps(req, res) {
    const user = req.user;
    try {
        const roadmaps = await getRoadmapsFrommDB(user.uid);
        
        if (roadmaps) {
            
            res.json({
                status: true,
                roadmaps
            });
        }
            
    } catch (err) {
         res.status(500).json({ status: false, error: err.message });
         console.log(err.message);
    }
}

async function updateTopic(req,res) {
    try {
        const user = req.user;
        const data = req.body;
        
        const res = await updateTopicDB(user.uid, data);
        
        res.json({status: res})
        
    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
         console.log(err.message);
    }
}
module.exports = { genrateFromSkills , getRoadmaps,updateTopic}