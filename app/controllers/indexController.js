/**
 * Class Index
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function IndexController() {
    this.auth = ['root', 'home'];
}

IndexController.prototype.root = function() {

    var self = this;
    var apiPage = require('app/controllers/apiPageController');
    apiPage.getFooter(function(err, aryFooter) {

        self.res.render('index/root.html', {
            layout: 'layout/main.html',
            aryFooter: aryFooter
        });
    });
};

IndexController.prototype.adminPanel = function() {

    this.res.render('index/root.html', {
        layout: 'layout/main_admin.html'
    });
};

IndexController.prototype.home = function() {
    this.res.render('index/home.html', {
        layout: 'layout/empty.html'
    });
};

IndexController.prototype.shared = function() {
    this.res.render('index/shared.html', {
        layout: 'layout/empty.html'
    });
};

IndexController.prototype.error = function() {
    this.res.render('index/error.html', {
        layout: 'layout/empty.html'
    });
};

module.exports = new IndexController();