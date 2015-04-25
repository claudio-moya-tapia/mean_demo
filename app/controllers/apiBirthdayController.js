/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiFriendController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function ApiBirthdayController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'profile';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiBirthdayController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiBirthdayController.prototype.get = function() {

   if (this.isValidGet()) {

        var apiProfile = this;
        var Profile = require('app/models/profile');

   
        var profile = this.findAll(Profile);
        profile.exec(function(err, profile) {
            apiProfile.callback(err, profile);
        });
        
    }
};

/**
 * Method for PUT requests
 */
ApiBirthdayController.prototype.put = function() {

    if (this.isValidPut()) {

        var apiProfile = this;
        var Profile = require('app/models/profile');

        Profile.where({ref_user: this.req.user._id}).findOne(function(err, profile) {
            if (!err) {
                apiProfile.putCallback(err, profile);
            } else {
                apiProfile.callback(err);
            }
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiBirthdayController.prototype.putCallback = function(err, profile) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (profile != null) {
            var apiProfile = this;

            var profile = this.setPut(profile);

            if (profile != null) {

                profile.save(function(err, profile) {

                    if (!err) {
                        apiProfile.checkFollowers(err, profile);
                    } else {
                        apiProfile.callback(err);
                    }
                });
            }
        }
    }
};


/**
 * Module exports
 */
module.exports = new ApiBirthdayController();