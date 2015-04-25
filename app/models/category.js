/**
 * Modules
 */
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Schema = mongoose.Schema;


/**
 * Schema
 */
var CategorySchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Plugin deepPopulate to populate data on multiple references
 */
CategorySchema.plugin(deepPopulate);

/**
 * Module Exports
 */
module.exports = mongoose.model('Category', CategorySchema, 'category');