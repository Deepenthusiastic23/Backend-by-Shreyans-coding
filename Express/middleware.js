import express from "express"
  
const app = express ()

app.use((req, res, next) => {
   console.log("Middleware 1");
   next()
   
})

app.use((req, res, next) => {
  console.log("Middleware 2");
  
})

app.get ("/", (req, res) => {
  console.log("Router handler");
  res.send(success)  
})

app.listen(3005, () => {
  console.log("Server running on port 3000");
  
})
//  Custom logging middleware

function requestLogger(req, res, next){
  console.log(`${req.method}  ${req.originalUrl}`);
  next();
}

app.use(requestLogger)


//  Middleware that blocks an unauthorized request

function requireApiKey(req, res, next) {
  const apiKey = req.get("x-api-key");


  if (apiKey !== preoces.env.API_KEY) {
    return res.status(401).json ({
      success: false,
      message: "Invalid or missing API key"
    })
  }
  next ()
}