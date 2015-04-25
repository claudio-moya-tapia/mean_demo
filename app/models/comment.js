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
var Post = require('app/models/post');
var Page = require('app/models/page');
var Group = require('app/models/group');
var GroupPost = require('app/models/group_post');

/**
 * Schema
 */
var CommentSchema = new Schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        default: '',
        trim: true
    },
    source: {
        type: String,
        default: 'wall_post',
        trim: true
    },
    ref_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ref_profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    ref_post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    ref_page: {
        type: Schema.Types.ObjectId,
        ref: 'Page'
    },
    ref_group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    ref_group_post: {
        type: Schema.Types.ObjectId,
        ref: 'GroupPost'
    }
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
CommentSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('Comment', CommentSchema, 'comment');