/**
 * Class GroupController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function GroupController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}

GroupController.prototype.index = function() {
    this.res.render('group/index.html',{
        layout:'layout/empty.html'
    });
};

GroupController.prototype.view = function() {
    this.res.render('group/view.html',{
        layout:'layout/empty.html'
    });
};

GroupController.prototype.new = function() {
    this.res.render('group/new.html',{
        layout:'layout/empty.html'
    });
};

GroupController.prototype.edit = function() {
    this.res.render('group/edit.html',{
        layout:'layout/empty.html'
    });
};

GroupController.prototype.list = function() {
    this.res.render('group/list.html',{
        layout:'layout/empty.html'
    });
};

GroupController.prototype.search = function() {
    this.res.render('group/search.html',{
        layout:'layout/empty.html'
    });
};

GroupController.prototype.member = function() {
    this.res.render('group/member.html',{
        layout:'layout/empty.html'
    });
};

GroupController.prototype.menu = function() {
    this.res.render('group/menu.html',{
        layout:'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new GroupController();