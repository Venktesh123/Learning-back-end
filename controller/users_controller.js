const res = require('express/lib/response');
const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res)
{User.findById(req.params.id,function(err,user){

     return res.render('userprofile',{
         title:'User Profile',
         profile_user:user,
         //isFriend:isFriend
     });
 })

  /*   if(req.cookies.user_id){
    User.findById(req.cookies.user_id,function(err,user){
     if(user)
    {
       return res.render('userprofile',{
            title:"User Profile",
            profile_user:user
       })
     }
     return res.redirect('/user/sign-in');
    });
    }
     else{
         return res.redirect('/user/sign-in');
    }*/
 
    }
    module.exports.update=async function(req,res)
    {
        // if(req.user.id==req.params.id)
        // {
          //    User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
             // {
             //      return res.redirect('back');
            //  })
        // }
         //else{
           //   return res.status(401).send('Unauthorized');
        // }
        if(req.user.id==req.params.id){
             try{
                  let user=await User.findById(req.params.id);
                  User.uploadedAvatar(req,res,function(err){
                       if(err)
                       {
                            console.log('*****Multer error :',err);
                       }
                    user.name=req.body.name;
                    user.email=req.body.email;
                    if(req.file)
                    {
                         if(user.avatar){
                              fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                         }
                         //this is saving the path of the uploaded file into the avtar field in the user
                         user.avatar=User.avatarPath + '/' +req.file.filename;
                    }
                    user.save();
                    return res.redirect('back');

                  });
             }catch(err){
                  req.flash('error',err);
                  return res.redirect('back');
             }
          }
          else{
               req.flash('error','Unauthorized');
               return res.status(401).send('Unauthorized');
          }
    }

module.exports.signUp=function(req,res){
     if(req.isAuthenticated())
     {
         return res.redirect('/user/profile');
     }
     return res.render('user_sign_up',{
          title:'Codeial | Sign up'
     })
};
//render the sign out page
module.exports.signIn=function(req,res)
{
     if(req.isAuthenticated())
     {
          return res.redirect('/user/profile');
     }
     return res.render('user_sign_in',{
          title:'Cdeial | sign in'
     })
};
//get the sign up data
module.exports.create=function(req,res){
if(req.body.password!=req.body.confirm_password)
{
     return res.redirect('back');
}
User.findOne({email: req.body.email},function(err,user)
{
     if(err)
     {
          console.log('error in finding user in signing up');return
     }
     if(!user)
     {
          User.create(req.body,function(err,user){
               if(err)
               {
                    console.log('error in creating user in signing up');return
               }
               return res.redirect('/user/sign-in');
          })
     }
     else{
          return res.redirect('back');
     }

})
};

/*
module.exports.createSession=function(req,res)
{
     User.findOne({email: req.body.email},function(err,user){
     if(err){console.log('error in creating user in signing in');return}
     if(user)
     {
     
         if(user.password!=req.body.password) {
              return res.redirect('back');
         }
         
         res.cookie('user_id',user.id);
         return res.redirect('/user/profile');
     }
     else{
          return res.redirect('back');
     }
     });
}
*/
module.exports.createSession=function(req,res){
     req.flash('success','Logged in sucessfully');
     return res.redirect('/');
}
module.exports.destroySession=function(req,res)
{
     req.logout();
     req.flash('success','You have logged out !');
     return res.redirect('/');
}