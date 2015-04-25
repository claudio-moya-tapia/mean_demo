/**
 * Modules
 */
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Schema = mongoose.Schema;

/**
 * Reference Schema
 */
var User = require('app/models/user');
var Profile = require('app/models/profile');
var WallPost = require('app/models/wall_post');

/**
 * Schema
 */
var WallSchema = new Schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    ref_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ref_profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    ref_wall_post: [{
            type: Schema.Types.ObjectId,
            ref: 'WallPost'
        }]
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
WallSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('Wall', WallSchema, 'wall');