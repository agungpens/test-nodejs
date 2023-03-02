const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('X-Powered-By', 'NodeJS');
    response.setHeader('Develop-By', 'Mas Agung');

    response.statusCode = 200;
    // Handling Request
    const { method, url } = request;


    if (url == '/') {
        if (method == "GET") { //curl -X GET http://localhost:5000/
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: "Halo! Ini adalah halaman Home"
            }));
        } else { // curl -X <any> http://localhost:5000/
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses menggunakan ${method} tersebut`,
            }));
        }

    } else if (url == '/about') {
        if (method == "GET") { // curl -X GET http://localhost:5000/about
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: "Halo! Ini adalah halaman about"
            }));
        } else if (method == "POST") { //curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Dimas\"}"

            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            });
            response.statusCode = 200;
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1>Hello,${name}, Ini Adalah About!!</h1>`);
            });



        }
    } else {// curl -X <any> http://localhost:5000/about
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: "Halaman tidak dapat diakses menggunakan method tersebut"
        }));
    }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})

