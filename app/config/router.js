/**
 * Routes middleware
 * Check all requests
 */
module.exports = function(app, passport) {

    var express = require('express');
    var router = express.Router();

    router.use(function(req, res, next) {

        /**
         * Make visible req / res on template layout
         */
        res.locals.req = req;
        res.locals.res = res;

        /**
         * Url filter
         */
        var aryUrl = req.path.split('/').filter(Boolean);

        try {

            var root = '';
            var controller = '';
            var controllerPrototype = '';
            var module = '';
            var method = '';
            var url = '';
            var itemId = '';

            switch (req.originalMethod) {
                case 'GET':
                    method = 'get';
                    break;
                case 'POST':
                    method = 'post';
                    break;
                case 'PUT':
                    method = 'put';
                    break;
                case 'DELETE':
                    method = 'delete';
                    break;
            }

            if (aryUrl.length == 0) {
                root = '/';
            } else {
                root = aryUrl[0];
            }

            switch (root) {
                case '/':
                    module = 'app/controllers/indexController';
                    controller = 'index';
                    controllerPrototype = 'root';
                    url = '/';

                    break;
                case 'adminPanel':
                    module = 'app/controllers/indexController';
                    controller = 'index';
                    controllerPrototype = 'adminPanel';
                    url = '/adminPanel';

                    break;
                case 'error':
                    module = 'app/controllers/indexController';
                    controller = 'index';
                    controllerPrototype = 'error';
                    url = '/error';

                    break;
                case 'admin':

                    var ctrl = aryUrl[1].replace(/\W+(.)/g, function(x, chr) {
                        return chr.toUpperCase();
                    });
                    ctrl = 'admin' + ctrl.charAt(0).toUpperCase() + ctrl.slice(1);

                    module = 'app/controllers/' + ctrl + 'Controller';
                    controller = ctrl;

                    if (aryUrl.length == 3) {
                        itemId = '/:id';
                    }

                    url = '/admin/' + aryUrl[1] + itemId;

                    break;
                case 'api':

                    var ctrl = aryUrl[1].replace(/\W+(.)/g, function(x, chr) {
                        return chr.toUpperCase();
                    });
                    ctrl = 'api' + ctrl.charAt(0).toUpperCase() + ctrl.slice(1);

                    module = 'app/controllers/' + ctrl + 'Controller';
                    controller = ctrl;

                    if (aryUrl.length == 3) {
                        itemId = '/:id';
                    }

                    controllerPrototype = method;

                    url = '/api/' + aryUrl[1] + itemId;

                    break;
                case 'auth':

                    /**
                     * Google
                     */
                    router.route('/auth/google').get(
                            passport.authenticate('google', {
                                scope: [
                                'https://www.googleapis.com/auth/plus.me', 
                                'email', 
                                'https://www.googleapis.com/auth/calendar'
                            ]
                            }));

                    router.route('/auth/google/callback').get(
                            passport.authenticate('google', {
                                successRedirect: '/',
                                failureRedirect: '/auth/login'
                            }));

                    router.route('/auth/google/logout').get(function(req, res) {
                        req.logout();
                        res.redirect('/');
                    });

                    /**
                     * Local Login
                     */
                    router.route('/auth/login').get(function(req, res) {
                        res.render('login/get.html', {
                            layout: 'layout/auth.html',
                            message: req.flash('loginMessage')
                        });
                    });

                    router.route('/auth/login').post(passport.authenticate('local-login', {
                        successRedirect: '/',
                        failureRedirect: '/auth/login',
                        failureFlash: true
                    }));

                    router.route('/auth/logout').get(function(req, res) {
                        req.logout();
                        res.redirect('/');
                    });
                    break;
                default :

                    controller = aryUrl[0].replace(/\W+(.)/g, function(x, chr) {
                        return chr.toUpperCase();
                    });

                    module = 'app/controllers/' + controller + 'Controller';

                    controllerPrototype = aryUrl[1];

                    if (aryUrl.length == 3) {
                        itemId = '/:id';
                    }

                    url = '/' + aryUrl[0] + '/' + controllerPrototype + itemId;
                    break;
            }

            if (controller != '') {

                var controllerDynamic = require(module);

                controllerDynamic.req = req;
                controllerDynamic.res = res;

                /**
                 * Auth validation
                 * Check the "auth" atribute of a controller
                 */
                if (typeof controllerDynamic.auth !== "undefined") {
                    if (controllerDynamic.auth.indexOf(controllerPrototype) != -1) {
                        if (!req.isAuthenticated()) {
                            var err = new Error(401);
                            throw err;
                        }
                    }
                }

                /**
                 * Final validation
                 */
                var isValid = true;

                if (aryUrl.length > 4) {
                    isValid = false;
                }

                if (method == '') {
                    isValid = false;
                }

                if (typeof controllerDynamic[controllerPrototype] !== "function") {
                    isValid = false;
                }

                if (isValid) {
                    router.route(url)[method](function() {
                        controllerDynamic[controllerPrototype]();
                    });

                } else {
                    res.status(404).send('Not found');
                }
            }

            next();

        } catch (e) {

            if (e.message == 401) {
                res.status(401).redirect('/auth/login');
            } else {
                res.status(404).send('Not found');
            }
        }
    });

    app.use('/', router);
};