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
            console.log(chunk);
            body += chunk
        })

        req.on("end", () => {
            const data = JSON.parse(body)
            console.log(data);

        })

    }

})

server.listen(3000, () => {
    console.log("server 3000");
})