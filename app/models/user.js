/**
 * Modules
 */
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Schema = mongoose.Schema;

/**
 * Schema
 */
var UserSchema = new Schema({
    local_email: {
        type: String,
        default: '',
        trim: true
    },
    local_password: {
        type: String,
        default: '',
        trim: true
    },
    google_id: {
        type: String,
        default: '',
        trim: true
    },
    google_token: {
        type: String,
        default: '',
        trim: true
    },
    google_email: {
        type: String,
        default: '',
        trim: true
    },
    google_name: {
        type: String,
        default: '',
        trim: true
    },
    google_first_name: {
        type: String,
        default: '',
        trim: true
    },
    google_last_name: {
        type: String,
        default: '',
        trim: true
    },
    google_hd: {
        type: String,
        default: '',
        trim: true
    },
    google_img: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
UserSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('User', UserSchema, 'user');