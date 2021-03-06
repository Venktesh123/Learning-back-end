const res = require('express/lib/response');
const User=require('../models/user');
module.exports.profile=function(req,res)
{User.findById(req.params.id,function(err,user){
   console.log('ABC');
     return res.render('userprofile',{
         title:'user',
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
     return res.redirect('/');
}
module.exports.destroySession=function(req,res)
{
     req.logout();
     return res.redirect('/');
}