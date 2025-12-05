const mongoose = require("mongoose");

const DistanceSchema = new mongoose.Schema({
  sensorId: { type: String, required: true },
  distance: { type: Number, required: true },
  message: { type: String, required: false },
});

// Export the model by itself
module.exports = mongoose.model("Distance", DistanceSchema);
