/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class ApiGroupController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function ApiGroupController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'group';
}

/**
 * Overwrite the original prototype to extends REST class
 */
ApiGroupController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
ApiGroupController.prototype.get = function() {

    if (this.isValidGet()) {

        var apiGroup = this;
        var Group = require('app/models/group');

        if (typeof this.req.params.id !== 'undefined') {

            var group = this.find(Group);
            group.exec(function(err, group) {
                apiGroup.callback(err, group);
            });

        } else {

            var group = this.findAll(Group);
            group.exec(function(err, group) {
                apiGroup.callback(err, group);
            });
        }
    }
};

/**
 * Method for POST requests
 * @returns {Object} JSON object
 */
ApiGroupController.prototype.post = function() {

    if (this.isValidPost()) {

        var apiGroup = this;
        var Group = require('app/models/group');
        var group = this.setPost(Group);

        if (group != null) {

            var ref_user = this.req.user._id;

            var apiProfile = require('app/controllers/apiProfileController');
            apiProfile.getByRefUser(ref_user, function(err, profile) {

                if (!err) {

                    group.ref_user_owner = ref_user;
                    group.ref_profile_owner = profile._id;
                    group.ref_profile_member.push(profile._id);
                    group.total_member = 1;
                    group.save(function(err, group) {
                        apiGroup.postRes(err, group, profile);
                    });

                } else {
                    apiGroup.callback(err);
                }
            });
        }
    }
};

ApiGroupController.prototype.postRes = function(err, group) {
    var self = this;
    var apiProfile = require('app/controllers/apiProfileController');

    self.getGroupUserRelated(group.ref_profile_owner, function(aryGroup) {

        apiProfile.updateTotalGroup(group.ref_user_owner, aryGroup.length, function(err) {

            apiProfile.updateGroup(group.ref_user_owner, aryGroup, function(err) {
                self.callback(err, group);
            });
        });
    });
};

ApiGroupController.prototype.getGroupUserRelated = function(ref_profile_owner, callback) {

    var Group = require('app/models/group');
    var groupFind = Group.find();
    var aryMember = new Array();

    aryMember.push(new Object(ref_profile_owner));

    groupFind.select('_id');
    groupFind.where('ref_profile_member').in(aryMember);
    groupFind.exec(function(err, aryGroup) {

        var groupFind = Group.find();
        groupFind.select('_id');
        groupFind.and([{'ref_profile_owner': ref_profile_owner}]);
        groupFind.exec(function(err, aryGroupOwner) {

            var aryContact = aryGroup.concat(aryGroupOwner);
            var aryIds = [];

            for (var i in aryContact) {
                aryIds.push(aryContact[i]._id.toString());
            }

            aryIds = aryIds.filter(function(item, pos) {
                return aryIds.indexOf(item) == pos;
            });

            callback(aryIds);
        });
    });
};

/**
 * Method for PUT requests
 */
ApiGroupController.prototype.put = function() {

    if (this.isValidPut()) {
        var apiGroup = this;
        var Group = require('app/models/group');

        Group.findById(this.req.params.id).exec(function(err, group) {
            apiGroup.putCallback(err, group);
        });
    }
};

/**
 * Method for PUT requests
 * @param {Object} err Error object
 * @param {Object} model MongooseJS model
 * @returns {Object} JSON object
 */
ApiGroupController.prototype.putCallback = function(err, group) {

    if (err) {
        this.res.status(400).send('Bad Request: ' + err.message);
    } else {
        if (group != null) {
            var apiGroup = this;
            var group = this.setPut(group);

            if (group != null) {

                group.save(function(err, group) {
                    apiGroup.updateReferences(group);
                });
            }
        }
    }
};

ApiGroupController.prototype.updateReferences = function(group) {

    var self = this;
    var ref_user = this.req.user._id;

    var apiProfile = require('app/controllers/apiProfileController');
    apiProfile.getByRefUser(ref_user, function(err, profile) {

        if (!err) {

            self.getGroupUserRelated(profile._id, function(aryGroup) {

                apiProfile.updateTotalGroup(profile.ref_user, aryGroup.length, function(err) {

                    apiProfile.updateGroup(profile.ref_user, aryGroup, function(err) {
                        self.callback(err, group);
                    });
                });

            });

        } else {
            self.callback(err);
        }
    });
};

/**
 * Method for DELETE requests
 * @returns {Object} JSON object
 */
ApiGroupController.prototype.delete = function() {

    if (this.isValidDelete()) {
        var apiGroup = this;
        var Group = require('app/models/group');

        Group.findByIdAndRemove(this.req.params.id, function(err, group) {
            apiGroup.callback(err, group);
        });
    }
};

/**
 * Module exports
 */
module.exports = new ApiGroupController();