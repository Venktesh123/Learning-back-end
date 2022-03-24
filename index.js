const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);
app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error present");

    }
    console.log('Server is running on the port',port);
    
});
