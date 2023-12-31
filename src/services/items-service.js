const ItemRepository = require("../repository/item-repository.js");

class ItemService{

    constructor(){
        this.itemRepository = new ItemRepository();
    }

    // Create a new item
    async createItem(item_type_id,storage_space_id,expiration_date){
        try {
            const item = await this.itemRepository.createItem(item_type_id,storage_space_id,expiration_date);
            return item;
        } catch (error) {
            console.log(error);
        }
    }

    // Get all items
    async getAllItems(sortingManner){
        try {
            const items = await this.itemRepository.getAllItems(sortingManner);
            return items;
        } catch (error) {
            console.log(error);
        }
    }

    // Relocate an item
    async relocateItem(item_id,storage_space_id){
        try {
            const relocatedItem = await this.itemRepository.relocateItem(item_id,storage_space_id);
            return relocatedItem;
        } catch (error) {
            console.log(error);
        }
    }

    // Delete an item
    async deleteItem(item_id){
        try {
            const deletedItem = await this.itemRepository.deleteItem(item_id);
            return deletedItem;
        } catch (error) {
            console.log(error);
        }
    }

    async getItem(item_id){
        try {
            const item = await this.itemRepository.getItem(item_id);
            return item;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ItemService;