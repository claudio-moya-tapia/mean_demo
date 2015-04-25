/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiCategoryController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
*/
function ApiCategoryController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'category';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiCategoryController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiCategoryController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiCategory = this;
        var Category = require('app/models/category');

        if (typeof this.req.params.id !== 'undefined') {

            var category = this.find(Category);
            category.exec(function(err, category) {
                apiCategory.callback(err, category);
            });

        } else {

            var category = this.findAll(Category);
            category.exec(function(err, category) {
                apiCategory.callback(err, category);
            });
        }
    }
};

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiCategoryController.prototype.post = function() {

    if (this.isValidPost()) {

        var apiCategory = this;
        var Category = require('app/models/category');
        var category = this.setPost(Category);

        if (category != null) {
            category.save(function(err, category) {
                apiCategory.callback(err, category);
            });
        }
    }
};

/**
 * Method for PUT requests
 */
ApiCategoryController.prototype.put = function() {

    if (this.isValidPut()) {
        var apiCategory = this;
        var Category = require('app/models/category');

        Category.findById(this.req.params.id).exec(function(err, category) {
            apiCategory.putCallback(err, category);
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiCategoryController.prototype.putCallback = function(err, category) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (category != null) {
            var apiCategory = this;
            var category = this.setPut(category);

            if (category != null) {
                category.save(function(err, category) {
                    apiCategory.callback(err, category);
                });
            }
        }
    }
};

/**
 * Method for DELETE requests
 * @returns {Object} JSON object
 */
ApiCategoryController.prototype.delete = function() {

    if (this.isValidDelete()) {
        var apiCategory = this;
        var Category = require('app/models/category');

        Category.findByIdAndRemove(this.req.params.id,function(err, category) {
            apiCategory.callback(err, category);
        });
    }
};

/**
 * Module exports
 */
module.exports = new ApiCategoryController();