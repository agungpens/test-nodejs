const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');


    response.statusCode = 200;
    // Handling Request
    const { method } = request;

    if (method == "GET") {
        response.end('<h1>Hello, HTTP Server GET!</h1>');
    }
    if (method == "POST") {

        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        });

        request.on('end', () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            response.end(`<h1>Hello,${name}</h1>`);
        });



    }
    if (method == "PUT") {
        response.end('<h1>Hello, HTTP Server PUT!</h1>');
    }
    if (method == "DELETE") {
        response.end('<h1>Hello, HTTP Server DELETE!</h1>');
    }

};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})

