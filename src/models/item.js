const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItemType',
    required: true,
  },
  storage_space_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StorageSpace',
    required: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
},{ timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
