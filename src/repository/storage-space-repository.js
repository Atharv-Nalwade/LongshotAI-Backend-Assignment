const StorageSpace = require("../models/storage-space.js");
const ItemType = require("../models/item-type.js");

class StorageSpaceRepository {


  // Get all storage spaces
  async getAllStorageSpaces() {
    try {
      const storageSpaces = await StorageSpace.find();
      return storageSpaces;
    } catch (error) {
      console.log(error);
    }
  }


  // Create a new storage space
  async create(name, max_limit, refrigeration) {
    try {
      if( await StorageSpace.findOne({name:name})) return "Storage Space already exists";
      const storageSpace = await StorageSpace.create({
        name,
        max_limit,
        refrigeration,
      });
      return storageSpace;
    } catch (error) {
      console.log(error);
    }
  }

  // Check if a storage space exists
  async storageSpaceExists(storage_space_id) {
    try {
      if (await StorageSpace.findById(storage_space_id)) return true;
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  // Check if a storage space is full
  async isStorageSpaceFull(storage_space_id) {
    try {
      const size = await StorageSpace.findById(storage_space_id);
      if (size.current_count < size.max_limit) return false;
      else return true;
    } catch (error) {
      console.log(error);
    }
  }

  // Increase the current count of a storage space
  async increaseStorageSpaceCount(storage_space_id) {
    try {
      await StorageSpace.findByIdAndUpdate(
        storage_space_id,
        { $inc: { current_count: 1 } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

// Rename a storage space
  async renameStorageSpace(id, name) {
    try {
      const storageSpace = await StorageSpace.findByIdAndUpdate(
        id,
        { name: name },
        { new: true }
      );
      return storageSpace;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  // Add items to a storage space
  async addItems(storage_space_id, itemId) {
    try {
      await StorageSpace.findByIdAndUpdate(storage_space_id, {
        $push: { items: itemId },
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Get all storage spaces
  async getItemsInStorageSpace(storage_space_id) {
    try {
      const storageSpace = await StorageSpace.findById(
        storage_space_id
      ).populate({
        path: "items",
        select: "item_type_id expiration_date _id",
        populate: {
          path: "item_type_id",
          select: "name -_id",
        },
      });

      const items = storageSpace.items.map((item) => ({
        item_id: item._id,
        "item-type name": item.item_type_id.name,
        expiration: item.expiration_date,
      }));

      console.log(items);
      return items;
    } catch (error) {
      console.log(error);
    }
  }

  // Check if a storage space requires refrigeration
  async isStorageSpaceRefrigerated(storage_space_id) {
    try {
      const storageSpace = await StorageSpace.findById(storage_space_id);
      return storageSpace.refrigeration;
    } catch (error) {
      console.log(error);
    }
  }

  // Delete a storage space
  async deleteStorageSpace(storage_space_id) {
    try {
      const storageSpace = await StorageSpace.findById(storage_space_id).select( "current_count" );
      if (storageSpace && storageSpace.current_count === 0) {
        let deletedStorageSpace = await StorageSpace.findByIdAndDelete(storage_space_id);
        return deletedStorageSpace;
        return "Storage space deleted successfully";
      } else {
        return "Storage space is not empty";
      }
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = StorageSpaceRepository;
