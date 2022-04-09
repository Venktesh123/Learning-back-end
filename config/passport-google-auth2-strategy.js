const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crpto=require('crypto');
const User=require('../models/user');
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
       clientID:"755619276071-snt6rcajerno6vds9j8av144fkvr18v9.apps.googleusercontent.com",
       clientSecret:"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",
       callbackURL:"http://localhost:8000/user/auth/google/callback"

},
  function(accessToken,refreshToken,profile,done)
  {
      User.findOne({email:profile.emails[0].value}).exec(function(err,user){
          if(err)
          {
              console.log('error in google strategy-passport',err);return;
          }
          console.log(accessToken,refreshToken);
          console.log('profile');
          if(user)
          {
              return done(null,user);
          }
          else{
              User.create({
                  name:profile.displayName,
                  email:profile.emails[0].value,
                  password:crpto.randomBytes(20).toString('hex')

              },function(err,user)
              {
                 if(err)
                 {
                     console.log('error in creating user google strategy-passport',err);return;
                 }
                 return(null,done);
              });
          }
          
      })
  }
));
module.exports=passport;