/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiPostShareController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function ApiPostShareController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'wall_post';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiPostShareController.prototype = rest;

/**
 * Method for PUT requests
 */
ApiPostShareController.prototype.put = function() {

    if (this.isValidPut()) {
        var self = this;
        var ref_user = this.req.user._id;
        var ref_wall_post = this.req.params.id;

        var apiProfile = require('app/controllers/apiProfileController');
        var apiWallPost = require('app/controllers/apiWallPostController');
        
        apiProfile.getByRefUser(ref_user, function(err, profile) {
            
            apiWallPost.share(profile, ref_wall_post, function(err, wallPost) {
                self.callback(err, wallPost);
            });
        });
    }
};

/**
 * Module exports
 */
module.exports = new ApiPostShareController();