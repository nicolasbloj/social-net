'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = Schema({
    text: String,
    file: String,
    created_at: String,
    user: { type: Schema.ObjectId, reg: 'User' }
});
//_id generado automaticamente .

module.exports = mongoose.model('Publication', PublicationSchema);
// Se crearà en DB collection "publications"