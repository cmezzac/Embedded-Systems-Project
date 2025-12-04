const express = require("express");
const router = express.Router();
const { Distance } = require("../models/distance");

// POST /api/distance
router.post("/", async (req, res) => {
  try {
    const { distance, message } = req.body;

    const entry = new Distance({ distance, message });
    await entry.save();

    res.status(201).json(entry);
  } catch (err) {
    console.error("Distance POST error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/distance/latest
router.get("/latest", async (req, res) => {
  try {
    const latest = await Distance.findOne().sort({ _id: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No distance data found." });
    }

    res.json(latest);
  } catch (err) {
    console.error("Distance latest GET error:", err);
    res.status(500).json({ error: err.message });
  }
});


// GET /api/distance
router.get("/", async (req, res) => {
  try {
    const all = await Distance.find().sort({ _id: -1 });
    res.json(all);
  } catch (err) {
    console.error("Distance GET error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
