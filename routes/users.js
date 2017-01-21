var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('You R in User Page, Node Working Ok !');
});

module.exports = router;
