var express = require('express');
var bodyParser = require('body-parser');
var yelp_api = require('./yelp_api');
var Restaurant = require('./restaurant');
var config = require('./config');
var pg = require('pg');

var PORT = process.env.PORT || 3000;

var app = express();
app.use(bodyParser());

app.get('/', function(req, res) {
    res.send("Yelp Hackathon Backend Running...");
    res.end();
});

// app.post('/test', function (req, res) {

// 	var term = req.body.term;
// 	var cll = req.body.cll;
// 	var minimum_rating = req.body.minrat;
// 	var accepted = req.body.accepted;
// 	var not_accepted = req.body.not_accepted;
// 	var num = 1;

// 	if (minimum_rating == undefined) minimum_rating = 0.0;
//   	if (isNaN(Number(minimum_rating)) || Number(minimum_rating) < 0 || Number(minimum_rating) > 5.0) {
// 		res.setHeader('Content-Type', 'application/json');
// 		res.send(JSON.stringify("{\"statusCode\":400,\"data\":\"{\"error\": {\"text\": \"minimum rating should be a number from 0.0 to 5.0\", \"id\": \"INVALID_PARAMETER\", \"field\": \"minrat\"}}\"}"));
// 		return;
// 	}

// });

app.get('/api', function(req, res) { // name, rating, url, phone, image_url, display_address, coordinate

    var term = req.query.term;
    var location = req.query.location;
    var minimum_rating = req.query.minrat;
    var num = req.query.num;

    if (minimum_rating == undefined) minimum_rating = 0.0;
    if (num == undefined) num = 1;
    if (isNaN(Number(minimum_rating)) || Number(minimum_rating) < 0 || Number(minimum_rating) > 5.0) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify("{\"statusCode\":400,\"data\":\"{\"error\": {\"text\": \"minimum rating should be a number from 0.0 to 5.0\", \"id\": \"INVALID_PARAMETER\", \"field\": \"minrat\"}}\"}"));
        return;
    }

    yelp_api.call(term, location, minimum_rating, num, res);

});

app.get('/api/mashups', function(req, res) {

    var num = req.query.num;
    var results = [];

    pg.connect(config.connectionString, function(err, client, done) {

        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        var query = client.query("select * from mashups order by timestamp desc limit " + num);

        query.on('row', function(row) {

            var coordinate = {};
            coordinate.latitude = row.latitude;
            coordinate.longitude = row.longitude;

            var newRestaurant = new Restaurant(
                row.name,
                row.rating,
                row.url,
                row.phone,
                row.image_url,
                row.display_address,
                coordinate
            );
            results.push(newRestaurant);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

app.post('/api/confirm', function(req, res) {

    var mashups = req.body.mashups;

    pg.connect(config.connectionString, function(err, client, done) {

        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        var query = "INSERT INTO mashups(name, uuid, rating, url, phone, image_url, display_address, latitude, longitude) ";
        var parameters = [];

        for (var i = 0; i < mashups.length; i++) {

            if (i == 0) query += " values";
            else query += ", ";

            for (var j = 1; j <= 9; j++) {
                if (j == 1) query += "($" + (j + i * 9);
                else if (j == 9) query += ", $" + (j + i * 9) + ")";
                else query += ", $" + (j + i * 9);
            }

            parameters.push(mashups[i].name);
            parameters.push(mashups[i].uuid);
            parameters.push(mashups[i].rating);
            parameters.push(mashups[i].url);
            parameters.push(mashups[i].phone);
            parameters.push(mashups[i].image_url);
            parameters.push(mashups[i].display_address);
            parameters.push(mashups[i].coordinate.latitude);
            parameters.push(mashups[i].coordinate.longitude);
        }

        client.query(query, parameters, function(err, result) {
            if (err) {
                console.log(err);
                return;
            }

            client.end();
            res.status(200).json({
                success: true
            });
            return;
        });
    });
});

app.listen(PORT, function() {
    console.log('running...');
});