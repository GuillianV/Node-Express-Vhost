//---------------Gestion des imports
let express = require("express")
let http = require("https");
const fs = require('fs');

// let { Pool, Client } = require('pg');
// let myDatabase = require("./modules/databaseConnect.js")




let app = express()
let website_folder = 'websites'
let websites = fs.readdirSync('./'+website_folder);
let vhost_file = 'vhost.js'


//Virtual Hosting Gestion
const vhost = (hostname,app) => (req,res,next) => {
    const host = req.headers.host.split(':')[0]
    for(_host of hostname){
        if(host === _host){
            return app(req,res,next)
        }
    }
    next()
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



for (const website of websites) {

    const vhost_path = "./"+website_folder+"/"+website+"/"+vhost_file
    if(fs.existsSync(vhost_path)){
        require(vhost_path)(app,express,vhost,PrepareBasicRoutes);
    }

}


// Listen on port 8888
app.listen(80, function(){
    console.log("Listening at port : "+80)
});



