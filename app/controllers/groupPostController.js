/**
 * Class GroupPostController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function GroupPostController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}

GroupPostController.prototype.list = function() {
    this.res.render('group_post/list.html',{
        layout:'layout/empty.html'
    });
};

GroupPostController.prototype.view = function() {
    this.res.render('group_post/view.html',{
        layout:'layout/empty.html'
    });
};

GroupPostController.prototype.new = function() {
    this.res.render('group_post/new.html',{
        layout:'layout/empty.html'
    });
};

GroupPostController.prototype.edit = function() {
    this.res.render('group_post/edit.html',{
        layout:'layout/empty.html'
    });
};

GroupPostController.prototype.delete = function() {
    this.res.render('group_post/delete.html',{
        layout:'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new GroupPostController();