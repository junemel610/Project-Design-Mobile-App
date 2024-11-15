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
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Analytic', AnalyticsSchema);