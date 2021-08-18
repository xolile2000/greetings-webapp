const express = require("express")
const exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");


const app = express();
app.engine('handlebars', exphbs({ layoutsDir: "views/layouts/" }));
app.set('view engine', 'handlebars');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get("/",function(req,res){
    res.render("index"); 
})

app.post("/greetings",function(req,res){

});
 
const PORT = process.env.PORT || 3015;

app.listen(PORT,function(){
    console.log("App started at port:",PORT)
});

