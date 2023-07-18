const Item = require("../services/items-service.js");

const itemsService = new Item();

const createItem = async (req, res) => {
    try {
        const { item_type_id, storage_space_id, expiration_date } = req.body;
        const item = await itemsService.createItem(item_type_id, storage_space_id, expiration_date);
        return res.status(201).json({
            message: 'Item created successfully',
            data: item,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
        });
    }
}

const getAllItems = async (req, res) => {
    try {
        const items = await itemsService.getAllItems();
        return res.status(200).json({
            message: 'Items retrieved successfully',
            data: items,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
        });
    }
}

const relocateItem = async (req, res) => {
    try {
        const { id: id } = req.params;
        const { storage_space_id } = req.body;
        const item = await itemsService.relocateItem(id, storage_space_id);
        return res.status(200).json({
            message: 'Item relocated successfully',
            data: item,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
        });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await itemsService.deleteItem(id);
        if( item == "An error occurred while deleting the item."){
            return res.status(401).json({
                message: 'An error occurred while deleting the item.',
                data: {},
                success: false,
            });
        }
        return res.status(200).json({
            message: 'Item deleted successfully',
            data: item,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
        });
    }
}

module.exports ={
    createItem,
    getAllItems,
    relocateItem,
    deleteItem
}