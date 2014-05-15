var express = require('express'),
  router = express.Router();

router.get('/', function(request, response) {
  response.render('timer', {
    title: 'ToxicTimer - Timer'
  });
});

module.exports = router;
