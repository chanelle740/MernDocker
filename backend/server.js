require("dotenv").config();

const express = require('express');
const cors = require('cors');
const db =  require("./models");
const { Swaggiffy } = require("swaggiffy");
const app = express();

var corsOptions ={
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.json({message:"Welcome"})
});

db.mongoose
  .connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(()=>{
    console.log("Successfully connected to database");
  })
  .catch(err=>{
    console.log("Cannot connect to database",err);
    process.exit();
  });
  require("./routes/tuto.route")(app);
const port = process.env.port || 8080;
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
new Swaggiffy().setupExpress(app).swaggiffy();