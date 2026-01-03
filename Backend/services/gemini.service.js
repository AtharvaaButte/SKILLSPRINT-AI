const {GoogleGenerativeAI} = require("@google/generative-ai");
const {getGeminiApiKey} = require("../config/env");
const {getSysPrompt,formPromtFromSkill} = require("./prompt.service")

async function genrateRoadmap(data) {
    try {
        
        const genAI = new GoogleGenerativeAI(getGeminiApiKey());
        const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: getSysPrompt()
        });

        const prompt = formPromtFromSkill(data);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let xmlText = response.text();
        return xmlText;
        
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {genrateRoadmap}