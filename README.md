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
