const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { dataCache } = require('./Cache/cache');
const Data = require('./models/data');

app.use(express.json());

mongoose.connect(
    "mongodb+srv://christophermezzacappa818:cm8074@embeddedsystems.bmqsqhu.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

mongoose.connection.once('open', () => {
    console.log("📡 MongoDB Change Stream active...");

    const changeStream = Data.watch();
    changeStream.on('change', async (change) => {
        console.log("🔄 MongoDB Updated:", change);

        const updatedDoc = await Data.findById(change.documentKey._id);
        if (updatedDoc) {
            dataCache[updatedDoc._id] = updatedDoc;
            console.log("📥 Cache Updated:", dataCache[updatedDoc._id]);
        }
    });
});

// USE ROUTES
const myRoutes = require('./routes/routes');
app.use('/api', myRoutes);

// Distance Route
const distanceRoutes = require('./routes/distance_routes');
app.use('/api/distance', distanceRoutes);

app.get("/", (req, res) => {
    res.send("API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
