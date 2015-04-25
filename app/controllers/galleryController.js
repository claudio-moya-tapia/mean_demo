/**
 * Class CategoryController
 * Prints HTML templates to AngularJS using different layouts (empty, main, main_admin, etc...)
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function GalleryController() {
    //this.auth = ['index', 'list', 'view', 'new', 'edit', 'delete'];
    this.auth = [];
}


GalleryController.prototype.view = function() {
    this.res.render('gallery/view.html',{
        layout:'layout/empty.html'
    });
};


GalleryController.prototype.index = function() {
    this.res.render('gallery/index.html',{
        layout:'layout/empty.html'
    });
};

/**
 * Module exports
 */
module.exports = new GalleryController();