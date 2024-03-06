// Create web server
// 1. Load modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comment = require('./comment.js');

// 2. Create server
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    if (filename == './comment') {
        if (req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var post = qs.parse(body);
                comment.addComment(post.comment);
                res.writeHead(302, {
                    'Location': '/'
                });
                res.end();
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write('<form action="comment" method="post">');
            res.write('<input type="text" name="comment">');
            res.write('<input type="submit">');
            res.write('</form>');
            res.end();
        }
    } else {
        fs.readFile(filename, function (err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                return res.end("404 Not Found");
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            return res.end();
        });
    }
}).listen(8080); 
// 3. Display the server address
// ...