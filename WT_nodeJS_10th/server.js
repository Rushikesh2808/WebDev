const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    let filePath = './public' + req.url;

    // Default route
    if (req.url === '/') {
        filePath = './public/index.html';
    }

    // Get extension
    let ext = path.extname(filePath);

    // Set content type
    let contentType = 'text/html';

    if (ext === '.css') {
        contentType = 'text/css';
    }
    else if (ext === '.js') {
        contentType = 'text/javascript';
    }

    // Read file
    fs.readFile(filePath, (err, data) => {

        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("<h1>404 - Page Not Found</h1>");
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }

    });

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});