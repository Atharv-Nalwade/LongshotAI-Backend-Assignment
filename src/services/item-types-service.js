const ItemTypeRepository = require("../repository/item-type-repository.js");

class ItemTypeService{
    constructor(){
        this.itemTypeRepository = new ItemTypeRepository();
    }

    // Create a new item type
    async createItemType(name,requires_refrigeration){
        try {
            const itemType = await this.itemTypeRepository.createItemType(name,requires_refrigeration);
            return itemType;
        } catch (error) {
            console.log(error);
        }
    }

    // Rename an item type
    async renameItemType(id,name){
        try {
            const renamedItemType = await this.itemTypeRepository.renameItemType(id,name);
            return renamedItemType;
        } catch (error) {
            console.log(error);
        }
    }

    // Delete an item type
    async deleteItemType(id){
        try {
            const deletedItemType = await this.itemTypeRepository.deleteItemType(id);
            return deletedItemType;
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = ItemTypeService;
