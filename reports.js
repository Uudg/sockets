const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    message_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;