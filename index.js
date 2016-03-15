var express = require('express');
var bodyParser = require('body-parser');
var yelp_api = require('./yelp_api');

var app = express();
app.use(bodyParser());

app.get('/', function (req, res) {
  res.send("Yelp Hackathon Backend Running...");
  res.end();
});

app.post('/test', function (req, res) {

	var term = req.body.term;
	var cll = req.body.cll;
	var minimum_rating = req.body.minrat;
	var accepted = req.body.accepted;
	var not_accepted = req.body.not_accepted;
	var num = 1;

	if (minimum_rating == undefined) minimum_rating = 0.0;
  	if (isNaN(Number(minimum_rating)) || Number(minimum_rating) < 0 || Number(minimum_rating) > 5.0) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify("{\"statusCode\":400,\"data\":\"{\"error\": {\"text\": \"minimum rating should be a number from 0.0 to 5.0\", \"id\": \"INVALID_PARAMETER\", \"field\": \"minrat\"}}\"}"));
		return;
	}

});



app.get('/api', function (req, res) { // name, rating, url, phone, image_url, display_address, coordinate
	
	var term = req.query.term;
	var cll = req.query.cll;
	var minimum_rating = req.query.minrat;
	var num = req.query.num;

	if (minimum_rating == undefined) minimum_rating = 0.0;
	if (num == undefined) num = 1;
	if (isNaN(Number(minimum_rating)) || Number(minimum_rating) < 0 || Number(minimum_rating) > 5.0) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify("{\"statusCode\":400,\"data\":\"{\"error\": {\"text\": \"minimum rating should be a number from 0.0 to 5.0\", \"id\": \"INVALID_PARAMETER\", \"field\": \"minrat\"}}\"}"));
		return;
	}

	yelp_api.call(term, cll, minimum_rating, num, res);

	// var candidates = [];	
	// var returnValues = [];

	// var queryObject = {};
	// if (term != undefined) queryObject.term = term;
	// queryObject.location = 'location';
	// queryObject.cll = cll;

	// yelp.search(queryObject)
	// .then(function (data) {

	// 	for (business of data.businesses) {

	// 		if (business.rating >= minimum_rating) { 

	// 			var newRestaurant = new Restaurant(
	// 				business.name, 
	// 				business.rating,
	// 				business.url,
	// 				business.phone,
	// 				business.image_url,
	// 				business.location.display_address,
	// 				business.location.coordinate
	// 			);

	// 			candidates.push(newRestaurant);
	// 		}
	// 	}

	// 	if (!_.isEmpty(candidates)) {
	// 		var random_index = _.random(0, _.size(candidates) - 1);
	// 		returnValue = candidates[random_index];
	// 	}

	// 	while(num > 0 && !_.isEmpty(candidates)) {
	// 		var random_index = _.random(0, _.size(candidates) - 1);
	// 		returnValues.push(candidates[random_index]);
	// 		candidates[random_index] = null;
	// 		num--;
	// 		candidates = _.compact(candidates);
	// 	}
		
	// 	res.setHeader('Content-Type', 'application/json');
	// 	res.send(JSON.stringify(returnValues));
	// })
	// .catch(function (err) {
	// 	console.error(err);
	// 	res.setHeader('Content-Type', 'application/json');
	// 	res.send(JSON.stringify(err));
	// });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});