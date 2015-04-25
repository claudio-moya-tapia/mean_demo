/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiImageController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
*/
function ApiImageController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'image';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiImageController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiImageController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiImage = this;
        var Image = require('app/models/image');

        if (typeof this.req.params.id !== 'undefined') {

            var image = this.find(Image);
            image.exec(function(err, image) {
                apiImage.callback(err, image);
            });

        } else {

            var image = this.findAll(Image);
            image.exec(function(err, image) {
                apiImage.callback(err, image);
            });
        }
    }
};

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiImageController.prototype.post = function() {

    if (this.isValidPost()) {

        var apiImage = this;
        var Image = require('app/models/image');
        var image = this.setPost(Image);

        if (image != null) {
            image.save(function(err, image) {
                apiImage.callback(err, image);
            });
        }
    }
};

/**
 * Method for PUT requests
 */
ApiImageController.prototype.put = function() {

    if (this.isValidPut()) {
        var apiImage = this;
        var Image = require('app/models/image');

        Image.findById(this.req.params.id).exec(function(err, image) {
            apiImage.putCallback(err, image);
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiImageController.prototype.putCallback = function(err, image) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (image != null) {
            var apiImage = this;
            var image = this.setPut(image);

            if (image != null) {
                image.save(function(err, image) {
                    apiImage.callback(err, image);
                });
            }
        }
    }
};

/**
 * Method for DELETE requests
 * @returns {Object} JSON object
 */
ApiImageController.prototype.delete = function() {

    if (this.isValidDelete()) {
        var apiImage = this;
        var Image = require('app/models/image');

        Image.findByIdAndRemove(this.req.params.id,function(err, image) {
            apiImage.callback(err, image);
        });
    }
};

/**
 * Module exports
 */
module.exports = new ApiImageController();