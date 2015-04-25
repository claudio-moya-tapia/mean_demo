/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiProfileController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function ApiProfileController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'profile';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiProfileController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiProfileController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiProfile = this;
        var Profile = require('app/models/profile');

        if (typeof this.req.params.id !== 'undefined') {

            var profile = this.find(Profile);
            profile.exec(function(err, profile) {
                apiProfile.callback(err, profile);
            });

        } else {

            var profile = this.findAll(Profile);
            profile.and([{'ref_user': this.req.user._id}]);
            profile.exec(function(err, profile) {
                apiProfile.callback(err, profile);
            });
        }
    }
};

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiProfileController.prototype.post = function() {

    if (this.isValidPost()) {

        var apiProfile = this;
        var Profile = require('app/models/profile');
        var profile = this.setPost(Profile);

        if (profile != null) {
            profile.save(function(err, profile) {
                apiProfile.callback(err, profile);
            });
        }
    }
};

/**
 * Method for PUT requests
 */
ApiProfileController.prototype.put = function() {

    if (this.isValidPut()) {
        var apiProfile = this;
        var Profile = require('app/models/profile');

        Profile.findById(this.req.params.id).exec(function(err, profile) {
            apiProfile.putCallback(err, profile);
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiProfileController.prototype.putCallback = function(err, profile) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (profile != null) {
            var apiProfile = this;
            var profile = this.setPut(profile);

            if (profile != null) {
                profile.save(function(err, profile) {
                    apiProfile.callback(err, profile);
                });
            }
        }
    }
};

/**
 * Method for DELETE requests
 * @returns {Object} JSON object
 */
ApiProfileController.prototype.delete = function() {

    if (this.isValidDelete()) {
        var apiProfile = this;
        var Profile = require('app/models/profile');

        Profile.findByIdAndRemove(this.req.params.id, function(err, profile) {
            apiProfile.callback(err, profile);
        });
    }
};

/**
 * Custom methods
 */
ApiProfileController.prototype.getByRefUser = function(ref_user, callback) {
    
    var Profile = require('app/models/profile');
    Profile.where({ref_user: ref_user}).findOne(function(err, profile) {

        if (!err) {
            callback(err, profile);
            
        } else {
            callback(err);
        }
    });
};

ApiProfileController.prototype.updateTotalComment = function(ref_user, totalComment, callback) {
    var Profile = require('app/models/profile');

    var condition = {
        'ref_user': ref_user
    };
    var data = {
        'total_comment': totalComment
    };

    Profile.findOneAndUpdate(condition, data, callback);
};

ApiProfileController.prototype.updateTotalGroup = function(ref_user, totalGroup, callback) {
    var Profile = require('app/models/profile');

    var condition = {
        'ref_user': ref_user
    };
    var data = {
        'total_group': totalGroup
    };

    Profile.findOneAndUpdate(condition, data, callback);
};

ApiProfileController.prototype.updateTotalPost = function(ref_user, totalPost, callback) {
    var Profile = require('app/models/profile');

    var condition = {
        'ref_user': ref_user
    };
    var data = {
        'total_post': totalPost
    };

    Profile.findOneAndUpdate(condition, data, callback);
};

ApiProfileController.prototype.updateTotalPost = function(ref_user, totalPost, callback) {
    var Profile = require('app/models/profile');

    var condition = {
        'ref_user': ref_user
    };
    var data = {
        'total_post': totalPost
    };

    Profile.findOneAndUpdate(condition, data, callback);
};

ApiProfileController.prototype.updateGroup = function(ref_user, ref_group, callback) {
    var Profile = require('app/models/profile');

    var condition = {
        'ref_user': ref_user
    };
    var data = {
        'ref_group': ref_group
    };

    Profile.findOneAndUpdate(condition, data, callback);
};

/**
 * Module exports
 */
module.exports = new ApiProfileController();