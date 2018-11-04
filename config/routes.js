var scrape = require("../scripts/scrape");
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");


module.exports = function(router) {
    router.get("/", function(req, res) {
        res.render("home");
    });

    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    router.get("/fetch", function(req, res) {
        headlinesController.fetch(function(err, docs) {
            if (!docs || docs.inseertedCount === 0) {
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
        headlinesController.get(query, function(data) {
            res.json(data);
        });
    });

    router.delete("/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    router.patch("/headlines", function(req, res) {
        headlinesController.update(req.body, function(err, data) {
            res.json(data);
        });
    });

    router.get("/notes/headline_id?", function(req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        notesController.get(query, function(err, data) {
            res.json(data);
        });
    });

    router.delete("/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    router.post("/notes", function(req, res) {
        notesController.save(req.body, function(data) {
            res.json(data);
        });
    });
    
}