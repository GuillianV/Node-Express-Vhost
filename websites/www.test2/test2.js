require('../../server.js')

module.exports = function(app,express,vhost,PrepareBasicRoutes) {

    const cdn = [
        'localhost'
    ]

    const public_folder = 'dist'
    const name_folder = 'www.test2'

    let test2 = express()

    test2.use(express.static(__dirname + "/" + public_folder))

    test2.get("/", (req, res) => {
        res.sendFile(__dirname + "/"+public_folder+"/index.html")
    })

    
    test2.get("/fr", (req, res) => {
        res.sendFile(__dirname + "/"+public_folder+"/index.html")
    })

    test2.get("/en", (req, res) => {
        res.sendFile(__dirname + "/"+public_folder+"/index.html")
    })

    test2.get("/mentions-legales/:lng", (req, res) => {
        PrepareBasicRoutes(req,res,"mentions",name_folder,public_folder)
    })

    test2.get('*', function(req, res){
        res.status(404).sendFile(__dirname + "/"+public_folder+"/404.html");
    });
   
    app.use(vhost(cdn[0],test2))

};