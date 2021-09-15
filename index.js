const express = require("express")
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const flash = require('express-flash');
  const session = require('express-session');
  const pg = require("pg");
const greeting = require("./greetings");



const app = express();

app.engine('handlebars', exphbs({ layoutsDir: "views/layouts/" }));
app.set('view engine', 'handlebars');

const Pool = pg.Pool;

app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
  app.use(flash());


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings';
console.log(connectionString)

const pool = new Pool({
    connectionString,
    ssl : {
      rejectUnauthorized: false
    }
  });

  const greetings = greeting(pool)


app.get("/", function (req, res) {
    
    res.render("index",{
        greetMe: greetings.getMassage(),
        counter: greetings.greetingcounter()
    });  

});
    
   


app.post("/greetings",  async function (req, res) {

  var name1 = req.body.enterName;
  var lang = req.body.language;
 const names = await greetings.greetName({
   name : name1,
   language : lang 
 });
  console.log(names);
   
    

    

    if(!name1 || name1 === undefined ){
        req.flash('error1',"please enter name")
    }else{
        greetings.greetName(req.body.language,req.body.enterName)

    }
   



        res.redirect("/")
});


app.get("/greeted",  function(req,res){
  // const names = await greetings.getNames();
  // console.log(names);

res.render('greeted',{namelist : Object.keys(greetings.getNames())

});

});

app.get("/counters/:enterName",function(req,res){
let greetedNames = req.params.enterName
let counters = greetings.getNames()
	res.render("counters",{
      enterName : greetedNames,
        counter :counters[greetedNames]

    })
});



const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});

