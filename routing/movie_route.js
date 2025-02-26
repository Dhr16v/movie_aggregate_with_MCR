const express=require('express');
const router=express.Router();

const {postData,top_movies}=require('../controllers/movie_logic');

router.route('/data-add').post(postData);

router.route('/top-movies').get(top_movies);



module.exports=router;