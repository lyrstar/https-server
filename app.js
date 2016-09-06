'use strict';
/**
 * Created by sunpengfei on 16/9/6.
 */
var https = require('https');
var fs = require('fs');
var path = require('path');
var url = require('url');

var options = {
    key: fs.readFileSync(path.resolve(__dirname,'ssl/213784707430570.key')),
    cert: fs.readFileSync(path.resolve(__dirname,'ssl/213784707430570.pem'))
};
https.createServer(options, callback).listen(8082);


var tree = {
    'install.html' : fs.readFileSync(path.resolve(__dirname,'install.html')),
    'install.png' : fs.readFileSync(path.resolve(__dirname,'install.png')),
    'install.plist' : fs.readFileSync(path.resolve(__dirname,'install.plist'))

};

function route(req, res){
    console.log(req.url);

    res.writeHead(200);
    if(req.url === '/install.html'){
        res.end(tree['install.html']);
        return;
    }
    if(req.url === '/install.png'){
        res.end(tree['install.png']);
        return;
    }
    if(req.url === '/install.plist'){
        res.end(tree['install.plist']);
        return;
    }
    res.end('404');
}

function callback(req, res) {
    var data = '',
        reqUrl = decodeURIComponent(req.url),
        parse = url.parse(reqUrl, true),
        query = parse.query,
        path = parse.pathname;
    req.on('data', function(chunk) {
        data += chunk;
    });
    route(req, res);
    //res.writeHead(200);
    //res.end('hello world\n');
}

console.log('https://127.0.0.1:8082')
console.log('https://192.168.1.150:8082')