var express = require('express');
var app = express();
var config = require('./config');
var Restaurant = require('./restaurant');
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

app.get('/api', function (req, res) { // name, rating, url, phone, image_url, display_address, coordinate
	
	var term = req.query.term;
	var cll = req.query.cll;
	var minimum_rating = req.query.minrat;

	var candidates = [];	

	yelp.search({ term: term, location: 'location', cll: cll })
	.then(function (data) {

		for (business of data.businesses) {

			if (business.rating >= minimum_rating) { 

				var newRestaurant = new Restaurant(
					business.name, 
					business.rating,
					business.url,
					business.phone,
					business.image_url,
					business.location.display_address,
					business.location.coordinate
				);

				candidates.push(newRestaurant);
			}
		}

		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(candidates));
	})
	.catch(function (err) {
		console.error(err);
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(err));
	});

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});