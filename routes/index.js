const express=require('express');
const router=express.Router();
const Controller=require('../controller/homecontroller');
router.get('/',Controller.home);
router.use('/user',require('./user'));
console.log("router is loaded");
module.exports=router;