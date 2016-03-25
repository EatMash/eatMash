var config = require('./config');
var pg = require('pg');
var Restaurant = require('./restaurant');
var _ = require('underscore');
var Yelp = require('yelp');
var Bucks = require('bucks');
var yelp = new Yelp({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  token: config.token,
  token_secret: config.token_secret
});

var uuidBuffer = new (function() {
  var buffer = [];

  return {
    set_uuid_data: function(uuid, data) {
      buffer[uuid] = data;
    },
    delete_uuid: function(uuid) {
      delete buffer[uuid];
    },
    get_all_data: function() {
      return buffer;
    }
  };
})();

// Filter restaurants
var filter_restaurants = function(data, minrat) {
  var candidates = [];

  for (business of data.businesses) {
    if (business.rating >= minrat) {
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

  return candidates;
};

//
// [Object args]
// - query_object: object
//  - breakfast: string
//  - lunch: string
//  - dinner: string
// - location: string
//
// [How this work]
// Call Yelp API asynchonizely to get restaurants that serve breakfast, lunch, and dinner.
// If fetching completes successfully, this function randomly selects each restaurant for every meals.
//
var call_yelp_api = function(query_object, location, minrat, callback) {
  var breakfast_query = query_object.breakfast || "";
  var lunch_query = query_object.lunch || "";
  var dinner_query = query_object.dinner || "";

  var randomly_return = function(data) {
    var restaurants = filter_restaurants(data, minrat);
    var randomly_chosen_restaurant = restaurants[_.random(0, _.size(restaurants) - 1)];
    uuidBuffer.set_uuid_data(randomly_chosen_restaurant.uuid, randomly_chosen_restaurant);
    return randomly_chosen_restaurant;
  };

  var meals_obtainer = {
    breakfast: function(err, res, next) {
      var query = {
        term: "breakfast " + breakfast_query,
        location: location
      };
      yelp.search(query).then(function(data) {
        return next(null, randomly_return(data));
      }).catch(function(err) {
        return next(null, err);
        //throw new Error("Yelp API error: breakfast");
      });
    },
    lunch: function(err, res, next) {
      var query = {
        term: "lunch " + lunch_query,
        location: location
      }
      yelp.search(query).then(function(data) {
        return next(null, randomly_return(data));
      }).catch(function(err) {
        return next(null, err);
        //throw new Error("Yelp API error: lunch");
      });
    },
    dinner: function(err, res, next) {
      var query = {
        term: "dinner " + dinner_query,
        location: location
      }
      yelp.search(query).then(function(data) {
        return next(null, randomly_return(data));
      }).catch(function(err) {
        return next(null, err);
        //throw new Error("Yelp API error: dinner");
      });
    }
  };

  return (new Bucks()).parallel([
    meals_obtainer.breakfast, meals_obtainer.lunch, meals_obtainer.dinner
  ]).add(function(err, responses, next) {
    callback(responses);
    return next();
  }).end();
};

module.exports = {
  call_v2: call_yelp_api,

  buffer: function() {
    return uuidBuffer;
  }
};
