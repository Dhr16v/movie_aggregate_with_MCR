const express=require('express');
const router=express.Router();

const {postData}=require('../controllers/movie_logic');

router.route('/data-add').post(postData);



module.exports=router;