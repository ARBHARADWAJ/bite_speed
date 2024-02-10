const express = require("express");
const { connect, end } = require("./db.js");
const app = express();
// const bodyparser = require("body-parser");
const userroute = require("./userroute.js");
const router = require("./route.js");

require("dotenv").config();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("helloworld");
});
app.use("/identify", router);

app.listen(process.env.PORT, async () => {
  console.log("Server started on port", process.env.PORT);
  try {
    await connect((err) => {
      if (!err) {
        console.log("connection establised");
      } else {
        console.log("establishment is not done");
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
  }
});
