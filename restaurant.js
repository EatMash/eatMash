var uuid = require('uuid');

function Restaurant(name, rating, url, phone, image_url, display_address, coordiate) {  
	this.name = name;
	this.uuid = uuid.v4();
	this.rating = rating;
	this.url = url;
	this.phone = phone;
	this.image_url = image_url;
	this.display_address = display_address;
	this.coordiate = coordiate;
}

module.exports = Restaurant;