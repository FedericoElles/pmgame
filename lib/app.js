var express = require('express');
var fs = require('fs');
var app = express();
var port = 8080;

app.get('/', function(req, res){
  res.send('OK');
});


var _setHeader = function(res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

//get available files
app.get('/dir',function(req, res){
  _setHeader(res);
  res.setHeader("Content-Type", "application/json");
  
  var files = fs.readdirSync('./docs');
  res.send(JSON.stringify(files));
});

//get file
app.get('/file/:filename',function(req, res){
  _setHeader(res);
  res.setHeader("Content-Type", "application/json");
  
  var file = fs.readFileSync('./docs/'+req.params.filename);
  res.send(file);
});

//post preflight
app.options('/file/:filename',function(req, res){
  _setHeader(res);
  res.end();
});

//post file
app.post('/file/:filename',function(req, res){
  _setHeader(res);
  
 var body = '';
  filePath = './docs/'+req.params.filename;
  req.on('data', function(data) {
      body += data;
  });

  req.on('end', function (){
      fs.writeFile(filePath, body, function() {
          res.end();
      });
  });
});

app.listen(port);
console.log('Listening on port '+port);
