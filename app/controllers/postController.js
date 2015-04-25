/**
 * Class PostController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function PostController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}

PostController.prototype.list = function() {
    this.res.render('post/list.html',{
        layout:'layout/empty.html'
    });
};

PostController.prototype.view = function() {
    this.res.render('post/view.html',{
        layout:'layout/empty.html'
    });
};

PostController.prototype.new = function() {
    this.res.render('post/new.html',{
        layout:'layout/empty.html'
    });
};

PostController.prototype.edit = function() {
    this.res.render('post/edit.html',{
        layout:'layout/empty.html'
    });
};

PostController.prototype.delete = function() {
    this.res.render('post/delete.html',{
        layout:'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new PostController();