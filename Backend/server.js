const express = require('express');
const app = express();
const cors = require('cors');
const router = require("./routes/roadmap.routes");
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: ["http://localhost:8080",
    "https://skillsprint-ai-pi.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

app.use('/api', router)

app.listen(PORT, () => {
  console.log('listing');
});