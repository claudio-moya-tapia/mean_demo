/**
 * Class PageController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function PageController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}

PageController.prototype.list = function() {
    this.res.render('page/list.html',{
        layout:'layout/empty.html'
    });
};

PageController.prototype.view = function() {
    
    this.res.render('page/view.html',{
        layout:'layout/empty.html'
    });
};

PageController.prototype.new = function() {
    this.res.render('page/new.html',{
        layout:'layout/empty.html'
    });
};

PageController.prototype.edit = function() {
    this.res.render('page/edit.html',{
        layout:'layout/empty.html'
    });
};

PageController.prototype.delete = function() {
    this.res.render('page/delete.html',{
        layout:'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new PageController();