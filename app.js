var express = require('express');
var routes = require('./routes/back/');
var front = require('./routes/front/');
var ejs = require('ejs-locals');
var bodyParser = require('body-parser');
var passport = require('./auth');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var db = require('./db');

var app = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({extended: false}));
app.engine('ejs', ejs);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({
	secret: 'cms',
	store: new MongoStore({
		mongooseConnection: db
	}),
	resave: true, 
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

/*=====================ADMIN========================*/

app.get('/admin', routes.admin);
app.post('/admin', passport.authenticate('local', {
	successRedirect: '/panel',
	failureRedirect: '/admin'
}));
app.get('/panel', routes.panel);
app.get('/panel/pages', routes.panelPages);
app.get('/panel/pages/new', routes.panelPagesNew);
app.post('/panel/pages/new', routes.panelPagesNewPost);
app.get('/panel/pages/:id', routes.panelPagesEdit);
app.post('/panel/pages/:id', routes.panelPagesEditPost);
app.get('/panel/pages/:id/del', routes.panelPagesDel);

/*=====================FRONT========================*/

app.get('/', front.pages);
app.get('/:page', front.pages);

app.listen(3000);