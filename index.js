const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// root API calling
app.get("/", (req, res) => {
  res.send("Foodie restaurant server is running");
});

app.listen(port, () => {
  console.log(`Foodie restaurant app listening on port ${port}`);
});