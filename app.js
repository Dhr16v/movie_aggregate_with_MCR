const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const movie_router=require('./routing/movie_route')


const app = express();

app.use(express.json());//automatic parse the data

//middleware use to route fetch 
//Note:/api/after route path include
app.use('/api',movie_router);


//mongoose connect to mongodb
mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to mongoDB");

    app.listen(process.env.PORT, () => {
      console.log("Server is running on port:" + process.env.PORT);
    });
  }).catch((err) => {
    console.error("MongoDB connection error:", err);
});
