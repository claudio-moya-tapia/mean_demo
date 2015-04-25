/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiGroupPostController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
*/
function ApiGroupPostController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'group_post';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiGroupPostController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiGroupPostController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiGroupPost = this;
        var GroupPost = require('app/models/group_post');

        if (typeof this.req.params.id !== 'undefined') {

            var groupPost = this.find(GroupPost);
            groupPost.exec(function(err, groupPost) {
                apiGroupPost.callback(err, groupPost);
            });

        } else {

            var groupPost = this.findAll(GroupPost);
            groupPost.exec(function(err, groupPost) {
                apiGroupPost.callback(err, groupPost);
            });
        }
    }
};

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiGroupPostController.prototype.post = function() {

    if (this.isValidPost()) {

        var apiGroupPost = this;
        var GroupPost = require('app/models/group_post');
        var groupPost = this.setPost(GroupPost);

        if (groupPost != null) {
            
            var ref_user = this.req.user._id;

            var apiProfile = require('app/controllers/apiProfileController');
            apiProfile.getByRefUser(ref_user, function(err, profile) {

                if (!err) {

                    groupPost.ref_user = ref_user;
                    groupPost.ref_profile = profile._id;
                    groupPost.save(function(err, groupPost) {
                        apiGroupPost.callback(err, groupPost);
                    });

                } else {
                    apiGroupPost.callback(err);
                }
            });
        }
    }
};

/**
 * Method for PUT requests
 */
ApiGroupPostController.prototype.put = function() {

    if (this.isValidPut()) {
        var apiGroupPost = this;
        var GroupPost = require('app/models/group_post');

        GroupPost.findById(this.req.params.id).exec(function(err, groupPost) {
            apiGroupPost.putCallback(err, groupPost);
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiGroupPostController.prototype.putCallback = function(err, grouppost) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (grouppost != null) {
            var apiGroupPost = this;
            var grouppost = this.setPut(grouppost);

            if (grouppost != null) {
                grouppost.save(function(err, groupPost) {
                    apiGroupPost.callback(err, groupPost);
                });
            }
        }
    }
};

/**
 * Method for DELETE requests
 * @returns {Object} JSON object
 */
ApiGroupPostController.prototype.delete = function() {

    if (this.isValidDelete()) {
        var apiGroupPost = this;
        var GroupPost = require('app/models/group_post');

        GroupPost.findByIdAndRemove(this.req.params.id,function(err, groupPost) {
            apiGroupPost.callback(err, groupPost);
        });
    }
};

/**
 * Custom methods
 */
ApiGroupPostController.prototype.addComment = function(groupPostId, commentId, callback) {
   
    var apiGroupPost = this;
    var GroupPost = require('app/models/group_post');

    GroupPost.findById(groupPostId).exec(function(err, groupPost) {

        if (!err) {

            groupPost.ref_comment.push(commentId);
            groupPost.save(function(err, groupPost) {
                apiGroupPost.updateDateUpdated(groupPost._id, callback);
            });

        } else {
            callback(err);
        }
    });
};

ApiGroupPostController.prototype.updateLike = function(groupPostId, postLikeId, callback) {
    var apiGroupPost = this;
    var GroupPost = require('app/models/group_post');

    GroupPost.findById(groupPostId).exec(function(err, groupPost) {

        if (!err) {

            var index = groupPost.ref_post_like.indexOf(postLikeId);

            if (index == -1) {
                groupPost.ref_post_like.push(postLikeId);
            } else {
                groupPost.ref_post_like.splice(index, 1);
            }

            groupPost.save(function(err, groupPost) {
                apiGroupPost.updateDateUpdated(groupPost._id, callback);
            });

        } else {
            callback(err);
        }
    });
};

ApiGroupPostController.prototype.updateDateUpdated = function(groupPostId, callback) {
    
    var GroupPost = require('app/models/group_post');
    var condition = {
        '_id': groupPostId
    };
    var data = {
        'date_updated' : Date.now()
    };

    GroupPost.findOneAndUpdate(condition, data, callback);
};

/**
 * Module exports
 */
module.exports = new ApiGroupPostController();