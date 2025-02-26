const express=require('express');
const router=express.Router();

const {postData,top_movies,update_data,delete_data}=require('../controllers/movie_logic');

router.route('/data-add').post(postData);

router.route('/top-movies').get(top_movies);

router.route('/data-update/:id').put(update_data);

router.route('/data-delete/:id').delete(delete_data);



module.exports=router;