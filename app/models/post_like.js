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
var Post = require('app/models/post');
var GroupPost = require('app/models/group_post');

/**
 * Schema
 */
var PostLikeSchema = new Schema({
    date_created: {
        type: Date,
        default: Date.now
    },
    ref_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ref_post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    ref_group_post: {
        type: Schema.Types.ObjectId,
        ref: 'GroupPost'
    }
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
PostLikeSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('PostLike', PostLikeSchema, 'post_like');