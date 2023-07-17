const ItemType = require("../models/item-type.js");
const Item = require("../models/item.js");

class ItemTypeRepository{

    async createItemType(name,requires_refrigeration){
        try {
            if( await ItemType.findOne({ name }) ) return "Item Type already exists"
            const itemType = await ItemType.create({ name, requires_refrigeration });
            return itemType;
        } catch (error) {
            console.log(error);
        }
    }

    async itemTypeExists(item_type_id){
        try {
            if( await ItemType.findById(item_type_id) ) return true;
            return false;
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = ItemTypeRepository;