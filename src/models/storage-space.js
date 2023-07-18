const mongoose = require("mongoose");
const Item = require("./item.js");

const storageSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    max_limit: {
      type: Number,
      required: true,
    },
    refrigeration: {
      type: Boolean,
      default: false,
    },
    current_count: {
      type: Number,
      default: 0,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
  },
  { timestamps: true }
);

const StorageSpace = mongoose.model("StorageSpace", storageSpaceSchema);

module.exports = StorageSpace;
