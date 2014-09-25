var shell = require('shelljs');
var fs = require('fs');
var path = require('path');

console.log('path', path.resolve(process.cwd(), 'data', 'events'));
fs.readdir(path.resolve(process.cwd(), 'data', 'events'), function(err, files){
  //console.log('files',files);
  files.forEach(function(file){
    if (file.substr(0,1) !== '_' &&
        file.split('.')[1] === 'json'){
      console.log('file:', file);
      shell.exec('node lib/print events ' + file.split('.')[0]);
    }
  });
});

//shell.exec('node lib/print heroes developer');