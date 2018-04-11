const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const db = require('../db');
const router = express.Router();

/* GET users listing. */
router.get('/saveNews', function(req, res) {
    mongoClient.connect(db.url, function(err, client){
        var db = client.db('newsAPI');
        var collection = db.collection('saveNews');
        collection.find().toArray(function(err, results){
            res.send(results);
            client.close();
        });
    });
});

router.post('/saveNews', function(req, res) {
    mongoClient.connect(db.url, function(err, client){
        var db = client.db('newsAPI');
        var collection = db.collection('saveNews');
        collection.findOne(req.body, function(err, result){
            if(result){
                res.send('Новость уже сохранена');
            } else {
                res.send('Новость сохранена');
                collection.insertOne(req.body, function(err, result){});
            }
            client.close();
        });
    });
});

router.post('/deleteNews', function(req, res) {
    mongoClient.connect(db.url, function(err, client){
        var id = mongoose.Types.ObjectId(req.body._id);
        var db = client.db('newsAPI');
        var collection = db.collection('saveNews');
        collection.deleteOne({'_id': id}, function(err, result){
            res.send('Новость удаленна');
            client.close();
        });
    });
});

router.post('/addNews', function(req, res) {
    mongoClient.connect(db.url, function(err, client){
        var id = mongoose.Types.ObjectId(req.body._id);
        var db = client.db('newsAPI');
        var collection = db.collection('myNews');
        collection.insertOne(req.body, function(err, result){
            res.send('Новость добавлена');
        });
    });
});

router.get('/myNews', function(req, res) {
    mongoClient.connect(db.url, function(err, client){
        var db = client.db('newsAPI');
        var collection = db.collection('myNews');
        collection.find().toArray(function(err, results){
            res.send(results);
            client.close();
        });
    });
});

router.post('/deleteMyNews', function(req, res) {
    mongoClient.connect(db.url, function(err, client){
        var id = mongoose.Types.ObjectId(req.body._id);
        var db = client.db('newsAPI');
        var collection = db.collection('myNews');
        collection.deleteOne({'_id': id}, function(err, result){
            res.send('Новость удаленна');
            client.close();
        });
    });
});

module.exports = router;
