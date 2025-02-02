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
  const selectedIds = req.body.selectedIds;
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast: selectedIds })
    .then((movieFromDB) => console.log(`we created a movie ${movieFromDB}`))
    .catch((err) => {
      console.log("err", err);
      res.redirect("/");
    });
  res.redirect("/movies");
});

router.get("/movies", (req, res) => {
  Movie.find().then((movies) => {
    res.render("movies/movies", { movies });
  });
});

router.get("/movies/:movieId", (req, res) => {
  Movie.findById(req.params.movieId)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => console.log("err", err));
});

router.post("/movies/:movieId/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log("err", err));
});

router.get("/movies/edit-movie/:movieId", (req, res) => {
  const movieProm = Movie.findById(req.params.movieId);
  const celebrityProm = Celebrity.find();

  Promise.all([movieProm, celebrityProm])
    .then(([movie, celebrity]) => {
      console.log(movie);
      res.render("movies/edit-movie", { movie, celebrity });
    })
    .catch((err) => console.log("err", err));
});

router.post("/movies/:movieId", (req, res) => {
  const updatedMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.findByIdAndUpdate(
    req.params.movieId,
    {
      title: updatedMovie.title,
      genre: updatedMovie.genre,
      plot: updatedMovie.plot,
      cast: updatedMovie.cast,
    },
    { new: true }
  ).then(() => {
    res.redirect('/movies')
  });
});

module.exports = router;
