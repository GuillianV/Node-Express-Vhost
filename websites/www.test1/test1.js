require('../../server.js')

module.exports = function(app,express,vhost,PrepareBasicRoutes) {

    const cdn = [
        'localhost1'
    ]

    const public_folder = 'dist'
    const name_folder = 'www.test1'

    let test1 = express()

    test1.use(express.static(__dirname + "/" + public_folder))

    test1.get("/", (req, res) => {
        res.sendFile(__dirname + "/"+public_folder+"/index.html")
    })

    test1.get("/fr", (req, res) => {
        res.sendFile(__dirname + "/"+public_folder+"/index.html")
    })

    test1.get("/en", (req, res) => {
        res.sendFile(__dirname + "/"+public_folder+"/index.html")
    })

    test1.get("/mentions-legales/:lng", (req, res) => {
        PrepareBasicRoutes(req,res,"mentions",name_folder,public_folder)
    })

    test1.get('*', function(req, res){
        res.status(404).sendFile(__dirname + "/"+public_folder+"/404.html");
    });

   
    app.use(vhost(cdn[0],test1))

};