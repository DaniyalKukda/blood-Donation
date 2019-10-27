const mongoose = require("mongoose");

// const mongoURI = "mongodb+srv://sammadali:03132187752@cluster0-wap1h.mongodb.net/test?retryWrites=true&w=majority";
const URI = "mongodb+srv://blood:1997@cluster0-m4rcn.mongodb.net/test?retryWrites=true&w=majority";
// remove deprecation warning of collection.ensureIndex
mongoose.set('useCreateIndex', true);

// connect to mongodb
mongoose.connect(URI, {useNewUrlParser: true})

module.exports = mongoose;