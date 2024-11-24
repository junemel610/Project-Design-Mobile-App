const jwt = require('jsonwebtoken');
const Analytic = require('../models/analytics');

// Function to convert time from "HH:mm:ss" format to total minutes
const convertTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes; // Convert to total minutes
};

exports.createWoodprof = async (req, res) => {
    try {
        const { woodCount, defectType, defectNo, woodClassification, date, time } = req.body;

        // Convert time to total minutes if necessary
        const timeInMinutes = convertTimeToMinutes(time);

        const wood = new Analytic({
            woodCount,
            defectType,
            defectNo,
            woodClassification,
            date: new Date(date), 
            time: timeInMinutes, // Save as total minutes
        });

        await wood.save();

        console.log('Wood profile created successfully:', wood);
        
        res.json({ success: true, wood });
    } catch (error) {
        console.error('Error creating wood profile:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

exports.getWoodData = async (req, res) => {
    console.log('Fetching wood data'); // Log when the request is made
    try {
        const woodData = await Analytic.find();
        console.log('Fetched wood data:', woodData); // Log the retrieved data

        res.json({
            success: true,
            woodData,
        });
    } catch (error) {
        console.error('Error fetching wood data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};