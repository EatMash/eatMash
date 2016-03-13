var express = require('express');
var app = express();
var Yelp = require('yelp');
var yelp = new Yelp({
  consumer_key: 'QfJXdX9KxsuHZ04ruLg3qg',
  consumer_secret: 'E5kGeX124hNOOgywvXkPxo39DPE',
  token: 'ixaAxWq6YszaeLPwYYf_rECBf_fPdcjC',
  token_secret: 'jtklLDOecbZuR33MYHglnvPHix8',
});

app.get('/', function (req, res) {
  res.send('Hello World!');
  yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});