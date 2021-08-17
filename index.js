const express = require("express")
const app = express();

app.get("/",function(res,req){
    res.send("greetings web app")
});

app.post("/greetings",function(res,req){

});
 
const PORT = process.env.PORT || 3015;

app.listen(PORT,function(){
    console.log("App started at port:",PORT)
});

