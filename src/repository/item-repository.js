const Item = require("../models/item.js");
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
        !(await this.storageSpaceRepository.isStorageSpaceFull(storage_space_id))
      ) {
        const item = await Item.create({
          item_type_id,
          storage_space_id,
          expiration_date,
        });
        await this.storageSpaceRepository.increaseStorageSpaceCount(storage_space_id);
        return item;
      } else {
        return "Item Type or Storage Space does not exist or Storage Space is full";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ItemRepository;
