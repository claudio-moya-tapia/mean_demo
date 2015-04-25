/**
 * Modules
 */
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Schema = mongoose.Schema;

/**
* Reference Schema
*/
var Wall = require('app/models/wall');
var User = require('app/models/user');
var Profile = require('app/models/profile');
var Post = require('app/models/post');

/**
 * Schema
 */
var WallPostSchema = new Schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    ref_wall: {
        type: Schema.Types.ObjectId,
        ref: 'Wall'
    },
    ref_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ref_profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    ref_profile_target: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    location: {
        type: String,
        default: '',
        trim: true
    },
    ref_post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
WallPostSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('WallPost', WallPostSchema, 'wall_post');