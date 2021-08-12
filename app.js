const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// const albumRoutes = require("./albums/routes");
// const categoryRoutes = require("./categories/routes");
// const songRoutes = require("./tracks/routes");
// const userRoutes = require("./users/routes");

const MONGODB_URI =
  "mongodb+srv://pierre:sEP6C4B90697701@cluster0.a4byf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(albumRoutes);
// app.use(categoryRoutes);
// app.use(songRoutes);
// app.use(userRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })

  .catch((err) => {
    console.log(err);
  });
