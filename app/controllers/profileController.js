/**
 * Class ProfileController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function ProfileController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}

ProfileController.prototype.view = function() {
    this.res.render('profile/view.html',{
        layout:'layout/empty.html'
    });
};

ProfileController.prototype.index = function() {
    this.res.render('profile/view.html',{
        layout:'layout/empty.html'
    });
};

ProfileController.prototype.shared = function() {
    this.res.render('profile/shared.html',{
        layout:'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new ProfileController();