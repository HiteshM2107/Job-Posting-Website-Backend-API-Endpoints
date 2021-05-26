require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//My routes
const recruiterRoutes = require("./routes/recruiter");
const candidateRoutes = require("./routes/candidate");

//Specifying port
const PORT = process.env.PORT || 8080;

//DB connection
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.DBPASSWORD}@cluster0.dlkce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  // Starting a server
  .then(() => {
    app.listen(PORT);
    console.log("APP is listening to", PORT);
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
//My routes

app.use("/rec", recruiterRoutes);
app.use("/cand", candidateRoutes);
// app.use("/job", jobRoutes);
