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
var Wall = require('app/models/wall');
var Image = require('app/models/image');
var Group = require('app/models/group');

/**
 * Schema
 */
var ProfileSchema = new Schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    first_name: {
        type: String,
        default: '',
        trim: true
    },
    last_name: {
        type: String,
        default: '',
        trim: true
    },
    full_name: {
        type: String,
        default: '',
        trim: true
    },
    location: {
        type: String,
        default: '',
        trim: true
    },
    position: {
        type: String,
        default: '',
        trim: true
    },
    facebook: {
        type: String,
        default: '',
        trim: true
    },
    about_me: {
        type: String,
        default: '',
        trim: true
    },
    birthday: {
        type: Date
    },
    year: {
        type: String,
        default: '',
        trim: true
    },
    month: {
        type: String,
        default: '',
        trim: true
    },
    day: {
        type: String,
        default: '',
        trim: true
    },
    total_post: {
        type: Number,
        default: 0
    },
    total_comment: {
        type: Number,
        default: 0
    },
    total_share: {
        type: Number,
        default: 0
    },
    total_like: {
        type: Number,
        default: 0
    },
    total_friend: {
        type: Number,
        default: 0
    },
    total_follower: {
        type: Number,
        default: 0
    },
    total_group: {
        type: Number,
        default: 0
    },
    ref_wall: {
        type: Schema.Types.ObjectId,
        ref: 'Wall'
    },
    ref_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ref_image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    ref_image_cover: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    ref_profile_friend: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    ref_profile_follower: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    ref_group: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }]
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
ProfileSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('Profile', ProfileSchema, 'profile');