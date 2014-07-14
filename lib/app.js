var express = require('express');
var path = require('path');
var fs = require('fs');
var q = require('q');
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

var getDirectoryContent = function (dirPath) {
  var defered = q.defer();

  fs.readdir(dirPath, function (error, content) {
    if (error) {
      defered.reject(error);
    }
    else {
      defered.resolve(content);
    }
  });

  return defered.promise;
}

var getFilesContent = function (dirPath) {
  var mainDefered = q.defer(),
      promises = [],
      contents = [];

  getDirectoryContent(dirPath)
  .then(function (files) {
    for(var index in files) {
      var file = files[index],
          defered = q.defer(),
          filePath = dirPath + path.sep + file;

//       getFileContent(filePath)
//       .then(function (content) {
//         contents.push(content);
//         defered.resolve(content);
//       })
//       .catch(function (error) {
//         defered.reject(error);
//       });

      //promises.push(defered.promise);
      promises.push(getFileContent(filePath)
      .then(function (content) {
        contents.push(content);
        defered.resolve(content);
      })
      .catch(function (error) {
        defered.reject(error);
      }));
    }

    console.log(promises);
    q.allSettled(promises)
    .then(function (results) {
      console.log(results,'RESOLVED');
      mainDefered.resolve(contents);
    });
  })
  .catch(function (error) {
    mainDefered.reject(error);
  });

  return mainDefered.promise;
}

var getFileContent = function (filePath) {
  var defered = q.defer();

  fs.readFile(filePath, {encoding:'utf8'}, function (error, content) {
    if (error) {
      defered.reject(error);
    }
    else {
      defered.resolve(content);
    }
  });

  return defered.promise;
}

var sendResponse = function (response, body, statusCode, statusText) {
  statusCode = statusCode || 200;
  statusText = statusText || 'OK';

  _setHeader(response);
  response.writeHead(statusCode, statusText, {'content-type':'application/json'})
  response.write(JSON.stringify(body));
  response.end();
}

//get available files
app.get('/data',function(req, res){
  _setHeader(res);
  res.setHeader("Content-Type", "application/json");

  var fpath = path.join('.', 'data');

  getDirectoryContent(fpath)
  .then(function (content) {
    sendResponse(res, content);
  })
  .catch(function (error) {
    var content = error + ': ' + error.stack;
    sendResponse(res, content, 500, 'Server Error');
  });
});

//get all file contents
app.get('/data/:type',function(req, res){
  _setHeader(res);
  res.setHeader("Content-Type", "application/json");

  var fpath = path.join('.', 'data', req.params.type);

  getFilesContent(fpath)
  .then(function (content) {
    sendResponse(res, content);
  })
  .catch(function (error) {
    var content = error + ': ' + error.stack;
    sendResponse(res, content, 500, 'Server Error');
  });
});

//get file
app.get('/data/:type/:filename',function(req, res){
  _setHeader(res);
  res.setHeader("Content-Type", "application/json");

  var filename = req.params.filename + '.json',
      fpath = path.join('.', 'data', req.params.type, filename);

  getFileContent(fpath)
  .then(function (content) {
    console.log(content);
    sendResponse(res, content);
  })
  .catch(function (error) {
    var content = error + ': ' + error.stack;
    sendResponse(res, content, 500, 'Server Error');
  });
});

//post preflight
app.options('/data/:type/:filename',function(req, res){
  _setHeader(res);
  res.end();
});

//post file
app.post('/data/:type/:filename',function(req, res){
  _setHeader(res);

  var body = '',
      filename = req.params.filename + '.json',
      fpath = path.join('.', 'data', req.params.type, filename);
  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function (){
    fs.writeFile(fpath, body, function(error) {
      if (error) {
        var content = error + ': ' + error.stack;
        sendResponse(res, content, 500, 'Server Error');
      }
      else {
        sendResponse(res, {status: 'saved', filename: fpath});
      }
    });
  });
});

app.listen(port);
console.log('Listening on port '+port);
