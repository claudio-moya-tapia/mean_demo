/**
 * Class CategoryController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function NewsController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}


NewsController.prototype.view = function() {
    this.res.render('news/view.html',{
        layout:'layout/empty.html'
    });
};

NewsController.prototype.index = function() {
    this.res.render('news/index.html',{
        layout:'layout/empty.html'
    });
};
/**
 * Module exports
 */
module.exports = new NewsController();