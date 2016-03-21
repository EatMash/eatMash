var uuid = require('uuid');

function Restaurant(name, rating, url, phone, image_url, display_address, coordinate) {  
	this.name = name;
	this.uuid = uuid.v4();
	this.rating = rating;
	this.url = url;
	this.phone = phone;
	this.image_url = image_url;
	this.display_address = display_address;
	this.coordinate = coordinate;
}

module.exports = Restaurant;