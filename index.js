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

//
// Param validater
//
var isParametersValid = function(req, res) {
    var isParamValid =
        isNaN(Number(req.query.minrat)) ||
        Number(req.query.minrat) < 0 ||
        Number(req.query.minrat) > 5.0;

    if (isParamValid) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            statusCode: 400,
            data: {
                error: {
                    text: "minimum rating should be a number from 0.0 to 5.0",
                    id: "INVALID_PARAMETER",
                    field: "minrat"
                }
            }
        }));
        return false;
    }

    return true
};

//
// Return params:
//  name, rating, url, phone, image_url, display_address, coordinate
//
app.get('/v1/api', function(req, res) {
    if (!isParametersValid(req, res))
        return;

    var term = req.query.term;
    var location = req.query.location;
    var minimum_rating = req.query.minrat || 0.0;
    var num = req.query.num || 1;

    yelp_api.call_v1(term, location, minimum_rating, num, res);
});

//
// Return params:
//  same as /api
//
app.get('/v2/api', function(req, res) {

    if (!isParametersValid(req, res))
        return;

    var breakfast_term = req.query.breakfast_term || "";
    var lunch_term = req.query.lunch_term || "";
    var dinner_term = req.query.dinner_term || "";

    var location = req.query.location;
    var minimum_rating = req.query.minrat || 0.0;

    var query_object = {
        breakfast: breakfast_term,
        lunch: lunch_term,
        dinner: dinner_term
    };

    yelp_api.call_v2(query_object, location, minimum_rating, function(data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data.res));
    });
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

    var uuid = req.body.uuid;

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

        for (var i = 0; i < uuid.length; i++) {

            if (i == 0) query += " values";
            else query += ", ";

            for (var j = 1; j <= 9; j++) {
                if (j == 1) query += "($" + (j + i * 9);
                else if (j == 9) query += ", $" + (j + i * 9) + ")";
                else query += ", $" + (j + i * 9);
            }

            parameters.push(yelp_api.buffer[uuid[i]].name);
            parameters.push(yelp_api.buffer[uuid[i]].uuid);
            parameters.push(yelp_api.buffer[uuid[i]].rating);
            parameters.push(yelp_api.buffer[uuid[i]].url);
            parameters.push(yelp_api.buffer[uuid[i]].phone);
            parameters.push(yelp_api.buffer[uuid[i]].image_url);
            parameters.push(yelp_api.buffer[uuid[i]].display_address);
            parameters.push(yelp_api.buffer[uuid[i]].coordinate.latitude);
            parameters.push(yelp_api.buffer[uuid[i]].coordinate.longitude);

            delete yelp_api.buffer[uuid[i]];
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