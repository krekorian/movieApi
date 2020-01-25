var express = require('express');
var router = express.Router();

const movies = require('../data/movies')
const people = require('../data/people')
function queryRequired(req, res, next) {
    const searchTerm = req.query.query;
    if (!searchTerm) {
        res.json({ msg: "Query is required." })
    } else {
        next()
    }
}

router.use(queryRequired)

/* GET seatch page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express Search' });
    res.json("test")
});

router.get('/movie', (req, res, next) => {
    const searchTerm = req.query.query;
    const results = movie.filter((movie) => {

        let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm)
        return found
    })
    res.json(results)

})

router.get('/person', (req, res, next) => {
    const searchTerm = req.query.query;
    const results = people.filter((person) => {

        let found = person.name.includes(searchTerm)
        return found
    })
    res.json(results)
})

module.exports = router;
