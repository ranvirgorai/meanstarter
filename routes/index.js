var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var $scope={title:'Mean Kick Starter Starter'}
  res.render('index', $scope);
});

module.exports = router;
