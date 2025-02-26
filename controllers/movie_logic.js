const movieModel = require("../models/movie_model");
const mongoose = require("mongoose");

const postData = async (req, res) => {
  try {  
      const data=await movieModel.insertMany(req.body);
      
      res.status(201).json({
          status: 1,
          message: "Data saved successfully in mongodb",
          data: data,
      });
  }
   catch (err) {
      console.error("Error while saving data:", err);
      res.status(500).json({
          status: 0,
          message: "Error while saving data",
          error: err.message,
      });
  }
};


//Get function
const top_movies=async(req,res)=>{
    let genre=req.query.genre;
  
     if(!genre)
     {
        res.status(501).json({status:0,message:"genre is required data and fill up"})
     }

     //Top 3 three movie find and sorting and limit apply
     //Note: use api key and search then string not allowed
     let topMoviesData= await movieModel.aggregate([
        {$match:{genre:genre}},
        {$sort:{rating:-1}},
        {$limit:3}]);

        //Get the data of 3 top movies
     res.json(topMoviesData);

   
}

//update data use
const update_data=async(req,res)=>{
  let movieId=req.params.id;

  let updateRes=await movieModel.updateOne({_id:movieId}); //updatelogic
  res.status(200).json({status:1,message:"Enquiry updated successfully",updateRes})
}

//delete data use
const delete_data=async(req,res)=>{
  let movieId=req.params.id;

  let deletedMovie=await movieModel.deleteOne({_id:movieId});
  res.status(200).json({status:1,message:"Enquiry deleted successfully",id:movieId,delRes:deletedMovie})
}

module.exports = {postData,top_movies,update_data,delete_data};
