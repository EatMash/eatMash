var express = require('express');
var app = express();
var config = require('./config');
var Yelp = require('yelp');
var yelp = new Yelp({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  token: config.token,
  token_secret: config.token_secret
});

app.get('/', function (req, res) {
  res.send("Yelp Hackathon Backend Running...");
  res.end();
});

app.get('/api', function (req, res) {
	
	var term = req.query.term;
	var cll = req.query.cll;
	var minimun_rating = req.query.minrat;

	res.send(term + ", " + cll + ", " + minimun_rating);

	yelp.search({ term: term, location: 'location', cll: cll })
	.then(function (data) {
		console.log(data);
	})
	.catch(function (err) {
		console.error(err);
	});

	res.end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});