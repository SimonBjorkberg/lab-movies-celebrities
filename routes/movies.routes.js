// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((celebs) => {
      res.render("movies/new-movie", { celebs });
    })
    .catch((err) => console.log("err", err));
});

router.post("/movies/create", (req, res) => {
    const selectedIds = req.body.selectedIds
    console.log(selectedIds)
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast: selectedIds })
    .then((movieFromDB) => console.log(`we created a movie ${movieFromDB}`))
    .catch((err) => {
      console.log("err", err);
      res.redirect("/");
    });
  res.redirect("/movies");
});

router.get('/movies', (req, res) => {
    Movie.find()
    .then(movies => {
        res.render('movies/movies', { movies })
    })
})

module.exports = router;
