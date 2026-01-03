const admin = require('../config/firbaseAdmin')
const db = admin.firestore();

async function storeRoadmap(uid, roadmap) {
    try {
        roadmap.Months.Month.for
        const ref = await db
            .collection('users')
            .doc(uid)
            .collection('roadmaps')
            .add({
                ...roadmap,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                lastAccessedAt: admin.firestore.FieldValue.serverTimestamp(),
            })
        const snapshot = await ref.get();
        return {
            id: ref.id,
            ...snapshot.data(),
        }
    } catch (err) {
        console.log(err.message);
        return { error: err }
    }
}

async function getRoadmapsFrommDB(uid) {
    try {

        // Get pointer
        const roadmapsPtr = db.collection('users').doc(uid).collection('roadmaps');

        // Fetch data
        const snapshot = await roadmapsPtr.get();

        if (snapshot.empty) {            
            return [];
        }

        const roadmaps = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        return roadmaps;

    } catch (err) {
        console.log(err.message);
    }
}

async function updateTopicDB(uid, data) {
    try {
        const roadmapsPtr = db.collection('users').doc(uid).collection('roadmaps').doc(data.roadmapId);
        const snapshot = await roadmapsPtr.get();
        
        if (!snapshot.exists) return;
        
        const roadmap = snapshot.data();

        const months = roadmap.Months.Month;

        const month =  months.find(m => m.index == data.monthId)

        const week = month.Weeks.Week.find( w => w.index == data.weekId)
        
        const topic = week.Topics.Topic.find(t => t.index == data.topicId)
        
        topic.completed = data.completed;

        await roadmapsPtr.update({
            Months: {
                Month: months
            }
        })
        return true
    } catch (err) {
        console.log(err,message);
        return false;
    } 
}

module.exports = { storeRoadmap, getRoadmapsFrommDB , updateTopicDB};