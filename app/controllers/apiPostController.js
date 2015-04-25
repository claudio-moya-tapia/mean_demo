/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiPostController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function ApiPostController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'post';
    this.profile = {};
    this.postNew = {};
    this.wallPostNew = {};
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiPostController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiPostController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiPost = this;
        var Post = require('app/models/post');

        if (typeof this.req.params.id !== 'undefined') {

            var post = this.find(Post);
            post.exec(function(err, post) {
                apiPost.callback(err, post);
            });

        } else {

            var post = this.findAll(Post);
            post.exec(function(err, post) {
                apiPost.callback(err, post);
            });
        }
    }
};

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiPostController.prototype.post = function() {

    if (this.isValidPost()) {

        var self = this;
        var Post = require('app/models/post');
        var post = this.setPost(Post);

        if (post != null) {

            var ref_user = this.req.user._id;
            
            var apiProfile = require('app/controllers/apiProfileController');
            apiProfile.getByRefUser(ref_user, function(err, profile) {

                if (!err) {

                    self.profile = profile;

                    post.ref_user = ref_user;
                    post.ref_profile = profile._id;
                    post.save(function(err, post) {
                        self.postRes(err, post);
                    });

                } else {
                    self.callback(err);
                }
            });
        }
    }
};

ApiPostController.prototype.postRes = function(err, post) {

    this.postNew = post;
    var self = this;

    var location = 'my_wall';

    if (self.profile._id != this.req.body.ref_profile) {
        location = 'other_wall';
    }

    var options = {
        ref_post: post._id,
        ref_wall: self.profile.ref_wall,
        ref_user: this.req.user._id,
        ref_profile: self.profile._id,
        ref_profile_target: this.req.body.ref_profile,
        location: location
    };

    var apiWallPost = require('app/controllers/apiWallPostController');

    apiWallPost.addPost(options, function(err, wallPost) {
        self.addPostRes(err, wallPost);
    });
};

ApiPostController.prototype.addPostRes = function(err, wallPost) {

    this.wallPostNew = wallPost;
    var self = this;
    var apiWall = require('app/controllers/apiWallController');

    apiWall.addWallPost(self.profile, wallPost, function(err, wall) {
        self.addWallPostRes(err, wall);
    });
};

ApiPostController.prototype.addWallPostRes = function(err, wall) {

    var self = this;
    var Post = require('app/models/post');
    var condition = {
        '_id': this.postNew._id
    };
    var data = {
        'ref_wall_post_parent': this.wallPostNew._id,
        'date_updated': Date.now()
    };

    Post.findOneAndUpdate(condition, data, function(err, post) {
        self.updateProfileTotalPost(err, post, wall);
    });
};

ApiPostController.prototype.updateProfileTotalPost = function(err, post, wall) {
    var self = this;
    var apiProfile = require('app/controllers/apiProfileController');

    apiProfile.updateTotalPost(wall.ref_user, wall.ref_wall_post.length, function() {
        self.callback(err, post);
    });
};

/**
 * Method for PUT requests
 */
ApiPostController.prototype.put = function() {

    if (this.isValidPut()) {
        var apiPost = this;
        var Post = require('app/models/post');

        Post.findById(this.req.params.id).exec(function(err, post) {
            apiPost.putCallback(err, post);
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiPostController.prototype.putCallback = function(err, post) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (post != null) {
            var apiPost = this;
            var post = this.setPut(post);

            if (post != null) {
                post.save(function(err, post) {
                    apiPost.callback(err, post);
                });
            }
        }
    }
};

/**
 * Method for DELETE requests
 * @returns {Object} JSON object
 */
ApiPostController.prototype.delete = function() {

    if (this.isValidDelete()) {
        var apiPost = this;
        var Post = require('app/models/post');

        Post.findByIdAndRemove(this.req.params.id, function(err, post) {
            apiPost.callback(err, post);
        });
    }
};

/**
 * Custom methods
 */
ApiPostController.prototype.addComment = function(postId, commentId, callback) {
    var apiPost = this;
    var Post = require('app/models/post');

    Post.findById(postId).exec(function(err, post) {

        if (!err) {

            post.ref_comment.push(commentId);
            post.save(function(err, post) {
                apiPost.updateWallPost(err, post, callback);
            });

        } else {
            callback(err);
        }
    });
};

ApiPostController.prototype.updateLike = function(postId, postLikeId, callback) {
    var apiPost = this;
    var Post = require('app/models/post');

    Post.findById(postId).exec(function(err, post) {

        if (!err) {

            var index = post.ref_post_like.indexOf(postLikeId);

            if (index == -1) {
                post.ref_post_like.push(postLikeId);
            } else {
                post.ref_post_like.splice(index, 1);
            }

            post.save(function(err, post) {
                apiPost.updateWallPost(err, post, callback);
            });

        } else {
            callback(err);
        }
    });
};

ApiPostController.prototype.updateWallPost = function(err, post, callback) {

    if (!err) {
        var apiWallPost = require('app/controllers/apiWallPostController');

        apiWallPost.updateDateUpdated(post.ref_wall_post_parent, function(err) {
            callback(err, post);
        });

    } else {
        callback(err);
    }
};


/**
 * Module exports
 */
module.exports = new ApiPostController();