const express = require('express');
const router = express.Router();
const Data = require("../models/data");

// GET by ID
router.get('/data/:id', async (req, res) => {
    try {
        const item = await Data.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(item);
    } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({ message: "Error fetching data" });
    }
});

router.get('/data', async (req, res) => {
    try {
        const items = await Data.find();
        res.json(items);
    } catch (err) {
        console.error("Fetch all error:", err);
        res.status(500).json({ message: "Error fetching data" });
    }
});

// POST data
router.post('/data', async (req, res) => {
    try {
        const updated = await Data.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true }
        );
        res.status(200).json({
            message: "Data saved successfully",
            data: saved
        });
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ message: "Failed to save data", error: err.message });
    }
});

// POST device
router.post('/device', async (req, res) => {
    try {
        const device = new Data(req.body);
        await device.save();
        res.json(device);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
