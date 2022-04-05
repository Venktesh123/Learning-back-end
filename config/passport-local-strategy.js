const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
// authentication by passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done)
{
User.findOne({email:email},function(err,user)
{
    if(err)
    {
        req.flash('error',err);
        return done(err);
    }
    if(!user || user.password!=password)
    {
        req.flash('error','Invalid Username/Password');
        return done(null,false);
    }
    return done(null,user);
});
}

));
//seriliazing the user to decide which key kept in the cookies

passport.serializeUser(function(user,done)
{
    done(null,user.id);
});
passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log('Error in finding user->passport');
            return done(err);
        }
        return done(null,user);
    });
});
module.exports=passport;


//dseriliazing the user from the key int the cookie
passport.checkAuthentication=function(req,res,next)
{
    // if the user signed in then pass on the request to the next function
    if(req.isAuthenticated())
    {
        return next();
    }
    //if user not signed in
    return res.redirect('/user/sign-in');
};
passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //req.user contains the current signed in user from the session cookie
      res.locals.user=req.user;
    }
    next();
}