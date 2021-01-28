//import modules
const express = require("express")
const connectDB = require("./config/connectDB")
const app = express()

//create the schema
const User = require("./Models/User")


//setup env variables
require("dotenv").config({ path: "./config/.env" })
console.log(process.env.MONGO_URL)

//parse the data to JSON 
app.use(express.json())

//connect the DB
connectDB();


//CRUD

//Get all users
app.get("/api/users", (req, res) => {
    User.find()
        .then((users) => res.send({ msg: "GET the users", users }))
        .catch((err) => res.send({ msg: "THERE IS AN ERROR to get the User", err }))
})

//Get user by id
app.get("/api/users/:userID", (req, res) => {
    const userID = req.params.userID;
    User.findById(userID)
        .then((user) => {
            res.send({ msg: "Get the user by ID", user });
        })
        .catch((err) => res.send({ msg: "THERE IS AN ERROR to get the User by ID", err }))
})

//Post USER

app.post("/api/add_user", (req, res) => {
    const { name, lastName, email, phone } = req.body;
    const newUser = new User({ name, lastName, email, phone });
    newUser
        .save()
        .then((user) => res.send({ msg: "A new User is added !", user }))
        .catch((err) => res.send({ msg: "THERE IS AN ERROR to add the User", err }))
})

//Edit USER

app.put("/api/users/:userID", (req, res) => {
    const id = req.params.userID;
    User.findByIdAndUpdate(id, { ...req.body }, { new: true })
        .then((user) => res.send({ msg: "A new User is edited !", user }))
        .catch((err) => res.status(400).send({ msg: "THERE IS AN ERROR to edit the User", err }))
})

//Delete USER

app.delete("/api/users/:userID",(req,res)=>{
    const id = req.params.userID;
    User.findOneAndRemove(id)
    .then((user) => res.send({msg:"User is deleted",user}))
    .catch((err) => res.status(400).send({ msg: "THERE IS AN ERROR to delete the User", err }))
})





//start the server
const port = 6000;
app.listen(port, () => {
    console.log(`The server is runnnig on port ${port}`)
});