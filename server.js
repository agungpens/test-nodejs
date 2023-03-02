const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');


    response.statusCode = 200;
    // Handling Request
    const { method, url } = request;


    if (url == '/') {
        if (method == "GET") { //curl -X GET http://localhost:5000/
            response.end('<h1>Ini Adalah Homepage!</h1>');
        } else { // curl -X <any> http://localhost:5000/
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
        }

    } else if (url == '/about') {
        if (method == "GET") { // curl -X GET http://localhost:5000/about
            response.end('<h1>Ini Adalah About!</h1>');
        } else if (method == "POST") { //curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Dimas\"}"

            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1>Hello,${name}, Ini Adalah About!!</h1>`);
            });



        } else {// curl -X <any> http://localhost:5000/about
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
        }
    }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})

