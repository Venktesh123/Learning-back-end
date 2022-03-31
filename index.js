const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
//const { session } = require('passport/lib');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);
app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views','./views');
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
src:'./assets/scss',
dest:'./assets/css',
debug:true,
outputStyle:'extended',
prefix:'/css'

}));
//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*10*60)
    },
    store:new MongoStore({
        
            mongooseConnection:db,
            autoRemove:'disabled'
        
    },
    function(err)
    {
        console.log(err || 'conect mongo-db set up ok');
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));


app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error present");

    }
    console.log('Server is running on the port',port);
    
});
