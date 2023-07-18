const ItemType = require("../services/item-types-service.js");

const itemTypesService = new ItemType();

const createItemType = async (req, res) => {
    try {
        const { name, requires_refrigeration } = req.body;
        const itemType = await itemTypesService.createItemType(name, requires_refrigeration);
        return res.status(201).json({
            message: 'Item Type created successfully',
            data: itemType,
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

const renameItemType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const itemType = await itemTypesService.renameItemType(id, name);
        return res.status(200).json({
            message: 'Item Type renamed successfully',
            data: itemType,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
        });
    }
}

const deleteItemType = async (req, res) => {
    try {
        const { id } = req.params;
        const itemType = await itemTypesService.deleteItemType(id);
        if(itemType === "Cannot delete item type. Items are linked to it."){
            return res.status(400).json({
                message: itemType,
                data: {},
                success: false,
            });
        }else{
            return res.status(200).json({
                message: 'Item Type deleted successfully',
                data: itemType,
                success: true,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
        });
    }
}


module.exports = {
    createItemType,
    renameItemType,
    deleteItemType
}