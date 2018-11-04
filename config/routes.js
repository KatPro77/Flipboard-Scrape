// var router = require("express").Router();
// var apiRoutes = require("../config/api");
// var viewRoutes = require("./view");

// router.use(apiRoutes);
// router.use("/", viewRoutes);

// module.exports = router;

var scrape = require("../scripts/scrape");
var Headline = require("../controllers/headlines");
var Note = require("../controllers/notes");


module.exports = function(router) {
    router.get("/", function(req, res) {
        res.render("home");
    });

    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    router.get("/fetch", function(req, res) {
        Headline.fetch(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No news today! Come back later!"
                });
            }
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });

    router.get("/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        Headline.get(query, function(data) {
            res.json(data);
        });
    });

    router.delete("/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        Headline.delete(query, function(err, data) {
            res.json(data);
        });
    });

    router.patch("/headlines", function(req, res) {
        Headline.update(req.body, function(err, data) {
            res.json(data);
        });
    });

    router.get("/notes/headline_id?", function(req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        Note.get(query, function(err, data) {
            res.json(data);
        });
    });

    router.delete("/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        Note.delete(query, function(err, data) {
            res.json(data);
        });
    });

    router.post("/notes", function(req, res) {
        Note.save(req.body, function(data) {
            res.json(data);
        });
    });
    
}