/**
 * Class CategoryController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function CategoryController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}

CategoryController.prototype.list = function() {
    this.res.render('category/list.html',{
        layout:'layout/empty.html'
    });
};

CategoryController.prototype.view = function() {
    this.res.render('category/view.html',{
        layout:'layout/empty.html'
    });
};

CategoryController.prototype.new = function() {
    this.res.render('category/new.html',{
        layout:'layout/empty.html'
    });
};

CategoryController.prototype.edit = function() {
    this.res.render('category/edit.html',{
        layout:'layout/empty.html'
    });
};

CategoryController.prototype.delete = function() {
    this.res.render('category/delete.html',{
        layout:'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new CategoryController();