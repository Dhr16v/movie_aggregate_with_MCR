const data = require("../data.json");
const mongoose = require("mongoose");
const movieModel = require("../models/movie_model");

const postData = async (req, res) => {
  try {
    const data = req.body;

    await movieModel.insertMany(data);
    res.status(201).json({ status: 1, message: "Data saved successfully" });
  } catch (err) {
    console.error("Error while saving data:", err);
    res.status(500).json({
      status: 0,
      message: "Error while saving data",
      error: err.message,
    });
  }
};

module.exports = {postData};
