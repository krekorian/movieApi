var express = require('express');
var router = express.Router();

/* GET seatch page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express Search' });
});

module.exports = router;
