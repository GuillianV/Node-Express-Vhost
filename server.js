//---------------Gestion des imports
let express = require("express")
let http = require("https");
const { hostname } = require("os");

// let { Pool, Client } = require('pg');
// let myDatabase = require("./modules/databaseConnect.js")


let app = express()
let website_folder = 'websites'

//Virtual Hosting Gestion
const vhost = (hostname,app) => (req,res,next) => {
    const host = req.headers.host.split(':')[0]
    if(host === hostname){
        return app(req,res,next)
    }else{
        next()
    }
}

//Preparing routes
function PrepareBasicRoutes(req,res,htmlFile,name_folder,public_folder = "dist"){
    let lang = req.params.lng.slice(-2)
    if(lang != "fr" && lang != "en"){
        res.status(404).sendFile(__dirname +"/"+website_folder+"/"+name_folder+"/"+public_folder+"/404.html");
    }else{
        res.sendFile(__dirname +"/"+website_folder+ "/"+name_folder+ "/"+public_folder+"/" + htmlFile+".html")
    }
}



require('./websites/www.test1/test1.js')(app,express,vhost,PrepareBasicRoutes);
require('./websites/www.test2/test2.js')(app,express,vhost,PrepareBasicRoutes);


// Listen on port 8888
app.listen(8888, function(){
    console.log("Listening at port : "+8888)
});



