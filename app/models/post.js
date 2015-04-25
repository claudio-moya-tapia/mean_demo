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
var Image = require('app/models/image');
var Video = require('app/models/video');
var WallPost = require('app/models/wall_post');
var Comment = require('app/models/comment');
var PostLike = require('app/models/post_like');
var Profile = require('app/models/profile');

/**
 * Schema
 */
var PostSchema = new Schema({
    text: {
        type: String,
        default: '',
        trim: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    total_like: {
        type: String,
        default: '',
        trim: true
    },
    total_comment: {
        type: String,
        default: '',
        trim: true
    },
    total_share: {
        type: String,
        default: '',
        trim: true
    },
    ref_profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    ref_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ref_image: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    ref_video: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    ref_wall_post_parent: {
        type: Schema.Types.ObjectId,
        ref: 'WallPost'
    },
    ref_comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    ref_post_like: [{
        type: Schema.Types.ObjectId,
        ref: 'PostLike'
    }]
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
PostSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('Post', PostSchema, 'post');