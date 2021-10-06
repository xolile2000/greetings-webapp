const express = require("express")
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const greeting = require("./greetings");
const { request } = require('express');
const routes = require("./routes");

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
const greetRoutes = routes(greetings)

app.get("/",greetRoutes.home);

app.post("/greetings",greetRoutes.greet)

app.get("/greeted",greetRoutes.listName);

app.get("/counters/:enterName",greetRoutes.counter);

app.get("/removeName",greetRoutes.reset)



const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});

