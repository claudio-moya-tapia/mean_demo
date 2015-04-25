/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiPostLikeController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function ApiPostLikeController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'post_like';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiPostLikeController.prototype = rest;

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiPostLikeController.prototype.post = function() {

    if (this.isValidPost()) {

        var apiPostLike = this;
        var PostLike = require('app/models/post_like');

        var postLike = PostLike.find();
        postLike.where({'ref_user': this.req.user._id});
        
        if (typeof this.req.body.ref_post !== 'undefined') {
            postLike.where({'ref_post': this.req.body.ref_post});
        }
        
        if (typeof this.req.body.ref_group_post !== 'undefined') {
            postLike.where({'ref_group_post': this.req.body.ref_group_post});
        }
        
        postLike.exec(function(err, postLike) {
            apiPostLike.postRes(err, postLike[0]);
        });
    }
};

ApiPostLikeController.prototype.postRes = function(err, postLike) {
    
    var apiPostLike = this;
    
    if (postLike == null) {

        var PostLike = require('app/models/post_like');
        var postLike = apiPostLike.setPost(PostLike);

        if (postLike != null) {

            postLike.ref_user = apiPostLike.req.user._id;
            postLike.save(function(err, postLike) {
                apiPostLike.updatePostLike(err, postLike);
            });
        }

    } else {
        var PostLike = require('app/models/post_like');
        PostLike.findByIdAndRemove(postLike._id, function(err, postLike) {
            apiPostLike.updatePostLike(err, postLike);
        });
    }
};

ApiPostLikeController.prototype.updatePostLike = function(err, postLike) {
    var apiPostLike = this;
    
    if (typeof postLike.ref_post !== 'undefined') {
        var apiPost = require('app/controllers/apiPostController');
    
        apiPost.updateLike(postLike.ref_post, postLike._id, function(err, post){
            apiPostLike.callback(err, post);
        });
    }
    
    if (typeof postLike.ref_group_post !== 'undefined') {
        var apiGroupPost = require('app/controllers/apiGroupPostController');
    
        apiGroupPost.updateLike(postLike.ref_group_post, postLike._id, function(err, post){
            apiPostLike.callback(err, post);
        });
    }
};

/**
 * Module exports
 */
module.exports = new ApiPostLikeController();