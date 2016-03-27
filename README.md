# eatMash
EatMash is a mashup that helps you enjoy local food during your trip. EatMash mashes up local restaurants near your location and suggests breakfast, lunch and dinner based on your request such as minimum rating and type of cuisine. 

## Setup
Install npm packages
```bash
$ npm install
```

## Run
Run the backend server. Currently the app is running on Heroku. (eatmash.herokuapp.com)
```bash
$ node index.js
```

## Get randomly chosen mashups for the first time (GET)
Location is required. Breakfast, lunch, dinner menu and minimum rating are optional. By default, minimum rating is 0.0.
```bash
eatmash.herokuapp.com/api?breakfast_term="<breakfast menu>"&lunch_term="<lunch menu>"&dinner_term="<dinner menu>"&location="<location>"&minrat=<minimum rating>
```

### Request Example
```bash
eatmash.herokuapp.com/api?breakfast_term="american"&lunch_term="italian"&dinner_term="japanese"&location="san francisco"&minrat=3.0
```

### Response Example
```bash
[
  {
    "name": "Front Door Cafe",
    "uuid": "2da8ba97-8246-4e4b-bdc8-7295179d256d",
    "rating": 4,
    "url": "http://www.yelp.com/biz/front-door-cafe-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4159893244",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/tswgR9oi6CB83ZkkBnUpJg/ms.jpg",
    "display_address": [
      "1 Front St",
      "Financial District",
      "San Francisco, CA 94111"
    ],
    "coordinate": {
      "latitude": 37.791931,
      "longitude": -122.398573
    }
  },
  {
    "name": "Il Casaro Pizzeria & Mozzarella Bar",
    "uuid": "808764e5-3470-483d-b547-aed3f3b302a3",
    "rating": 4.5,
    "url": "http://www.yelp.com/biz/il-casaro-pizzeria-and-mozzarella-bar-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4156779455",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/K62xCcAyKVskvClKvAwz_A/ms.jpg",
    "display_address": [
      "348 Columbus Ave",
      "Russian Hill",
      "San Francisco, CA 94133"
    ],
    "coordinate": {
      "latitude": 37.7984832,
      "longitude": -122.4073981
    }
  },
  {
    "name": "Takoba",
    "uuid": "ca67779f-7ada-4c4e-8090-04e024ec4c7c",
    "rating": 4.5,
    "url": "http://www.yelp.com/biz/takoba-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4153610448",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/GJBL9MxXsHWIXIlktWuT_w/ms.jpg",
    "display_address": [
      "John Colins Lounge",
      "138 Minna St",
      "Financial District",
      "San Francisco, CA 94105"
    ],
    "coordinate": {
      "latitude": 37.78704,
      "longitude": -122.40044
    }
  }
]
```

## Get randomly chosen mashups from the second time (POST)
When a user does not like a set of randomly chosen mashups, he is given another set of mashups.
```bash
eatmash.herokuapp.com/api/new
```
Body. Body includes query_object, location, minimum_rating, and an array of uuids that the user did not like.
```bash
{
    "query_object": {
        "breakfast": "american",
        "lunch": "japanese",
        "dinner": "italian"
    },
    "location": "san francisco",
    "minimum_rating": 3.0,
    "uuids": ["b380228e-a6d2-46b2-9e8c-eeffca9fd8e2", "b9b04cab-5d24-4475-aa31-2db3a51c9fc9", "5ec63bb7-12d2-49d0-b62f-1f289fa98202"]
}
```

### Response Example
```bash
[
  {
    "name": "Taylor Street Coffee Shop",
    "uuid": "66653cb2-e94a-4e08-b445-c14f60893a1d",
    "rating": 4,
    "url": "http://www.yelp.com/biz/taylor-street-coffee-shop-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4155674031",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/QiMWdBZy92718u2qRkxFIw/ms.jpg",
    "display_address": [
      "375 Taylor St",
      "Tenderloin",
      "San Francisco, CA 94102"
    ],
    "coordinate": {
      "latitude": 37.7856803,
      "longitude": -122.4114826
    }
  },
  {
    "name": "Mifune Restaurant",
    "uuid": "70e2b3b0-29ec-4a67-9354-f578e6f4691e",
    "rating": 3,
    "url": "http://www.yelp.com/biz/mifune-restaurant-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4159220337",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/zOrhTQL6ZY_wHURMJCamHQ/ms.jpg",
    "display_address": [
      "1737 Post St",
      "Japantown",
      "San Francisco, CA 94115"
    ],
    "coordinate": {
      "latitude": 37.785345,
      "longitude": -122.430272
    }
  },
  {
    "name": "Capannina",
    "uuid": "352b55d3-9c79-44ef-b415-4b414c40328f",
    "rating": 4,
    "url": "http://www.yelp.com/biz/capannina-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4154098001",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/0VCA8oPf5emOqPkRfLm5HQ/ms.jpg",
    "display_address": [
      "1809 Union St",
      "Marina/Cow Hollow",
      "San Francisco, CA 94123"
    ],
    "coordinate": {
      "latitude": 37.7977488,
      "longitude": -122.4291735
    }
  }
]
```

## Confirm the randomly chosen mashups (POST)
A user confirms a set of randomly created mashups. Then, the mashups are stored in the database. The mashups are sent in a body.
```bash
eatmash.herokuapp.com/api/confirm
```
Body
```bash
{
    "uuids": ["66653cb2-e94a-4e08-b445-c14f60893a1d", "70e2b3b0-29ec-4a67-9354-f578e6f4691e", "352b55d3-9c79-44ef-b415-4b414c40328f"]
}
```

## Get the most recent N mashups (GET)
Retrieve the most recent N mashups from the database.
```bash
eatmash.herokuapp.com/api/mashups?num=<number>
```

### Request Example
```bash
eatmash.herokuapp.com/api/mashups?num=2
```

### Response Example
```bash
[
  {
    "name": "CAREMORE Movers and Storage",
    "uuid": "4156e6cf-5988-43b1-8f54-d29d8c9a5239",
    "rating": 5,
    "url": "http://www.yelp.com/biz/caremore-movers-and-storage-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4158228547",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/ePdFBj8Hh700Mfg6dBGxLw/ms.jpg",
    "display_address": "{\"1511 Gough St\",\"Ste 103\",\"Japantown\",\"San Francisco, CA 94109\"}",
    "coordinate": {
      "latitude": "37.787628",
      "longitude": "-122.425507"
    }
  },
  {
    "name": "Opaque - Dining In the Dark",
    "uuid": "d4010429-66ea-4079-b319-2b62a92902c6",
    "rating": 4.5,
    "url": "http://www.yelp.com/biz/opaque-dining-in-the-dark-san-francisco-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "8007101270",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/hvG65EItF91ftX83az9SVg/ms.jpg",
    "display_address": "{\"Hotel Majestic\",\"1500 Sutter St\",\"Japantown\",\"San Francisco, CA 94109\"}",
    "coordinate": {
      "latitude": "37.7872467041016",
      "longitude": "-122.425430297852"
    }
  }
]
```
