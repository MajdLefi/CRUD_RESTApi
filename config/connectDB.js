const mongoose = require("mongoose")

//connect the DB

function connectDB() {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    mongoose.connect("mongodb://localhost:27017/UsersDB",options)
    .then(()=>{
        console.log("The DB is connected...");
    })
    .catch((err) => console.log(err))
}

module.exports = connectDB ;