/**
 * Modules
 */
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Schema = mongoose.Schema;

/**
 * Reference Schema
 */
var Image = require('app/models/image');
var User = require('app/models/user');
var Profile = require('app/models/profile');

/**
 * Schema
 */
var GroupSchema = new Schema({
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
    privado: {
        type: Boolean,
        default: false
    },
    total_member: {
        type: Number,
        default: 0
    },
    total_post: {
        type: Number,
        default: 0
    },
    total_comment: {
        type: Number,
        default: 0
    },
    ref_image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    ref_user_owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ref_profile_owner: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    ref_profile_member: [{
            type: Schema.Types.ObjectId,
            ref: 'Profile'
        }]
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
GroupSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('Group', GroupSchema, 'group');