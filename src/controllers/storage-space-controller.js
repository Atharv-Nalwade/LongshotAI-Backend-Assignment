const StorageSpace = require("../services/storage-space-service.js");


const StorageSpaceService = new StorageSpace();

const createStorageSpace = async (req, res) => {
    try {
        const { name, max_limit, refrigeration } = req.body;
        const storageSpace = await StorageSpaceService.createStorageSpace(name, max_limit, refrigeration);
        return res.status(201).json({
            message: 'Storage Space created successfully',
            data: storageSpace,
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

const renameStorageSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const storageSpace = await StorageSpaceService.renameStorageSpace(id, name);
        return res.status(200).json({
            message: 'Storage Space renamed successfully',
            data: storageSpace,
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

const getItemsInStorageSpace = async (req, res) => {
    try {
        const { id: storage_space_id } = req.params;
        console.log(storage_space_id);
        const items = await StorageSpaceService.getItemsInStorageSpace(storage_space_id);
        return res.status(200).json({
            message: 'Items in Storage Space retrieved successfully',
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

const deleteStorageSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const storageSpace = await StorageSpaceService.deleteStorageSpace(id);
        if(storageSpace == "Storage space is not empty"){
            return res.status(404).json({
                message: 'Storage Space not deleted',
                success: false,
            });
        }else{
        return res.status(200).json({
            message: 'Storage Space deleted successfully',
            data: storageSpace,
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
    createStorageSpace,
    renameStorageSpace,
    deleteStorageSpace,
    getItemsInStorageSpace,
}