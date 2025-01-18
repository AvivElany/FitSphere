const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    key: { type: String, required: true, trim: true
    },
    value: {
        type: [String], required: true, trim: true
    }
});

module.exports = mongoose.model('Content', contentSchema);
