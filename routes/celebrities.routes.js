// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase} = req.body
        Celebrity.create({name, occupation, catchPhrase})
        .then(celebFromDB => console.log(`new celeb ${celebFromDB}`))
        .catch(err => {
            console.log('err', err)
        res.redirect('/celebrities/create')
        })
        res.redirect('/celebrities')
})

module.exports = router;
