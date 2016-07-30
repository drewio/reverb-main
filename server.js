var express = require('express');
var SpotifyApi = require('spotify-web-api-node');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var firebase = require('firebase');
var consolidate = require('consolidate');
var path = require('path');
var exphbs  = require('express-handlebars');

var app = express();

app.use(express.static(__dirname + '/public/'));
app.set('views', __dirname + '/public/views');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(passport.initialize());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var config = {
    apiKey: "AIzaSyASCq0nldukLEUF0vq5TiYP0mRh5Qu47yU",
    authDomain: "reverb-722c8.firebaseapp.com",
    databaseURL: "https://reverb-722c8.firebaseio.com",
    storageBucket: "reverb-722c8.appspot.com",
  };
firebase.initializeApp(config);
var db = firebase.database();

var key = '9691a37a4a234cf9afb19dfe3601ee62';
var secret = 'a6beafbf236441e391bc96ea4ad9cc3a';

var spotify = new SpotifyApi({
	clientId: key,
	clientSecret: secret,
	redirectUri: 'http://localhost:3000/callback'
});

passport.use(new SpotifyStrategy({
	clientID: key,
	clientSecret: secret,
	callbackURL: 'http://localhost:3000/callback'
}, function(accessToken, refreshToken, profile, done){

	var ref = db.ref('users');
	var newUser = ref.push(createUserObject(profile));
	var userID = newUser.key;

	spotify.setAccessToken(accessToken);
	spotify.setRefreshToken(refreshToken);

	return done(null, {accessToken: accessToken, refreshToken: refreshToken, id: userID});
}));

app.get('/', function(req, res){
	res.render(__dirname + '/public/index.html', {searchid: null})
})

app.get('/login', passport.authenticate('spotify', {scope: ['user-read-private', 
	'user-read-birthdate', 'user-top-read', 'user-read-email', 'user-library-read', 'playlist-modify-private', 'playlist-modify-public'], showDialog: true}),
	function(req, res){
		//
	});

app.get('/callback', passport.authenticate('spotify', {failureRedirect: '/'}), function(req, res){
	res.render(__dirname + '/public/index.html', {searchid: req.user.id});
});

app.get('/user', function(req, res){

	getUserSpotifySongs(function(urls){
		// Get user vector from Mitch's end
		// Calulate band percentages from db
		var percentage = 0.75

		var url = '/users/' + req.query.id

		ref = db.ref('/users/' + req.query.id)
		ref.once("value", function(data){
			user = data.val();
			user['rating'] = percentage;

			ref.set(user);

			res.json(user);
		})
	});
});

app.get('/userid', function(req,res){
	console.log(req.query.id);
	getGigSuggestions(function(gigs){
		res.json(gigs);
	});
});

var getUserSpotifySongs = function(callback){
	spotify.getMySavedTracks({
		limit: 5,
		offset: 1
	}).then(function(data){
		var tracks = data.body.items
		var userSongUrls = [];
		for(var i = 0; i < tracks.length; i++){
			userSongUrls.push(tracks[i].track.preview_url);
		}
		callback(userSongUrls);
	})
}

var getGigSuggestions = function(callback){
	ref = db.ref('/gigs/');
	ref.once('value', function(data){
		var gigs = data.val();
		var finalgigs = []
		for(var key in gigs){
			finalgigs.push(gigs[key]);
		}
		callback(finalgigs)
	})
}

var createUserObject = function(profile, refreshToken){
	var user = {url: profile.profileUrl, country: profile.country}
	// Get user name
	if(profile.displayName != null){
		user.name = profile.displayName;
	} else {
		user.name = profile.username;
	}

	if (profile.emails.length != 0){
		user.email = profile.emails[0].value;
	} else{
		user.email = "No email given"
	}

	return user;
}

app.listen(3000);
console.log('listening on 3000');

  app.get('/test', function(req, res){


});

  var makeRequest = function(i){
  	spotify.getArtistTopTracks(artists[i].spotifyID, 'AU')
  	.then(function(data){
  		artistSongs.push({name: artists[i].spotifyID, links: [data.body.tracks[0].preview_url, data.body.tracks[1].preview_url,
  			data.body.tracks[2].preview_url, data.body.tracks[3].preview_url, data.body.tracks[4].preview_url,]})
  	}, function(err) {
		console.error(err);
	});
}

  function myFunc(){
  	console.log(counter);

  	makeRequest(artists.length - counter)
  	counter--;
  	if(counter > 0){
  		setTimeout(myFunc, 1000)
  	}
  	console.log(artistSongs)
}