const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const helmet = require("helmet");
const cors = require("cors");
dotenv.config({path:path.resolve(__dirname,'./config.env')});
app.use(helmet()); // it is for security reason
const PORT = process.env.PORT;
var corsOptions = {
    origin: null,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  function logResponseBody(req, res, next) {
    var oldWrite = res.write,
        oldEnd = res.end;
  
    var chunks = [];
  
    res.write = function (chunk) {
      chunks.push(new Buffer(chunk));
  
      oldWrite.apply(res, arguments);
    };
  
    res.end = function (chunk) {
      if (chunk)
        chunks.push(new Buffer(chunk));
  
      var body = Buffer.concat(chunks).toString('utf8');
      console.log(req.path, body);
  
      oldEnd.apply(res, arguments);
    };
  
    next();
  }
app.use(logResponseBody);
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
app.listen(PORT,()=>{
console.log("listen port",PORT);
})
