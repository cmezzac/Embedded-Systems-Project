const express = require('express');
const router = express.Router();
const Data = require("../models/data");
const { dataCache } = require("../Cache/cache");

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
        const item = await Data.findById("691cbf931dce8818755fbeb1");
        res.json(item);
    } catch (err) {
        console.error("Fetch all error:", err);
        res.status(500).json({ message: "Error fetching data" });
    }
});



router.post("/updateData", async (req, res) => {
    try {
        const incoming = req.body;

        // Initialize cache if empty
        if (!dataCache.current) {
            console.log("🆕 Cache empty → initializing...");
            dataCache.current = incoming;
        }

        const cached = dataCache.current;

        let shouldUpdate = false;

        if (Math.abs(incoming.pHLevel - cached.pHLevel) >= 0.5) {
            console.log("🔄 pH changed enough → updating");
            shouldUpdate = true;
        }

        if (incoming.waterClarity !== cached.waterClarity) {
            console.log("🔄 Water clarity changed → updating");
            shouldUpdate = true;
        }

        if (incoming.isLeakDetected !== cached.isLeakDetected) {
            console.log("🔄 Leak detection changed → updating");
            shouldUpdate = true;
        }

        if (!shouldUpdate) {
            console.log("⏳ Minor change detected → skipping DB update");
            return res.status(200).json({
                message: "No significant changes — not updating DB",
                cached: cached
            });
        }

        const updated = await Data.findOneAndUpdate(
            {},
            incoming,
            { new: true, upsert: true }
        );


        dataCache.current = updated;

        console.log("💾 DB UPDATED & cache refreshed");

        res.status(200).json({
            message: "Data saved successfully",
            data: updated
        });

    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ message: "Failed to save data", error: err.message });
    }
});

router.post('/waitTime', async (req, res) => {
    try {
        const WaitTime = require("../models/wait");
        const { waitTime, numberOfPeople } = req.body;

        const updatedWaitTime = await WaitTime.findOneAndUpdate(
            {},
            { waitTime, numberOfPeople },
            { new: true, upsert: true }
        );

        res.status(200).json(updatedWaitTime);
    } catch (err) {
        console.error("Error updating wait time:", err);
        res.status(500).json({
            message: "Failed to update wait time",
            error: err.message
        });
    }
});

router.get('/getWaitTime', async (req, res) => {
    try {
        const WaitTime = require("../models/wait");

        const waitData = await WaitTime.findOne({});

        if (!waitData) {
            return res.status(404).json({ message: "No wait time data found" });
        }

        res.status(200).json(waitData);
    } catch (err) {
        console.error("Error fetching wait time:", err);
        res.status(500).json({
            message: "Failed to get wait time",
            error: err.message
        });
    }
});






module.exports = router;
