const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const roomRoutes = require("./Rooms/routes");
const courseRoutes = require("./Courses/routes");
const campusRoutes = require("./Campus/routes");
const classesRoutes = require("./Classes/routes");
const teachersRoutes = require("./Teachers/routes");

const MONGODB_URI =
  "mongodb+srv://pierre:sEP6C4B90697701@cluster0.a4byf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(roomRoutes);
app.use(courseRoutes);
app.use(campusRoutes);
app.use(classesRoutes);
app.use(teachersRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })

  .catch((err) => {
    console.log(err);
  });
