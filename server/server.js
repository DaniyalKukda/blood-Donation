const express = require('express')
const app = express();
const db = require('./config/db');
// var cors = require('cors')
// app.use(cors)

app.listen(process.env.PORT || 3003,function(){
    console.log("Server Started Succesfully! 3003")
})
db.connection.once('open',()=>{
    console.log("Database Connected Successfully!")
}).on("error", error =>{
    // console.log("Database Connection Failed!",error)
})
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/',require('./routes/index.js'))
