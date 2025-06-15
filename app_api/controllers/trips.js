const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    try {
        const q = await Model
            .find({}) // No filter, return all records
            .exec();

        // Uncomment the following line to show results of query
        // console.log(q);

        const q = await Model.find({}).exec();
        if (!q || q.length === 0) {
            // Database returned no data
            return res
                .status(404)
                .json({ message: "No trips found" });
            return res.status(404).json({ message: "No trips found" });
        } else {
            // Return resulting trip list
            return res
                .status(200)
                .json(q);
            return res.status(200).json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Server error", details: err });
        return res.status(500).json({ error: "Server error", details: err });
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model
            .find({ 'code': req.params.tripCode }) // Return single record
            .exec();
        const q = await Model.find({ 'code': req.params.tripCode }).exec();
        if (!q || q.length === 0) {
            return res.status(404).json({ message: "Trip not found" });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err });
    }
};

        // Uncomment the following line to show results of query
        // console.log(q);
// POST: /trips - adds a new trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
    });

        if (!q || q.length === 0) {
            // Database returned no data
            return res
                .status(404)
                .json({ message: "Trip not found" });
    try {
        const q = await newTrip.save();
        if (!q) {
            return res.status(400).json({ message: "Error adding trip" });
        } else {
            return res.status(201).json(q);
        }
    } catch (err) {
        return res.status(400).json({ message: "Error adding trip", error: err });
    }
};

// PUT: /trips/:tripCode - updates an existing trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const q = await Model.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
            },
            { new: true } // Return the updated document
        ).exec();

        if (!q) {
            return res.status(400).json({ message: "Error updating trip" });
        } else {
            // Return resulting trip
            return res
                .status(200)
                .json(q);
            return res.status(200).json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Server error", details: err });
        return res.status(500).json({ error: "Server error", details: err });
    }
};

// Export the functions
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
};