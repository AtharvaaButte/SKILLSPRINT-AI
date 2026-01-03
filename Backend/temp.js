const {db} = require('./config/firbase.js');

async function addD(data) {
    const ref = await db.collection('roadmaps').add(data);
    return ref.id;
}

(async () => {
    const id = await addD({ nm: "Atharva" });
})();
