/**
 * Modules
 */
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Schema = mongoose.Schema;


/**
 * Schema
 */
var VideoSchema = new Schema({
    url: {
        type: String,
        default: '',
        trim: true
    },
    source: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
VideoSchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('Video', VideoSchema, 'video');