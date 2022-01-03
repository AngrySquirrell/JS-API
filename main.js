// const http = require("http")

// const server = http.createServer(function(req, res){
//     if (req.url === "/users"){
//         res.write("<h1> Hello world ! <h1>")
        
//     }
//     res.end()
// });

// const server = http.createServer(function(req, res){
//     switch (req.url){
//         case "/users":
//             res.write("<h1> Users <h1>")
//             break;
//         case "/items":
//             res.write("<h1> Items <h1>")
//             break;
//         default:
//             res.write("<h1> Default <h1>")
//     }
//     res.end()
// });

// const server = http.createServer(function(req, res){
//     res.setHeader("Content-Type","application/json")
//     switch (req.url){
//         case "/users":
//             res.write("[{id:1,firstname:'Guillaume'}]")
//             break;
//         case "/items":
//             res.write(JSON.stringify([{id:1,name:PS5}]))
//             break;
//         default:
//             res.write("<h1> Default <h1>")
//     }
//     res.end()
// });ç

const { INSPECT_MAX_BYTES } = require("buffer"); 
const http = require("http");

let item = [];
const server = http.createServer(function(req,res){
    res.setHeader("Content-Type","application/json")
    switch(req.method){
        case "GET": //Renvoye le tableau de la to-do liste  --DONE--
            res.write(JSON.stringify(item)) 
            break;

        case "POST": //Ajoute des données à la to-do liste  --DONE--
        req.on('data', chunk => {
            item.push(JSON.parse(chunk))
            console.log(item)
        })
        res.write("Done ADD")
            break;

        case "PUT": //Modifie des données à la to-do liste  --TODO--

            req.on('data', chunk => {
                Pchunk = JSON.parse(chunk)
                item.splice(Pchunk.id-1 , 4)

                res.write("Done SUPPR Modified")
                console.log('Done SUPPR Modified')

                item.push(JSON.parse(chunk))

                res.write("Done ADD Modified")
                console.log('Done ADD Modified')

                item.sort()

                res.write("Done SORT Modified")
                console.log('Done SORT Modified')
            })


            res.write(item)
            break;

        case "DELETE": //Suppr des données à la to-do list  --DONE--
            req.on('data', chunk => {
                Pchunk = JSON.parse(chunk)
                item.splice(Pchunk.id-1 , 4)
            
            })
            res.write("Done SUPPR")

            res.write(JSON.stringify(item))
            break;

        default:
            res.write(JSON.stringify('Error, no method given.'))
    }
    res.end()
})

server.listen(8080)

/*
{
    "id": 1,
    "name": "ma valeur"
}
{
    "id": 2,
    "name": "my value"
}
{
    "id": 3,
    "name": "my valzdsque"
}
{
    "id": 4,
    "name": ""
}
*/
