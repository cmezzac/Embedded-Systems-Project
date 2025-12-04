const express = require("express");
const router = express.Router();

const Distance = require("../models/distance");

// POST /api/distance
router.post("/", async (req, res) => {
  try {
    const { sensorId, distance, message } = req.body;

    if (!sensorId) {
      return res.status(400).json({ error: "sensorId is required" });
    }

    const entry = new Distance({ sensorId, distance, message });
    await entry.save();

    res.status(201).json(entry);
  } catch (err) {
    console.error("Distance POST error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/distance/latest/:sensorId
router.get("/latest/:sensorId", async (req, res) => {
  try {
    const { sensorId } = req.params;

    const latest = await Distance.findOne({ sensorId })
      .sort({ _id: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No data found for that sensor." });
    }

    res.json(latest);
  } catch (err) {
    console.error("Distance latest GET error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/distance/:sensorId
router.get("/:sensorId", async (req, res) => {
  try {
    const { sensorId } = req.params;

    const all = await Distance.find({ sensorId }).sort({ _id: -1 });
    res.json(all);
  } catch (err) {
    console.error("Distance GET error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
