const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoute = require("./api/verify.route")
const serverless = require("serverless-http");

dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", apiRoute)
app.get("/", (req, res) => {
  res.send("You're at Tasker!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports.handler = serverless(app);
