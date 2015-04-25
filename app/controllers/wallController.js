/**
 * Class WallController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function WallController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}

WallController.prototype.shared = function() {
    this.res.render('wall/shared.html',{
        layout:'layout/empty.html'
    });
};

WallController.prototype.index = function() {
    this.res.render('wall/index.html',{
        layout:'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new WallController();