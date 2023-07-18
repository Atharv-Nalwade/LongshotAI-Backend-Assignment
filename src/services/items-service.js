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

    async getAllItems(){
        try {
            const items = await this.itemRepository.getAllItems();
            return items;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ItemService;