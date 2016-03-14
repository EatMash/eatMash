# eatMash

## Setup
Install npm packages
```bash
$ npm install
```

## Run
Run the backend server. (This will be eventually running on Heroku. Currently, running only locally. )
```bash
$ node index.js
```

## Call API
Geolocation (latitude and longitude) is required. Menu, minimum rating, and the number of restaurants are optional. 
```bash
http://localhost:3000/api?term=<menu>&cll=<latitude>,<longitude>&minrat=<minimum_rating>&num=3
```

### Request Example
```bash
http://localhost:3000/api?term=japanese&cll=37.3686068646855,-122.03124365&minrat=4&num=3
```

### Response Example
```bash
[
  {
    "name": "Mr Fish",
    "rating": 4,
    "url": "http://www.yelp.com/biz/mr-fish-myrtle-beach?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "8438393474",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/X9nIY3zid35qDwl3uaOnew/ms.jpg",
    "display_address": [
      "6307 N Kings Hwy",
      "Myrtle Beach, SC 29572"
    ],
    "coordiate": {
      "latitude": 33.7375190546485,
      "longitude": -78.8303257973668
    }
  },
  {
    "name": "Hana Teppanyaki House",
    "rating": 4,
    "url": "http://www.yelp.com/biz/hana-teppanyaki-house-myrtle-beach?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "8439035151",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/I4192P4CF-MVWQbeHJAcUw/ms.jpg",
    "display_address": [
      "Forest Village Shopping Center",
      "4036 River Oaks Dr, Ste 9",
      "Myrtle Beach, SC 29579"
    ],
    "coordiate": {
      "latitude": 33.753849,
      "longitude": -78.864944
    }
  },
  {
    "name": "Tokyo Japan",
    "rating": 4.5,
    "url": "http://www.yelp.com/biz/tokyo-japan-myrtle-beach?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "8434442606",
    "display_address": [
      "2014 Coastal Grand Cir",
      "Myrtle Beach, SC 29577"
    ],
    "coordiate": {
      "latitude": 33.7006645,
      "longitude": -78.9222107
    }
  }
]
```
