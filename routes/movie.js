var express = require('express');
var router = express.Router();

/* GET movie page. */
// router.get('/', function (req, res, next) {
//     res.render('index', { title: 'Express Movie' });
// });

const movieDetails = require('../data/movieDetails')

function requireJSON(req, res, next) {
    if (!req.is('application/json')) {
        res.json({ msg: "COntent type must be application/json" })
    } else {
        next()
    }
}

router.param(('movieId'), (req, res, next) => {
    console.log('Someone hit a route that used the movieId wildcard')
    next();
})

router.get('/top_rated', (req, res, next) => {
    console.log('entering /top_rated')
    let page = req.query.page;
    // console.log('movieDetails')
    // console.log(movieDetails)
    console.log('page under /top_rated')
    console.log(page)
    if (!page || page == undefined) { page = 1; }
    console.log('entering if under  "/top_rated"')
    const results = movieDetails.sort((a, b) => {
        console.log('entering sorting under /top_rated')
        return b.vote_average - a.vote_average
    });
    const indexToStart = (page - 1) * 20;
    res.json(results.slice(indexToStart, page + 20));
})


router.get('/:movieId', (req, res, next) => {
    console.log('entering /:movieId')
    const movieId = req.params.movieId;
    const results = movieDetails.find((movie) => {
        return movie.id == movieId;
    })
    if (!results) {
        res.json({
            msg: "Movie ID invalid",
            production_companies: []
        })
    } else {
        res.json(results)
    }

})

router.post(('/:movieId/rating'), requireJSON, (req, res, next) => {
    const movieId = req.params.movieId;
    // console.log(req.get('content-type'))
    const userRating = req.body.value;
    if ((userRating < 0.5) || (userRating > 10)) {
        res.json({ msg: "Rating must be between 0.5 and 10" })
    } else {
        res.json({
            msg: "Thank you for submitting your rating.",
            status_code: 200
        })
    }
})

router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
    res.json({ msg: "Rating deleted" })
})

module.exports = router;
