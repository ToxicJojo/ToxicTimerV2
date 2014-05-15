var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'))
  .set('view engine', 'jade');


app.use(express.static(path.join(__dirname, '../WebContent')));
app.use(require('./routes/mainRouter'));
app.use(function(request, response) {
  response.render('404', {
    title: '404 - Not Found',
    url: request.originalUrl
  });
});


app.listen(8080);
