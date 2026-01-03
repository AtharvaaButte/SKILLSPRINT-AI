const{XMLParser} = require('fast-xml-parser')
const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    trimValues:true,
    isArray: (name,japth,isLeafNode, isAttribute) => {
        const alwayArray = ["Month", "Week", "Topic"];

        if (alwayArray.includes(name)) {
            return true;
        }
        return false;
    }
})

function parseRoadmap(RoadmapXML) {
    try {
        const result = parser.parse(RoadmapXML);
        if(!result || !result.Roadmap){
            throw new Error("Invalid XML: <Roadmap> root missing");
        }
        return result.Roadmap;
    } catch (err) {
        throw new Error("XML parsing failed: " + err.message);
    }
}

module.exports = {parseRoadmap};