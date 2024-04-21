const mongoose = require("mongoose");

const connnectToMongoDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to mongoDB");
    }
    catch(error){
        console.log("error connecting to MongoDB" , error.message);
    }
};
module.exports = connnectToMongoDB;