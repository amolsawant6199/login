const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const helmet = require("helmet");
const cors = require("cors");
const passport = require('passport');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

dotenv.config({path:path.resolve(__dirname,'./config.env')});
app.use(helmet()); // it is for security reason
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({
  extended: true
}));

const PORT = process.env.PORT;
var corsOptions = {
    origin: null,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
//   function logResponseBody(req, res, next) {
//     var oldWrite = res.write,
//         oldEnd = res.end;
  
//     var chunks = [];
  
//     res.write = function (chunk) {
//       chunks.push(new Buffer(chunk));
  
//       oldWrite.apply(res, arguments);
//     };
  
//     res.end = function (chunk) {
//       if (chunk)
//         chunks.push(new Buffer(chunk));
  
//       var body = Buffer.concat(chunks).toString('utf8');
//       console.log(req.path, body);
  
//       oldEnd.apply(res, arguments);
//     };
  
//     next();
//   }
// app.use(logResponseBody);
app.use(cors(corsOptions))

app.get('/api/amol',function(req,res,next){
  function pam() {
    var name = "Pam Beesly";
    function displayName() {
        console.log(name);
    }
    function setName(newName) {
        name = newName;
    }
    displayName();
    setName("Pam Halpert");
    displayName();
}
pam();
res.json({s:"hiii.. this is new one"});
});

const mongoose = require('mongoose');
const dbConfig = require('./config/db.config.js');
const userRoutes = require('./src/routes/routerMapping');

// using as middleware
// app.use(app.router);
app.use('/api', userRoutes);
mongoose.Promise = global.Promise;
// Connecting to the database

app.use(expressSession);

mongoose.connect(dbConfig.url, {
useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});
app.listen(PORT,()=>{
console.log("listen port",PORT);
})
