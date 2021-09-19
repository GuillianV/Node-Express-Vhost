//---------------Gestion des imports
let express = require("express")
let https = require("https");
let http = require("http");
const path = require("path")
const fs = require('fs');

let app = express()
// let { Pool, Client } = require('pg');
// let myDatabase = require("./modules/databaseConnect.js")



// ------------ Variable de configuration -----------
let website_folder = 'websites'
let certificate_folder = 'cert';
let vhost_file = 'vhost.js'
let websites = fs.readdirSync('./' + website_folder);

let IsOnline = false;
let offlinePort = 8888;




let server = http.createServer(app)
let httpsServer = https.createServer({}, app)



httpsServer.listen(443, function () {
    console.log("Listening https")
});

server.listen(offlinePort, function () {
    console.log("Listening http")
});

if(IsOnline){
    app.use(function (req, res, next) {
        if (!req.secure) {
            res.redirect('https://' + req.headers.host + req.url);
        } else {
            next()
        }
    });    
}




//Virtual Hosting Gestion
const vhost = (hostname, app) => (req, res, next) => {
    const host = req.headers.host.split(':')[0]
    for (_host of hostname) {
        if (host === _host) {


            
            return app(req, res, next)



        }
    }
    next()
}

//Preparing routes
function PrepareBasicRoutes(req, res, htmlFile, name_folder, public_folder = "dist") {
    let lang = req.params.lng.slice(-2)
    if (lang != "fr" && lang != "en") {
        res.status(404).sendFile(__dirname + "/" + website_folder + "/" + name_folder + "/" + public_folder + "/404.html");
    } else {
        res.sendFile(__dirname + "/" + website_folder + "/" + name_folder + "/" + public_folder + "/" + htmlFile + ".html")
    }
}



for (const website of websites) {

    const vhost_path = "./" + website_folder + "/" + website + "/" + vhost_file
    if (fs.existsSync(vhost_path)) {
        let websiteVhost = require(vhost_path)(app, express, vhost, PrepareBasicRoutes);

        if (websiteVhost[0] != null && websiteVhost[1] != null) {
            let credentials = {}
            if (websiteVhost[1].key != null && websiteVhost[1].cert != null) {

                credentials.key = fs.readFileSync(path.join(__dirname + "/" + website_folder + "/" + website + "/", certificate_folder, websiteVhost[1].key));
                credentials.cert = fs.readFileSync(path.join(__dirname + "/" + website_folder + "/" + website + "/", certificate_folder, websiteVhost[1].cert));

            } else if (websiteVhost[1].pfx != null && websiteVhost[1].passphrase != null) {
                credentials.pfx = fs.readFileSync(path.join(__dirname + "/" + website_folder + "/" + website + "/", certificate_folder, websiteVhost[1].pfx));
                credentials.passphrase = websiteVhost[1].passphrase;
            } else {

            }
            for (let CN of websiteVhost[0]) {
                httpsServer.addContext(CN, credentials)
            }
        }

    }

}





