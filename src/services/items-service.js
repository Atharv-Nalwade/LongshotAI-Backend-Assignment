const ItemRepository = require("../repository/item-repository.js");

class ItemService{

    constructor(){
        this.itemRepository = new ItemRepository();
    }

    async createItem(item_type_id,storage_space_id,expiration_date){
        try {
            const item = await this.itemRepository.createItem(item_type_id,storage_space_id,expiration_date);
            return item;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllItems(sortingManner){
        try {
            const items = await this.itemRepository.getAllItems(sortingManner);
            return items;
        } catch (error) {
            console.log(error);
        }
    }

    async relocateItem(item_id,storage_space_id){
        try {
            const relocatedItem = await this.itemRepository.relocateItem(item_id,storage_space_id);
            return relocatedItem;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteItem(item_id){
        try {
            const deletedItem = await this.itemRepository.deleteItem(item_id);
            return deletedItem;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ItemService;