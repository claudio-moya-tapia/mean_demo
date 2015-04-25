/**
 * Patch MacOSx
 */
//process.env.PATH = '/opt/local/bin:/opt/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin';
//
//var logs = true;
//require('mongocloning')({
//        "src": "mongodb://localhost:27017/holafch",
//        "dst": "mongodb://localhost:27017/holafch_prod_demo"
//    }, logs);

/**
 * Express webserver
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 8081;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


/**
 * Helper for requiere relative path
 */
require('app-module-path').addPath(__dirname);

/**
 * MongoDB database
 */
var configDB = require('app/config/database.js');
/**
 * Mongoose database Schema
 */
var mongoose = require('mongoose');

/**
 * Passport sesion manager
 */
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

/**
 * Morgan logger
 */
//var morgan = require('morgan');

/**
 * EJS template engine
 */
var ejs = require('ejs');
var ejsLayouts = require('express-ejs-layouts');

/**
 * App Configuration
 * Webserver, DataBase, HTTP Parsers, Routes
 */

/**
 * Express webserver
 */
//app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Static files location
 */
app.use(express.static(__dirname + '/public'));

/**
 * Override
 * X-HTTP-Method-Override header in the request
 * Simulate DELETE/PUT
 */
app.use(methodOverride('X-HTTP-Method-Override'));

/**
 * MongoDB database
 */
mongoose.connect(configDB.url);

/**
 * Passport sesion manager
 */
require('app/config/passport')(passport);
app.use(session({secret: 'Ray4l-_4$(20|69'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/**
 * EJS template engine
 */
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.set('layout', 'layout/main.html');
app.use(ejsLayouts);

/**
 * File uploader Blueimp jQuery File Uploader
 */
require('app/config/uploader')(app, __dirname);

/**
 * Routes
 */
require('app/config/router.js')(app, passport);

/**
 * Start App
 */
app.listen(port);