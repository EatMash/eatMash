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
Location is required. Menu, minimum rating, and the number of restaurants are optional. By default, minimum rating and the number of restaurants are 0.0 and 1 respectively. 
```bash
http://localhost:3000/api?term=<menu>&location="<address>"&minrat=<minimum_rating>&num=3
```

### Request Example
```bash
http://localhost:3000/api?location=%22japan%20town%20san%20francisco%22&minrat=4&num=3
```

### Response Example
```bash
[
  {
    "name": "Yasukochi's Sweet Stop",
    "rating": 4.5,
    "url": "http://www.yelp.com/biz/yasukochis-sweet-stop-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4159318165",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/OELbKcU4nhmp4LiPT-Kivw/ms.jpg",
    "display_address": [
      "1790 Sutter St",
      "Japantown",
      "San Francisco, CA 94115"
    ],
    "coordiate": {
      "latitude": 37.78673,
      "longitude": -122.42978
    }
  },
  {
    "name": "Lisa Bradbury Skincare Salon",
    "rating": 5,
    "url": "http://www.yelp.com/biz/lisa-bradbury-skincare-salon-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4154417470",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/pP8Hqu7-z6oU0Piqt6he7g/ms.jpg",
    "display_address": [
      "1756 Fillmore St",
      "Japantown",
      "San Francisco, CA 94115"
    ],
    "coordiate": {
      "latitude": 37.785988,
      "longitude": -122.433022
    }
  },
  {
    "name": "Real Escape Game",
    "rating": 4.5,
    "url": "http://www.yelp.com/biz/real-escape-game-san-francisco-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/vMWdWOEa25IkYVSKcbfAaQ/ms.jpg",
    "display_address": [
      "1746 Post St",
      "Japantown",
      "San Francisco, CA 94115"
    ],
    "coordiate": {
      "latitude": 37.7856199898632,
      "longitude": -122.430602301523
    }
  }
]
```
