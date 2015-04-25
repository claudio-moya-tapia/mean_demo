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
var Comment = require('app/models/comment');
var Profile = require('app/models/profile');
var User = require('app/models/user');

/**
 * Schema
 */
var PageSchema = new Schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        default: '',
        trim: true
    },
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
    lower: {
        type: String,
        default: '',
        trim: true
    },
    font_awsome_icon: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        default: '',
        trim: true
    },
    url_external: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 1
    },
    ref_profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    ref_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ref_image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    ref_image_related: [{
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }],
    ref_comment: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
    prominent: {
        type: Boolean,
        default: false
    }
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
PageSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('Page', PageSchema, 'page');