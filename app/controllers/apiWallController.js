/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiWallController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function ApiWallController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'wall';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiWallController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiWallController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiWall = this;
        var Wall = require('app/models/wall');

        var wall = this.findAll(Wall);

        if (typeof this.req.query.search !== 'undefined') {
            wall.and([{'ref_profile': this.req.query.search.and.ref_profile}]);
        } else {
            wall.and([{'ref_user': this.req.user._id}]);
        }

        wall.exec(function(err, wall) {
            apiWall.callback(err, wall);
        });
    }
};

/**
 * Custom methods
 */
ApiWallController.prototype.addWallPost = function(profile, wallPost, callback) {

    var Wall = require('app/models/wall');

    var aryRefProfile = [];

    if(wallPost.location == 'other_wall'){
        aryRefProfile.push(wallPost.ref_profile_target);
    }
    
    if (profile.ref_profile_follower.length > 0) {
        aryRefProfile = profile.ref_profile_follower;
    }

    aryRefProfile.push(profile._id);
    
    var where = {ref_profile: {$in: aryRefProfile}};
    var push = {ref_wall_post: wallPost._id};

    Wall.where(where)
            .setOptions({multi: true, upsert: true})
            .update({$push: push, 'date_updated': Date.now()}, function(err, data) {

                Wall.where({ref_user: profile.ref_user}).findOne(function(err, wall) {
                    callback(err, wall);
                });

            });
};

/**
 * Module exports
 */
module.exports = new ApiWallController();