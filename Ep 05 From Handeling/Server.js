const express =  require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.send("champion mera anuj")
})

app.get("/about", function(req,res){
  res.send("aboout page hai ye ")
});


app.get("/profile", function(req, res, next){
  return next(new Error("Not implemented"));
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Somethig broke!")
  
})