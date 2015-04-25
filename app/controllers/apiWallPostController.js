/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiWallPostController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
*/
function ApiWallPostController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'wall_post';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiWallPostController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiWallPostController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiWallPost = this;
        var WallPost = require('app/models/wall_post');

        if (typeof this.req.params.id !== 'undefined') {

            var wallPost = this.find(WallPost);
            wallPost.exec(function(err, wallPost) {
                apiWallPost.callback(err, wallPost);
            });

        } else {

            var wallPost = this.findAll(WallPost);
            wallPost.exec(function(err, wallPost) {
                apiWallPost.callback(err, wallPost);
            });
        }
    }
};

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiWallPostController.prototype.post = function() {

    if (this.isValidPost()) {

        var apiWallPost = this;
        var WallPost = require('app/models/wall_post');
        var wallPost = this.setPost(WallPost);

        if (wallPost != null) {
            wallPost.save(function(err, wallPost) {
                apiWallPost.callback(err, wallPost);
            });
        }
    }
};

/**
 * Method for PUT requests
 */
ApiWallPostController.prototype.put = function() {

    if (this.isValidPut()) {
        var apiWallPost = this;
        var WallPost = require('app/models/wall_post');

        WallPost.findById(this.req.params.id).exec(function(err, wallPost) {
            apiWallPost.putCallback(err, wallPost);
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiWallPostController.prototype.putCallback = function(err, wallpost) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (wallpost != null) {
            var apiWallPost = this;
            var wallpost = this.setPut(wallpost);

            if (wallpost != null) {
                wallpost.save(function(err, wallPost) {
                    apiWallPost.callback(err, wallPost);
                });
            }
        }
    }
};

/**
 * Method for DELETE requests
 * @returns {Object} JSON object
 */
ApiWallPostController.prototype.delete = function() {

    if (this.isValidDelete()) {
        var apiWallPost = this;
        var WallPost = require('app/models/wall_post');

        WallPost.findByIdAndRemove(this.req.params.id,function(err, wallPost) {
            apiWallPost.callback(err, wallPost);
        });
    }
};

/**
 * Custom methods
 */
ApiWallPostController.prototype.share = function(profile, ref_wall_post,callback) {
    var self = this;
    var WallPost = require('app/models/wall_post');
    
    WallPost.findById(ref_wall_post).exec(function(err, wallPost) {
        
        var wallPostNew = new WallPost();
        wallPostNew.ref_profile_target = wallPost.ref_profile_target;
        wallPostNew.ref_profile = profile._id;
        wallPostNew.ref_user = profile.ref_user;
        wallPostNew.ref_wall = wallPost.ref_wall;
        wallPostNew.ref_post = wallPost.ref_post;
        wallPostNew.location = 'share';
        wallPostNew.save(function(err, wallPostNew){
            self.shareRes(err, profile, wallPostNew, callback);
        });
    });
};

ApiWallPostController.prototype.shareRes = function(err, profile, wallPost, callback){

    var apiWall = require('app/controllers/apiWallController');

    apiWall.addWallPost(profile, wallPost, function(err, wall) {
        callback(err, wall);
    });
};

ApiWallPostController.prototype.addPost = function(options,callback) {
    var WallPost = require('app/models/wall_post');
    
    var wallPost = new WallPost();
    wallPost.ref_post = options.ref_post;
    wallPost.ref_wall = options.ref_wall;
    wallPost.ref_user = options.ref_user;
    wallPost.ref_profile = options.ref_profile;
    wallPost.ref_profile_target = options.ref_profile_target;
    wallPost.location = options.location;
    wallPost.save(callback);
};

ApiWallPostController.prototype.updateWall = function(wallPostId, wallId, callback) {
    
    var WallPost = require('app/models/wall_post');
    var condition = {
        '_id': wallPostId
    };
    var data = {
        'ref_wall': wallId,
        'date_updated' : Date.now()
    };

    WallPost.findOneAndUpdate(condition, data, callback);
};

ApiWallPostController.prototype.updateDateUpdated = function(wallPostId, callback) {
    
    var WallPost = require('app/models/wall_post');
    var condition = {
        '_id': wallPostId
    };
    var data = {
        'date_updated' : Date.now()
    };

    WallPost.findOneAndUpdate(condition, data, callback);
};

/**
 * Module exports
 */
module.exports = new ApiWallPostController();