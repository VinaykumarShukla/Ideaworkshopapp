const express = require('express');

const serverConfig = require('./configs/server.config');

const mongoose = require('mongoose');

const dbconfig = require('./configs/db.config');
const userModel = require('./models/user.model');
const bcrypt = require('bcrypt');

const app = express();


/**
 * Logic to connect to MongoDB and create an ADMIN User
 * Need to have the mongoDB up and running in your local machine
 */

mongoose.connect(dbconfig.DB_URL) ;
const db = mongoose.connection ;

db.on("error", ()=>{
    console.log("Error while connecting DB") ;

});

db.once("open", ()=>{
    console.log("DB is connected") ;
})

app.listen(serverConfig.PORT, ()=>{
    console.log(`server strated on the port number ${serverConfig.PORT}`)
})

async function  init(){
    
    /**
     * Check if the admin user is already present
     */
    let admin = await userModel.findOne({
        userId : "admin"
    })

    if(admin){
        console.log("Admin user already present");
        return;
    }

    admin = await userModel.create( {
        name : "Vinaykumar Shukla",
        userId : "admin",
        email : "goldshukla055@gmail.com",
        userType : "ADMIN",
        password : bcrypt.hashSync("Welcome1",8)
    });
    console.log(admin);

    
}



app.listen(serverConfig.PORT, ()=>{
    console.log(`server started on the port number ${serverConfig.PORT}` );
})


