var express = require('express'),
  timerRouter = require('./timerRouter'),
  router = express.Router();

router.get('/', function(request, response) {
  response.render('index', {
    title: 'ToxicTimer'
  });
});

router.use('/Timer', timerRouter);

module.exports = router;
