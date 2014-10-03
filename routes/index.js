var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/page/:page', function(req, res) {
  res.render('page', {page:req.params.page});
});

module.exports = router;
