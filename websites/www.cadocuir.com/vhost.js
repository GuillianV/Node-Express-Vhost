const { response } = require('express');

require('../../server.js')

module.exports = function (app, express, vhost, PrepareBasicRoutes) {

    const cdn = [
        'localhost',
        'www.cadocuir.com',
        'cadocuir.com',
        'www.maroquinerie-maniglier.fr',
        'maroquinerie-maniglier.fr',

    ]

    const public_folder = 'dist'
    const name_folder = 'www.cadocuir.com'

    let cadocuir_com = express()


    cadocuir_com.use(function (req, res, next) {
        if(req.headers.host.substring(0,4).includes('www.')){

            let host = req.headers.host
            res.redirect('https://' + host.slice(4) + req.url);
           
        }else{
            next()
        }
    });   

    cadocuir_com.use(express.static(__dirname + "/" + public_folder))


    cadocuir_com.get("/", (req, res) => {
        res.sendFile(__dirname + "/" + public_folder + "/index.html")
    })

    cadocuir_com.get("/fr", (req, res) => {
        res.sendFile(__dirname + "/" + public_folder + "/index.html")
    })

    cadocuir_com.get("/en", (req, res) => {
        res.sendFile(__dirname + "/" + public_folder + "/index.html")
    })

    cadocuir_com.get("/mentions-legales/:lng", (req, res) => {
        PrepareBasicRoutes(req, res, "mentions", name_folder, public_folder)
    })

    cadocuir_com.get('*', function (req, res) {

        res.status(404).sendFile(__dirname + "/" + public_folder + "/404.html");

    });



    app.use(vhost(cdn, cadocuir_com))


    let cert = {
        key: 'key.pem',
        cert: 'cert.pem'
    }
    return [cdn, cert]

};