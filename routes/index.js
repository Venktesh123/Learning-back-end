const express=require('express');
const router=express.Router();
module.exports=router;
const homeController=require('../controller/homecontroller');
router.get('/',homeController.home);
console.log("router is loaded");