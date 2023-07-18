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

    async renameItemType(id,name){
        try {
            const itemType = await ItemType.findByIdAndUpdate(id,{ name },{ new: true });
            return itemType;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteItemType(id){
        try {
          const itemsCount = await Item.countDocuments({ 'item_type_id': id });
          if (itemsCount > 0) {
             return "Cannot delete item type. Items are linked to it."; 
          }
          await ItemType.findByIdAndDelete(id);
          return "Item type deleted successfully.";
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = ItemTypeRepository;