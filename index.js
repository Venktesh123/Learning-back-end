const express=require('express');
const app=express();
const port=8000;
app .listen(port,function(err)
{
    if(err)
    {
        console.log("Error present");

    }
    console.log('Server is running on the port',port);
    
})