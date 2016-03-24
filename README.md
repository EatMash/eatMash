# eatMash

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

## Call API (GET)
Location is required. Menu, minimum rating, and the number of restaurants are optional. By default, minimum rating and the number of restaurants are 0.0 and 1 respectively. 
```bash
http://eatmash.herokuapp.com/api?term=<menu>&location="<address>"&minrat=<minimum_rating>&num=3
```

### Request Example
```bash
http://eatmash.herokuapp.com/api?location=%22japan%20town%20san%20francisco%22&minrat=4&num=3
```

### Response Example
```bash
[
  {
    "name": "Therapeia Massage",
    "uuid": "06b096f1-6200-4f0f-9a92-237388b6ba1f",
    "rating": 4,
    "url": "http://www.yelp.com/biz/therapeia-massage-san-francisco-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4158854450",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/_D9M1NHSezeb07NBVZ89nQ/ms.jpg",
    "display_address": [
      "1801 Bush St",
      "Japantown",
      "San Francisco, CA 94109"
    ],
    "coordiate": {
      "latitude": 37.7874665,
      "longitude": -122.4273696
    }
  },
  {
    "name": "Super Mira Market",
    "uuid": "91f38b2d-abf9-43c7-b983-6f37c9e49dea",
    "rating": 4.5,
    "url": "http://www.yelp.com/biz/super-mira-market-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4159216529",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/5_A9ZaRjOn4-2LKLSNHPtQ/ms.jpg",
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
    "name": "Margaretta Von Recklinghausen",
    "uuid": "f96fd9b6-0203-4aad-95aa-378bb9929e7f",
    "rating": 5,
    "url": "http://www.yelp.com/biz/margaretta-von-recklinghausen-san-francisco-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=QfJXdX9KxsuHZ04ruLg3qg",
    "phone": "4152557384",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/R1ZdB914I8gtnx41Z4re6Q/ms.jpg",
    "display_address": [
      "1801 Bush St",
      "Ste 207",
      "Japantown",
      "San Francisco, CA 94109"
    ],
    "coordiate": {
      "latitude": 37.7875022888184,
      "longitude": -122.427215576172
    }
  }
]
```
## Confirm Call API (POST)
A user confirms a set of randomly created mashups. Then, the mashups are stored in the database. The mashups are sent in a body. 
```bash
eatmash.herokuapp.com/api/confirm
```
Body
```bash
{
    "uuid": ["5821f6a2-8fc3-4653-b33b-cb1b256e012f", "bebd8f5f-3a3c-43a0-a30f-b8c504e1af0e"]
}
```

## Get the Most Recent N Mashups API (GET)
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
