var Twitter = require('twitter');
var Appbase = require('appbase-js');
var fs = require("fs");
var content = fs.readFileSync("config.json");
var configs = JSON.parse(content);

var client = new Twitter({
		consumer_key: configs.twitter.consumer_key,
		consumer_secret: configs.twitter.consumer_api,
		access_token_key: configs.twitter.access_token,
		access_token_secret: configs.twitter.access_token_secret
             })

var appbaseRef = new Appbase({
		url: "https://scalr.api.appbase.io",
		appname: configs.appbase.appname,
		username: configs.appbase.username,
		password: configs.appbase.password	
             })

//Filter tweets related to midwestio
var stream = client.stream('statuses/filter', { track: 'midwestio,midwest,mariott,kansascity,KC', language: 'en' }, function(stream) {
	stream.on('data', function(tweet) {
		console.log(tweet.text);
		appbaseRef.index({
		    "type": "midwestiotweets",
		    "body": tweet
		})
	});
});



