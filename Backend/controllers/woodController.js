const jwt = require('jsonwebtoken');
const Analytic = require('../models/analytics');

exports.createWoodprof = async (req, res) => {
    try {
        const { woodCount, defects, woodClassification, date, time } = req.body;

        // Calculate total defect count
        const defectNo = defects.reduce((total, defect) => total + defect.count, 0);

        // Create a new wood profile
        const wood = new Analytic({
            woodCount,
            defects,
            defectNo,
            woodClassification,
            date: new Date(date), // Store date as UTC
            time: time, // Save as total minutes
        });

        await wood.save();

        console.log('Wood profile created successfully:', wood);
        
        // Send JSON response with formatted date and military time
        res.json({
            success: true,
            wood: {
                ...wood.toObject(),
                date: wood.date.toISOString().split('T')[0], // Format date to "YYYY-MM-DD"
                time: time,
            },
        });
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

        // Map the data to format the response
        const formattedData = woodData.map((wood) => ({
            woodCount: wood.woodCount,
            defects: wood.defects,
            defectNo: wood.defectNo,
            woodClassification: wood.woodClassification,
            date: wood.date.toISOString().split('T')[0], // Format date to "YYYY-MM-DD"
            time: wood.time, // Directly use the stored time
        }));

        res.json({
            success: true,
            woodData: formattedData,
        });
    } catch (error) {
        console.error('Error fetching wood data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};