/**
 * Modules
 */
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Schema = mongoose.Schema;


/**
 * Schema
 */
var ImageSchema = new Schema({
    image_original: {
        type: String,
        default: '',
        trim: true
    },
    image_small: {
        type: String,
        default: '',
        trim: true
    },
    image_medium: {
        type: String,
        default: '',
        trim: true
    },
    image_large: {
        type: String,
        default: '',
        trim: true
    },
    image_name: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
ImageSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('Image', ImageSchema, 'image');