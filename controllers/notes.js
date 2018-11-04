var db = require("../models");
module.exports = {
  findOne: function(req, res) {
    db.Note
      .findOne(req.query)
      .then(function(dbNote) {
        res.json(dbNote);
    });
  },
  create: function(req, res) {
    db.Note
      .create(req.body)
      .then(function(dbNote) {
        res.json(dbNote);
    });
  },
  delete: function(req, res) {
    db.Note
      .remove({ _id: req.params.id })
      .then(function(dbNote) {
        res.json(dbNote);
    });
  }
};

// var Note = require("../models/Note");
// var makeDate = require("../scripts/date");

// module.exports = {
//     get: function(data, cb) {
//         Note.find({
//             _headlineId: data._id
//         }, cb);
//     },

//     save: function(data, cb) {
//         var newNote = {
//             _headlineId: data._id,
//             date: makeDate(),
//             noteText: data.noteText
//         };

//         Note.create(newNote, function(err, doc) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log(doc);
//                 cb(doc);
//             }
//         });
//     },
//     delete: function(data, cb) {
//         Note.remove ({
//             _id: data._id
//         }, cb);
//     }
// };