var phantom = require('phantom');


function createPrint(type, id){
  var url = 'http://127.0.0.1:9000/#/cards/'+type+'/print/'+id;

  phantom.create(function (ph) {
    ph.createPage(function (page) {
      //page.viewportSize = { width: 400, height: 717 };
      page.set('viewportSize', { width: 400, height: 717 })
      page.open(url, function (status) {
        console.log("opened google? ", status);
        page.set('clipRect', { top: 197, left: 15, width: (330), height: (500) });
        page.render('print/' + type + '.' + id + '.png');
        page.evaluate(function () { return document.title; }, function (result) {
          console.log('Page title is ' + result);
          setTimeout(function(){
            ph.exit();
          }, 2000);
          
        });
      });
    });
  });
}

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  switch (index){
    case 2:
      var type = val;
    case 3:
      var id = val;
  }
});

createPrint(process.argv[2], process.argv[3]);