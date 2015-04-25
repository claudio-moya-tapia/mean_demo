// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
//var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = require('app/models/user');
var Wall = require('app/models/wall');
var Profile = require('app/models/profile');
var Image = require('app/models/image');

// load the auth variables
var configAuth = require('app/config/auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({'local_email': email}, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({'local_email': email}, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // create the user
                        var newUser = new User();

                        newUser.local_email = email;
                        newUser.local_password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            //create wall
                            var wall = new Wall();
                            wall.ref_user = newUser._id;
                            wall.save(function() {

                                return done(null, newUser);
                            });
                        });
                    }

                });
                // if the user is logged in but has no local account...
            } else if (!req.user.local_email) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                User.findOne({'local_email': email}, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {
                        var user = req.user;
                        user.local_email = email;
                        user.local_password = user.generateHash(password);
                        user.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, user);
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {
                
                var googleEmail = (profile.emails[0].value || '').toLowerCase();

                User.findOne({'google_email': googleEmail}, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google_token) {
                            user.google_token = token;
                            user.google_name = profile.displayName;
                            user.google_first_name = profile.name.givenName;
                            user.google_last_name = profile.name.familyName;
                            user.google_hd = profile._json.hd;
                            user.google_email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                            user.google_img = profile._json.picture;

                            user.save(function(err) {
                                if (err)
                                    return done(err);

                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {

                        var newUser = new User();

                        newUser.google_id = profile.id;
                        newUser.google_token = token;
                        newUser.google_name = profile.displayName;
                        newUser.google_first_name = profile.name.givenName;
                        newUser.google_last_name = profile.name.familyName;
                        newUser.google_hd = profile._json.hd;
                        newUser.google_email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                        newUser.google_img = profile._json.picture;

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            var image = new Image();
                            image.image_original = newUser.google_img;
                            image.save(function(err, image) {

                                var profile = new Profile();
                                profile.position = newUser.google_hd;
                                profile.first_name = newUser.google_first_name;
                                profile.last_name = newUser.google_last_name;
                                profile.full_name = newUser.google_name;
                                profile.ref_user = newUser._id;
                                profile.ref_image = image._id;
                                profile.save(function() {

                                    var wall = new Wall();
                                    wall.ref_user = newUser._id;
                                    wall.ref_profile = profile._id;
                                    wall.save(function() {

                                        profile.ref_wall = wall._id;
                                        profile.save(function() {
                                            return done(null, newUser);
                                        });
                                    });
                                });
                            });
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session

                user.google_id = profile.id;
                user.google_token = token;
                user.google_name = profile.displayName;
                user.google_first_name = profile.name.givenName;
                user.google_last_name = profile.name.familyName;
                user.google_hd = profile._json.hd;
                user.google_email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                user.google_img = profile._json.picture;

                user.save(function(err) {
                    if (err)
                        return done(err);

                    return done(null, user);
                });
            }
        });
    }));
};