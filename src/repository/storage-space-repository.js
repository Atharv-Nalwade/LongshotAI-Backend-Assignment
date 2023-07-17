const StorageSpace = require("../models/storage-space.js");

class StorageSpaceRepository {

  // Method to create a new storage space
  async create(name, max_limit, refrigeration) {
    try {
        const storageSpace = await StorageSpace.create({ name, max_limit, refrigeration });
        return storageSpace;
    } catch (error) {
        console.log(error);
    }
  }

//   // Method to rename an existing storage space
//   async rename(storageSpaceId, newName) {
//     return StorageSpace.findByIdAndUpdate(storageSpaceId, { name: newName }, { new: true });
//   }

//   // Method to delete an unoccupied storage space
//   async delete(storageSpaceId) {
//     return StorageSpace.findByIdAndDelete(storageSpaceId);
//   }

//   // Method to retrieve a list of items assigned to a specific storage space
//   async getItems(storageSpaceId) {
//     return StorageSpace.findById(storageSpaceId).populate('items');
//   }
}

module.exports = StorageSpaceRepository ;
