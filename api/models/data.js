const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    waterClarity: { type: Number, required: true },
    isLeakDetected: { type: Boolean, required: true },
    pHLevel: { type: Number, required: true },
    queueSize: { type: Number, required: true },
    waitTime: { type: Number, required: true },
    temperature: { type: Number, required: true },
});

module.exports = mongoose.model("Data", DataSchema);

// {
//     "received": {
//         "waterClarity": 87,
//         "isLeakDetected": false,
//         "pHLevel": 7.4,
//         "queueSize": 5,
//         "waitTime": 12,
//         "temperature": 22.8
//     }
// }