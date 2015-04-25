/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiVideoController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
*/
function ApiVideoController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'video';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiVideoController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiVideoController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiVideo = this;
        var Video = require('app/models/video');

        if (typeof this.req.params.id !== 'undefined') {

            var video = this.find(Video);
            video.exec(function(err, video) {
                apiVideo.callback(err, video);
            });

        } else {

            var video = this.findAll(Video);
            video.exec(function(err, video) {
                apiVideo.callback(err, video);
            });
        }
    }
};

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiVideoController.prototype.post = function() {

    if (this.isValidPost()) {

        var apiVideo = this;
        var Video = require('app/models/video');
        var video = this.setPost(Video);

        if (video != null) {
            video.save(function(err, video) {
                apiVideo.callback(err, video);
            });
        }
    }
};

/**
 * Method for PUT requests
 */
ApiVideoController.prototype.put = function() {

    if (this.isValidPut()) {
        var apiVideo = this;
        var Video = require('app/models/video');

        Video.findById(this.req.params.id).exec(function(err, video) {
            apiVideo.putCallback(err, video);
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiVideoController.prototype.putCallback = function(err, video) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (video != null) {
            var apiVideo = this;
            var video = this.setPut(video);

            if (video != null) {
                video.save(function(err, video) {
                    apiVideo.callback(err, video);
                });
            }
        }
    }
};

/**
 * Method for DELETE requests
 * @returns {Object} JSON object
 */
ApiVideoController.prototype.delete = function() {

    if (this.isValidDelete()) {
        var apiVideo = this;
        var Video = require('app/models/video');

        Video.findByIdAndRemove(this.req.params.id,function(err, video) {
            apiVideo.callback(err, video);
        });
    }
};

/**
 * Module exports
 */
module.exports = new ApiVideoController();