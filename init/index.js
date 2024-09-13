const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

require('dotenv').config();

const MONGO_URL = process.env.ATLAS_URL || "mongodb://127.0.0.1:27017/JourneyHub";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.error("Error connecting to DB:", err);
        process.exit(1);
    }
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("Data was initialized");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
}

main().then(() => initDB());
