/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiCommentController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function ApiCommentController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'comment';
    this.comment = {};
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiCommentController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiCommentController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiComment = this;
        var Comment = require('app/models/comment');

        if (typeof this.req.params.id !== 'undefined') {

            var comment = this.find(Comment);
            comment.exec(function(err, comment) {
                apiComment.callback(err, comment);
            });

        } else {

            var comment = this.findAll(Comment);
            comment.exec(function(err, comment) {
                apiComment.callback(err, comment);
            });
        }
    }
};

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiCommentController.prototype.post = function() {

    if (this.isValidPost()) {

        var self = this;
        var Comment = require('app/models/comment');
        var comment = this.setPost(Comment);

        if (comment != null) {

            var ref_user = this.req.user._id;

            var apiProfile = require('app/controllers/apiProfileController');
            apiProfile.getByRefUser(ref_user, function(err, profile) {

                if (!err) {

                    comment.ref_user = ref_user;
                    comment.ref_profile = profile._id;
                    comment.save(function(err, post) {
                        self.postRes(err, post);
                    });

                } else {
                    self.callback(err);
                }
            });
        }
    }
};

ApiCommentController.prototype.postRes = function(err, comment) {

    var self = this;

    switch (comment.source) {
        case 'wall_post':
            var apiPost = require('app/controllers/apiPostController');

            apiPost.addComment(comment.ref_post, comment._id, function(err) {
                self.updateProfileTotalComment(err, comment);
            });

            break;
        case 'page':
            var apiPage = require('app/controllers/apiPageController');

            apiPage.addComment(comment.ref_page, comment._id, function(err) {
                self.updateProfileTotalComment(err, comment);
            });
        case 'gallery':
            var apiPage = require('app/controllers/apiPageController');
            apiPage.addComment(comment.ref_page, comment._id, function(err) {
                self.updateProfileTotalComment(err, comment);
            });
        case 'news':
            var apiPage = require('app/controllers/apiPageController');
            apiPage.addComment(comment.ref_page, comment._id, function(err) {
                self.updateProfileTotalComment(err, comment);
            });
            break;
        case 'menu_home':
            var apiPage = require('app/controllers/apiPageController');
            apiPage.addComment(comment.ref_page, comment._id, function(err) {
                self.updateProfileTotalComment(err, comment);
            });
            break;
        case 'slider':
            var apiPage = require('app/controllers/apiPageController');
            apiPage.addComment(comment.ref_page, comment._id, function(err) {
                self.updateProfileTotalComment(err, comment);
            });
            break;
        case 'interior':
            var apiPage = require('app/controllers/apiPageController');
            apiPage.addComment(comment.ref_page, comment._id, function(err) {
                self.updateProfileTotalComment(err, comment);
            });
            break;
        case 'banner':
            var apiPage = require('app/controllers/apiPageController');
            apiPage.addComment(comment.ref_page, comment._id, function(err) {
                self.updateProfileTotalComment(err, comment);
            });
            break;    
        case 'group_post':
            var apiGroupPost = require('app/controllers/apiGroupPostController');

            apiGroupPost.addComment(comment.ref_group_post, comment._id, function(err) {
                self.updateProfileTotalComment(err, comment);
            });
            break;
        default:
            self.callback('Source is not valid');
            break;
    }
};

ApiCommentController.prototype.updateProfileTotalComment = function(err, comment) {

    var self = this;
    var apiProfile = require('app/controllers/apiProfileController');
    var Comment = require('app/models/comment');
    var commentFind = Comment.find();

    commentFind.and([{'ref_user': comment.ref_user}]);
    commentFind.count();
    commentFind.exec(function(err, totalComment) {

        apiProfile.updateTotalComment(comment.ref_user, totalComment, function(err) {
            self.callback(err, comment);
        });
    });
};
/**
 * Method for PUT requests
 */
ApiCommentController.prototype.put = function() {

    if (this.isValidPut()) {
        var apiComment = this;
        var Comment = require('app/models/comment');

        Comment.findById(this.req.params.id).exec(function(err, comment) {
            apiComment.putCallback(err, comment);
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiCommentController.prototype.putCallback = function(err, comment) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (comment != null) {
            var apiComment = this;
            var comment = this.setPut(comment);

            if (comment != null) {
                comment.save(function(err, comment) {
                    apiComment.callback(err, comment);
                });
            }
        }
    }
};

/**
 * Method for DELETE requests
 * @returns {Object} JSON object
 */
ApiCommentController.prototype.delete = function() {

    if (this.isValidDelete()) {
        var apiComment = this;
        var Comment = require('app/models/comment');

        Comment.findByIdAndRemove(this.req.params.id, function(err, comment) {
            apiComment.callback(err, comment);
        });
    }
};

/**
 * Module exports
 */
module.exports = new ApiCommentController();