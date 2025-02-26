const mongoose=require('mongoose');

//schema design movies rating

const movieRatingschema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        genre:{
            type:String,
            required:true
        }
    }
)

const movieModel=mongoose.model("movieData",movieRatingschema);

module.exports=movieModel;