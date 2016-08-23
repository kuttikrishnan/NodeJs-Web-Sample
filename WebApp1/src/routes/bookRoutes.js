var express = require('express');
var mongo = require('../database/db.js');
var objectId = require('mongodb').ObjectID;

var bookCollection = 'books';
var booksListView ='bookListView';
var pageTitle ='Books' ;
var bookView = 'bookView';
var bookRouter = express.Router();

var router = function (nav) {

    bookRouter.use(function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });
    bookRouter.route('/')
        .get(function (req, res) {
             mongo.connect(function(err){
                    /* Handle any connection error here */
                    if (err) throw err;
                    mongo.db.collection(bookCollection).find({}).toArray(function (err, result){
                        if (result != null){
                             res.render(booksListView,{ title :pageTitle, books : result,  nav: nav,user : req.user});
                        }
                    });
                });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var Id = new objectId(req.params.id);
            mongo.connect(function(err){
                if (err) throw err;
                mongo.db.collection(bookCollection).findOne({_id : Id},
                        function (err, result){
                         if (result != null){
                             res.render(bookView,{ title : pageTitle , book : result , nav:nav});
                    }
                });
            });    
        });

    return bookRouter;
};
module.exports = router;