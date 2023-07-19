const Item = require("../models/item.js");
const StorageSpace = require("../models/storage-space.js");
const ItemTypeRepository = require("../repository/item-type-repository.js");
const StorageSpaceRepository = require("../repository/storage-space-repository.js");

class ItemRepository {
  constructor() {
    this.itemTypeRepository = new ItemTypeRepository();
    this.storageSpaceRepository = new StorageSpaceRepository();
  }

  async createItem(item_type_id, storage_space_id, expiration_date) {
    try {
      if (
        (await this.itemTypeRepository.itemTypeExists(item_type_id)) &&
        (await this.storageSpaceRepository.storageSpaceExists(storage_space_id)) &&
        !(await this.storageSpaceRepository.isStorageSpaceFull(storage_space_id)) &&
        ( new Date(expiration_date)> new Date() ) &&
        (await this.storageSpaceRepository.isStorageSpaceRefrigerated(storage_space_id) || !(await this.itemTypeRepository.isItemTypeRefrigerated(item_type_id)))
      ) {
        const item = await Item.create({
          item_type_id,
          storage_space_id,
          expiration_date,
        });
        await this.storageSpaceRepository.increaseStorageSpaceCount(storage_space_id);
        await this.storageSpaceRepository.addItems(storage_space_id, item._id);
        return item;
      } else {
        return "Item Type or Storage Space does not exist or Storage Space is full or Expiration Date is in the past or Storage Space is not refrigerated and Item Type requires refrigeration.";
      }
    } catch (error) {
      console.log(error);
    }
  }


  async getAllItems(sortingManner) {
    try {
      let items;
      if(sortingManner == "undefined"){
       items = await Item.find().populate({
        path:"item_type_id",
        select:"name -_id"
      }).populate({
        path:"storage_space_id",
        select:"name -_id"
      });
    }else{
       items = await Item.find().populate({
        path:"item_type_id",
        select:"name -_id"
      }).populate({
        path:"storage_space_id",
        select:"name -_id"
      }).sort({expiration_date:sortingManner});
    }
      return items;
    } catch (error) {
      console.log(error);
    }
  }

  async relocateItem(item_id, destination_storage_space_id) {
    try {
      const item = await Item.findById(item_id).populate('item_type_id');
      const sourceSpace = await StorageSpace.findById(item.storage_space_id);
      const destinationSpace = await StorageSpace.findById(destination_storage_space_id);
  
      // Validate expiration date and refrigeration constraints
      const currentDate = new Date();
      if (item.expiration_date <= currentDate) {
        return "Cannot relocate item. The expiration date has passed.";
      }
      if (item.item_type_id.requires_refrigeration && !destinationSpace.refrigeration) {
        return "Cannot relocate item. Destination storage space does not have refrigeration capabilities.";
      }
  
      // Validate destination storage space capacity
      if (destinationSpace.current_count >= destinationSpace.max_limit) {
        return "Cannot relocate item. Destination storage space is at maximum capacity.";
      }
  
      // Perform the relocation
      item.storage_space_id = destination_storage_space_id;
      await item.save();
  
      sourceSpace.items.pull(item_id); // Remove the item from the source storage space's items array
      sourceSpace.current_count -= 1; // Reduce the current count of the source storage space
      await sourceSpace.save();
  
      destinationSpace.items.push(item_id); // Add the item to the destination storage space's items array
      destinationSpace.current_count += 1; // Increase the current count of the destination storage space
      await destinationSpace.save();
  
      return "Item relocated successfully.";
    } catch (error) {
      console.log(error);
      return "An error occurred while relocating the item.";
    }
  }
  

    async deleteItem(item_id) {
      try {
        console.log(item_id);
        const item = await Item.findOneAndDelete({ _id: item_id });
          console.log(item);

          if(!item) return "Item does not exist";

          const storageSpace = await StorageSpace.findById(item.storage_space_id);
          storageSpace.items.pull(item_id); // Remove the item from the storage space's items array
          storageSpace.current_count -= 1; // Reduce the current count of the storage space
    
          await storageSpace.save() 
    
          return "Item deleted successfully.";

      } catch (error) {
        console.log(error);
        return "An error occurred while deleting the item.";
      }
    }

    async getItem(item_id) {
      try {
         const item = await Item.findById(item_id);
          return item;
      } catch (error) {
        console.log(error);
      }
    }
}

module.exports = ItemRepository;
