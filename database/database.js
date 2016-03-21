var pg = require('pg');
var config = require('../config');
var client = new pg.Client(config.connectionString);

client.connect();
var query = client.query('CREATE TABLE mashups(id SERIAL PRIMARY KEY, name VARCHAR(40), uuid VARCHAR(40),rating real,url VARCHAR(40),phone VARCHAR(40),image_url VARCHAR(40),display_address VARCHAR(40),coordiate VARCHAR(40))');
query.on('end', function() { client.end(); });