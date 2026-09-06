const express = require('express');
const { log } = require('node:console');
const app = express();

app.use(function(req, res , next){
    console.log("middleware chalao");
    next();
})

app.use(function(req, res, next){
  console.log('middleware chala ek aur baar');
  next()
  
})
app.get("/", function (req, res){
      res.send("champion mere anuj")
})



app.listen(3000)