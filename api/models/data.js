const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    waterClarity: { type: String, required: true },   // "Safe" / "Unsafe"
    isLeakDetected: { type: Boolean, required: true },
    pHLevel: { type: Number, required: true }
});

module.exports = mongoose.model("Data", DataSchema);
