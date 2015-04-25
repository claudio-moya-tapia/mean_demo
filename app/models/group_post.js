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
var Comment = require('app/models/comment');
var PostLike = require('app/models/post_like');
var Profile = require('app/models/profile');
var Group = require('app/models/group');

/**
 * Schema
 */
var GroupPostSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true
    },
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
    ref_group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    ref_image: [{
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }],
    ref_video: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
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
GroupPostSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('GroupPost', GroupPostSchema, 'group_post');