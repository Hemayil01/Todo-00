const http = require("http")
const fs = require("fs")
const path = require('path')

const filePath = path.join(__dirname, './data.json');


const server = http.createServer(async (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json;" });


    if (req.url == "/") {
        const data = fs.readFileSync(filePath, 'utf8');
        res.end(data)
    }

    if (req.method == "POST" && req.url == "/") {

        let body = ""

        req.on("data", chunk => {
            body += chunk
        })

        req.on("end", () => {
            const data = JSON.parse(body) // post userin gonderdiyi todo
            const file = fs.readFileSync(filePath, 'utf8'); // akutal todular - 
            const todos = JSON.parse(file, null, 2)
            todos.push(data) // aktual dataya post userin gonderdyi datani push edirem
            // console.log(todos[]);

            // fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf8') // hemen daha daha aktuallasdirlmis datani filenin icine yaziram
            fs.writeFileSync(filePath, todos, 'utf8') // hemen daha daha aktuallasdirlmis datani filenin icine yaziram
        })
    }
})

server.listen(3000, () => {
    console.log("server 3000");
})