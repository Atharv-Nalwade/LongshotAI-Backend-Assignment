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
    getItemsInStorageSpace
}