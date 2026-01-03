const dotenv = require('dotenv');
const path = require('path')

dotenv.config({path: path.resolve(__dirname,'../.env')});

function getGeminiAPiKey() {
    return process.env.GEMINI_API_KEY;
}

module.exports ={getGeminiAPiKey};