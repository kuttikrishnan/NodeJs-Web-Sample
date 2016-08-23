var express = require('express');
var mongo = require('../database/db.js');
var objectId = require('mongodb').ObjectID  ;
var authorRoute = express.Router();
var authorsCollection = 'authors';
var authorsListView = 'AuthorListView';
var authorView = 'AuthorView'
var pageTitle ='Authors'

var router = function (nav){
    authorRoute.route('/').get(function(req,res){
            mongo.connect(function(err){
                /* Handle any connection error here */
                if (err) throw err;
                mongo.db.collection(authorsCollection).find({}).toArray(function (err, result){
                    if (result != null){
                         res.render(authorsListView,{ title :pageTitle, authors : result,  nav: nav});
                    }
                });
            });
        
    });
    
    authorRoute.route('/:id').get(function(req,res){
            var Id = new objectId(req.params.id);
            mongo.connect(function(err){
                if (err) throw err;
                mongo.db.collection(authorsCollection).findOne({_id : Id},
                        function (err, result){
                         if (result != null){
                             res.render(authorView,{ title : pageTitle , author : result , nav:nav});
                    }
                });
            });
    });
  
    return authorRoute;
};

module.exports = router;