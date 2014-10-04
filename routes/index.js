var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/page/:page', function(req, res) {
    res.render('page', {
        page:req.params.page,
        pages:[
            {id:1,label:"The Web"},
            {id:2,label:"Web servers"},
            {id:3,label:"Evaluation"},
            {id:4,label:"Code"}
        ]
    });
});

module.exports = router;
