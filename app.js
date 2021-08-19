const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv/config");

const roomRoutes = require("./Rooms/routes");
const courseRoutes = require("./Courses/routes");
const campusRoutes = require("./Campus/routes");
const classesRoutes = require("./Classes/routes");
const teachersRoutes = require("./Teachers/routes");
const userRoutes = require("./users/routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(roomRoutes);
app.use(courseRoutes);
app.use(campusRoutes);
app.use(classesRoutes);
app.use(teachersRoutes);
app.use(userRoutes);

mongoose
  .connect(process.env.DB_CONNECTION)
  .then((result) => {
    app.listen(3000);
  })

  .catch((err) => {
    console.log(err);
  });
