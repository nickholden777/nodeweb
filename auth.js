var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
		usernameField: 'login',
    	passwordField: 'password',
	},
	function(username, password, done){
		if(username === 'admin' && password === '0000')
			return done(null, {username: 'admin'});
		return done(null, false);
	}
));

passport.serializeUser(function(user, done){
	done(null, user.username);
});

passport.deserializeUser(function(username, done){
	done(null, {username: username});
});

module.exports = passport;


