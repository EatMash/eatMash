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
Currently, all three parameters must be passed; menu, geolocation in terms of latitude and longitude, and minimum rating. Menu and minimum rating will be set optional eventually. 
```bash
http://localhost:3000/api?term=<menu>&cll=<latitude>,<longitude>&minrat=<minimum_rating>
```

### Example
```bash
http://localhost:3000/api?term=japanese&cll=37.3686068646855,-122.03124365&minrat=4
```
