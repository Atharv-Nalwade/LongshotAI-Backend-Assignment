const mongoose = require("mongoose");

const storageSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    max_limit: {
        type: Number,
        required: true
    },
    refrigeration: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const StorageSpace = mongoose.model('StorageSpace', storageSpaceSchema);

module.exports = StorageSpace;
