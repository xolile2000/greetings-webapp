const express = require("express")
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const greeting = require("./greetings");

const app = express();
const greetings = greeting()
app.engine('handlebars', exphbs({ layoutsDir: "views/layouts/" }));
app.set('view engine', 'handlebars');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.render("index",{
        greetMe: greetings.getMassage(),
        counter: greetings.greetingcounter()
    });
});

app.post("/greetings", function (req, res) {

    greetings.greetName(

        req.body.language,
        req.body.enterName
    );


        res.redirect("/")
});

app.get("/greeted",function(req,res){
    // greetings.getNames()
// console.log()
res.render('greeted',{
    namelist : Object.keys(greetings.getNames())
})

});



const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});

