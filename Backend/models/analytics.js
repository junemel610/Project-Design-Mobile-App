const mongoose = require('mongoose');

const DefectSchema = new mongoose.Schema({
    defectType: { type: String, required: true }, 
    count: { type: Number, required: true, min: 0 } 
});

const AnalyticsSchema = new mongoose.Schema({
    woodCount: { type: Number, required: true, min: 0 }, 
    defects: [DefectSchema], 
    defectNo: { type: Number, required: true, min: 0 }, 
    woodClassification: { type: String, required: true }, 
    date: { type: Date, required: true }, 
    time: { type: String, required: true } 
});

module.exports = mongoose.model('Analytic', AnalyticsSchema);