const express = require("express");
const app = express();
const compression = require('compression')
const dbInitiation = require("./construct/dbs");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({path: "./.env"});
const userRoute = require("./routes/user");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require('cookie-parser');                            
const MemoryStore = require("memorystore")(session);
//set directory for views template files 
app.set('views', './views');
//set view engine
app.set('view engine', 'pug');
//middleware
app.use(compression())
app.use("/public", express.static(__dirname + "/public"));;
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(express.json());
require("./passport/local")(passport);

dbInitiation();

app.use(cookieParser())

const sessionStore = new MemoryStore({
   checkPeriod: 86400000
});

app.use(
session({
  secret: "somevalue",
  resave: true,
  saveUninitialized: true,
    key: "express.sid",
  store: sessionStore,  
}));
//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//use routes function 
userRoute(app);
 
app.listen(process.env.PORT, function(req, res) {
  console.log("app running on port:", process.env.PORT);
});
