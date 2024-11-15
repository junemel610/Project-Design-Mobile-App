const jwt = require('jsonwebtoken');
const wood = require('../models/analytics');

exports.createWoodprof = async (req, res) => {
    try {
        const { woodCount, defectType, defectNo, woodClassification, date, time } = req.body;

        const wood = new Analytic({
            woodCount,
            defectType,
            defectNo,
            woodClassification,
            date: new Date(date), 
            time, 
        });

        await wood.save();

        res.json({ success: true, wood });
    } catch (error) {
        console.error('Error creating wood profile:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

exports.getWoodData = async (req, res) => {
    try {
        const woodData = await Analytic.find(); // Use the model to fetch data

        res.json({
            success: true,
            woodData,
        });
    } catch (error) {
        console.error('Error fetching wood data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};