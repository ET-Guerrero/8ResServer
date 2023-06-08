const { Schema, model } = require('mongoose');

const YoyoSchema = Schema({
    yo: {
        type: String,
        required: [true, 'El yo es obligatorio']
    }

})

module.exports = model('Yoyo', YoyoSchema)