const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    woodCount: {
        type: Number,
        required: true
    },
    defectType: {
        type: String,
        required: true
    },
    defectNo: {
        type: Number,
        required: true
    },
    woodClassification: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Analytic', AnalyticsSchema);