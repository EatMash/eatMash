var pg = require('pg');
var config = require('../config');
var client = new pg.Client(config.connectionString);

client.connect();
var query = client.query('CREATE TABLE mashups(id SERIAL PRIMARY KEY, name VARCHAR(1000), uuid VARCHAR(1000),rating real,url VARCHAR(1000),phone VARCHAR(100),image_url VARCHAR(1000),display_address VARCHAR(1000),latitude bigint, longitude bigint, timestamp timestamp default current_timestamp)');
query.on('end', function() { client.end(); });