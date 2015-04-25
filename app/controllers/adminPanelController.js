/**
 * Class AdminPanelController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function AdminPanelController() {
    this.auth = [];
}

AdminPanelController.prototype.index = function() {
    this.res.render('admin_panel/index.html',{
        layout:'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new AdminPanelController();