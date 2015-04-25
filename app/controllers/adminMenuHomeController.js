/**
 * Class AdminMenuHomeController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function AdminMenuHomeController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}

AdminMenuHomeController.prototype.list = function() {
    this.res.render('admin_page/list.html', {
        layout: 'layout/empty.html',
        title: 'Menú Home',
        location: 'menu_home',
        url: 'admin-menu-home'
    });
};

AdminMenuHomeController.prototype.new = function() {
    this.res.render('admin_page/new.html', {
        layout: 'layout/empty.html',
        title: 'Menú Home',
        location: 'menu_home',
        url: 'admin-menu-home'
    });
};

AdminMenuHomeController.prototype.edit = function() {
    this.res.render('admin_page/edit.html', {
        layout: 'layout/empty.html',
        title: 'Menú Home',
        location: 'menu_home',
        url: 'admin-menu-home'
    });
};

AdminMenuHomeController.prototype.delete = function() {
    this.res.render('admin_page/delete.html', {
        layout: 'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new AdminMenuHomeController();