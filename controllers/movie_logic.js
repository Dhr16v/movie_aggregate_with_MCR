const movieModel = require("../models/movie_model");
const data = require("../data.json");
const mongoose = require("mongoose");


//Post function apply
const postData = async (req, res) => {
        const count=await movieModel.countDocuments();

        //if count is 0 then include the data ohter wise not stored
        if(count===0)
        {
            await movieModel.insertMany(data);
        }


        //Fetch the req.body data in the document and fetch
        let {title,rating,genre}=req.body;

        //If any field are miss then this error provides
        if(!title || !rating || !genre)
        {
            res.status(501).json({status:0,message:"All fields are requird to fill the all details not add the data"});
        }
  

        //Insert the model in movie create object insert the data
        let movie=new movieModel({
          title,
          rating,
          genre
        })
      
        //Save the data in mongodb
        movie.save().then(() => {
          res.status(201).json({ status: 1, message: "Data saved successfully",data:movie });
        })
        .catch((err) => {
          console.error("Error while saving enquiry:", err);
          res.status(500).json({ status: 0, message: "Error while saving data", error: err.message });
        });

};

//Get function
const top_movies=async(req,res)=>{
    let genre=req.query.genre;
    // console.log(genre);

    //If genre is not avable then message is provie
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

module.exports = {postData,top_movies};
