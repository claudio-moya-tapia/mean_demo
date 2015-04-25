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
function ApiFriendController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'profile';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiFriendController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiFriendController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiProfile = this;
        var Profile = require('app/models/profile');

        if (typeof this.req.params.id !== 'undefined') {

            var profile = this.find(Profile);
            profile.id = this.req.params.id;
            profile.exec(function(err, profile) {
                apiProfile.callback(err, profile);
            });

        } else {

            var profile = this.findAll(Profile);
            profile.exec(function(err, profile) {
                apiProfile.callback(err, profile);
            });
        }
    }
};

/**
 * Method for PUT requests
 */
ApiFriendController.prototype.put = function() {

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
ApiFriendController.prototype.putCallback = function(err, profile) {

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

ApiFriendController.prototype.checkFollowers = function(err, profile) {

    var apiProfile = this;

    var Profile = require('app/models/profile');
    
    var fields = {
        total_follower: 0,
        total_friend: 0
    };

    //reset totals of all profiles
    Profile.update(fields, function(err) {

        if (!err) {
            
            var where = {
                ref_profile_follower: {
                    $in: new Array(profile._id)
                }
            };
            
            var pull = {
                ref_profile_follower: profile._id
            };
            
            //remove my profile from all the ref_profile_follower 
            Profile.where(where)
                .setOptions({multi: true})
                .update({
                    $pull: pull
                }, function(err) {

                    if (!err) {
                        apiProfile.addFollowers(err, profile);
                    } else {
                        apiProfile.callback(err);
                    }
                });
            
        } else {
            apiProfile.callback(err);
        }
    });
};

ApiFriendController.prototype.addFollowers = function(err, profile) {

    var apiProfile = this;

    if (profile.ref_profile_friend.length > 0) {
        //Add followers
        var Profile = require('app/models/profile');
        var where = {
            _id: {
                $in: profile.ref_profile_friend
            }
        };

        var push = {
            ref_profile_follower: profile._id
        };

        Profile.where(where)
                .setOptions({multi: true, upsert: true})
                .update({
                    $push: push
                }, function(err, data) {

                    if (!err) {
                        apiProfile.updateFriendsAndFollowersTotal(err, profile);
                    } else {
                        apiProfile.callback(err);
                    }
                });
    } else {
        apiProfile.updateFriendsAndFollowersTotal(err, profile);
    }
};

ApiFriendController.prototype.updateFriendsAndFollowersTotal = function(err, profile) {
    var apiProfile = this;

    //Update references to new followers
    var Profile = require('app/models/profile');
    var profileFind = Profile.find();
    var itemsUpdated = 0;

    var select = '_id ref_profile_friend ref_profile_follower total_friend total_follower';
    profileFind.select(select).exec(function(err, aryProfileFollower) {

        for (var x in aryProfileFollower) {
            var profileFollower = aryProfileFollower[x];

            profileFollower.total_friend = profileFollower.ref_profile_friend.length;
            profileFollower.total_follower = profileFollower.ref_profile_follower.length;
            profileFollower.save(function(err) {

                itemsUpdated++;

                if (aryProfileFollower.length == itemsUpdated) {
                    apiProfile.callback(err, profile);
                }
            });
        }
    });
};

/**
 * Module exports
 */
module.exports = new ApiFriendController();