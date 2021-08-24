//---------------Gestion des imports
let express = require("express")
let app = express()
const bodyParser = require('body-parser');
let https = require("https");
const fs = require('fs');
const path = require("path") 


let server = https.createServer(app)

let gitignore = require("./modules/gitignore.js")

// let { Pool, Client } = require('pg');
// let myDatabase = require("./modules/databaseConnect.js")

app.use(express.static(__dirname + "/dist"))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html")
})

app.get("/fr", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html")
})

app.get("/en", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html")
})

app.get("/mentions-legales/:lng", (req, res) => {
    PrepareBasicRoutes(req,res,"mentions")
})




app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + "/dist/404.html");
});



let port = 80
// Listen on port 8888
server.listen(port, function(){
    console.log("Listening at port : "+port)
});



//Preparing routes
function PrepareBasicRoutes(req,res,htmlFile){
    let lang = req.params.lng.slice(-2)
    if(lang != "fr" && lang != "en"){
        res.status(404).sendFile(__dirname + "/public-parcel/html/404.html");
    }else{
        res.sendFile(__dirname + "/dist/" + htmlFile+".html")
    }
}


