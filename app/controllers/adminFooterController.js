/**
 * Class AdminFooterController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function AdminFooterController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}

AdminFooterController.prototype.list = function() {
    this.res.render('admin_page/list.html', {
        layout: 'layout/empty.html',
        title: 'Footer',
        location: 'footer_tu_fch,footer_actualidad,footer_servicios,footer_areas_de_servicio,footer_mas_info',
        url: 'admin-footer'
    });
};

AdminFooterController.prototype.new = function() {
    this.res.render('admin_page/new.html', {
        layout: 'layout/empty.html',
        title: 'Footer',
        location: 'footer_tu_fch,footer_actualidad,footer_servicios,footer_areas_de_servicio,footer_mas_info',
        url: 'admin-footer'
    });
};

AdminFooterController.prototype.edit = function() {
    this.res.render('admin_page/edit.html', {
        layout: 'layout/empty.html',
        title: 'Footer',
        location: 'footer_tu_fch,footer_actualidad,footer_servicios,footer_areas_de_servicio,footer_mas_info',
        url: 'admin-footer'
    });
};

AdminFooterController.prototype.delete = function() {
    this.res.render('admin_page/delete.html', {
        layout: 'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new AdminFooterController();