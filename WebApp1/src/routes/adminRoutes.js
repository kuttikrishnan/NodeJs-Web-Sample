var express = require('express');
var adminRouter = express.Router();

var mongo = require('../database/db.js');

var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false,
            image: 'Light.jpg'
        },
        {
            title: 'Les Misérables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            read: false,
            image :'Man-walking-away.jpg'
        },
        {
            title: 'The Time Machine',
            genre: 'Science Fiction',
            author: 'H. G. Wells',
            read: false,
            image:'Abandoned-bike-on-track-new.jpg'
        },
        {
            title: 'A Journey into the Center of the Earth',
            genre: 'Science Fiction',
            author: 'Jules Verne',
            read: false,
            image :'Man-walking-up-eerie-stairs.jpg'
        },
        {
            title: 'The Dark World',
            genre: 'Fantasy',
            author: 'Henry Kuttner',
            read: false,
            image:'Abandoned-wooden-boat.jpg'
        },
        {
            title: 'The Wind in the Willows',
            genre: 'Fantasy',
            author: 'Kenneth Grahame',
            read: false,
            image:'Circular-mirror.jpg'
        },
        {
            title: 'Life On The Mississippi',
            genre: 'History',
            author: 'Mark Twain',
            read: false,
            image:'Ornate-balcony.jpg'
        },
        {
            title: 'Childhood',
            genre: 'Biography',
            author: 'Lev Nikolayevich Tolstoy',
            read: false,
            image :'Creepy-branches.jpg'
        }
    ];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            mongo.connect(function(err){
               if(err) throw err;
                mongo.db.collection('books').insertMany(books,
                    function(err,results){
                        res.send(results);
                        mongo.db.close();
                    }
                                        
                )
            });
        });

    adminRouter.route('/deleteBooks').get(function(req,res){
        //db.books.remove({'_id':{'$in':[ObjectId('57b7e43d2703ad6f1417bf33'),ObjectId('57b7e43d2703ad6f1417bf34')]}})
        mongo.connect(function(err){
           if (err) throw err;
            mongo.db.collection('books').remove({});
        });
    });
    

    return adminRouter;
};

module.exports = router;