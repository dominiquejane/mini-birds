var express = require('express'),
	bodyParser = require('body-parser'),
	mongojs = require('mongojs'),
	cors = require('cors'),
	port = 9001;

var app = express();
var db = mongojs('birds', ['sightings']); //name of app, and name of a collection

app.use(bodyParser.json());


app.get('/api/sighting', function (req, res) {
	db.sightings.find({}, function(err, results) {
		if(!err) {
			res.status(200).send(results);
		}
	})
});

app.post('/api/sighting', function (req, res) {
	db.sightings.insert(req.body, function (err, results) {
		if (!err) {
			console.log(results);
			res.status(201).end(); //use when you're not sending anything
		}
	})
});

app.put('/api/sighting/:id', function (req, res) {
	db.sightings.update({_id: mongojs.ObjectId(req.params.id)}, {$set: req.body}, function(err, results) {
		console.log(results);
		res.status(200).end();
	})
});

app.delete('/api/sighting/:id', function (req, res) {
	db.sightings.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, results){
		if(!err) { 
			console.log(results);
			res.status(200).end();
		}
	})
});


app.listen(port, function() {
	console.log("Listening on port", port);
});