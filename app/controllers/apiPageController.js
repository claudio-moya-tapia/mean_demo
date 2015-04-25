/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiPageController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
*/
function ApiPageController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'page';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiPageController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiPageController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiPage = this;
        var Page = require('app/models/page');

        if (typeof this.req.params.id !== 'undefined') {

            var page = this.find(Page);
            page.exec(function(err, page) {
                apiPage.callback(err, page);
            });

        } else {

            var page = this.findAll(Page);
            page.exec(function(err, page) {
                apiPage.callback(err, page);
            });
        }
    }
};

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiPageController.prototype.post = function() {

    if (this.isValidPost()) {

        var self = this;
        var Page = require('app/models/page');
        var page = this.setPost(Page);

        if (page != null) {
            
            var ref_user = this.req.user._id;
            
            var apiProfile = require('app/controllers/apiProfileController');
            apiProfile.getByRefUser(ref_user, function(err, profile) {

                if (!err) {

                    page.ref_user = ref_user;
                    page.ref_profile = profile._id;
                    page.save(function(err, post) {
                        self.callback(err, post);
                    });

                } else {
                    self.callback(err);
                }
            });
        }
    }
};

/**
 * Method for PUT requests
 */
ApiPageController.prototype.put = function() {

    if (this.isValidPut()) {
        var apiPage = this;
        var Page = require('app/models/page');

        Page.findById(this.req.params.id).exec(function(err, page) {
            apiPage.putCallback(err, page);
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiPageController.prototype.putCallback = function(err, page) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (page != null) {
            var apiPage = this;
            var page = this.setPut(page);

            if (page != null) {
                page.save(function(err, page) {
                    apiPage.callback(err, page);
                });
            }
        }
    }
};

/**
 * Method for DELETE requests
 * @returns {Object} JSON object
 */
ApiPageController.prototype.delete = function() {

    if (this.isValidDelete()) {
        var apiPage = this;
        var Page = require('app/models/page');

        Page.findByIdAndRemove(this.req.params.id,function(err, page) {
            apiPage.callback(err, page);
        });
    }
};

/**
 * Custom methods
 */
ApiPageController.prototype.addComment = function(pageId, commentId, callback) {
   
    var Page = require('app/models/page');

    Page.findById(pageId).exec(function(err, page) {

        if (!err) {

            page.ref_comment.push(commentId);
            page.save(function(err, page) {
                callback(err, page);
            });

        } else {
            callback(err);
        }
    });
};

ApiPageController.prototype.getFooter = function(callback){
    var Page = require('app/models/page');
    var page = Page.find();
    
    var aryOr = [
        {'location':'footer_tu_fch'},
        {'location':'footer_actualidad'},
        {'location':'footer_servicios'},
        {'location':'footer_areas_de_servicio'},
        {'location':'footer_mas_info'}
    ];
    
    page.or(aryOr).and([{'active':true}]).sort('order').exec(function(err, pages){
        callback(err, pages);
    });
};

/**
 * Module exports
 */
module.exports = new ApiPageController();