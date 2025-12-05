const mongoose = require("mongoose");

const WaitTimeSchema = new mongoose.Schema({
    waitTime: { type: Number, required: true },
    numberOfPeople: { type: Number, required: true }
});

// Export the model by itself
module.exports = mongoose.model("WaitTime", WaitTimeSchema);