const express = require('express');
const app = express();
const cors = require('cors');
const router = require("./routes/roadmap.routes");


app.use(cors({
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use('/api',router)

app.listen(3000,()=>{
    console.log('listing');
});