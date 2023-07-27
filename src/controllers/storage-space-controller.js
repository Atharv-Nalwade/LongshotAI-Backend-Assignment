const StorageSpace = require("../services/storage-space-service.js");


const StorageSpaceService = new StorageSpace();

/**
 * Create a new storage space.
 *
 * @param {Object} req - The request object.
 * @param {string} req.body.name - The name of the storage space.
 * @param {number} req.body.max_limit - The maximum limit of items the storage space can hold.
 * @param {boolean} req.body.refrigeration - Indicates if the storage space has refrigeration.
 * @param {Object} res - The response object.
 * @returns {Object} The response containing the created storage space.
 */
const createStorageSpace = async (req, res) => {
    try {
        const { name, max_limit, refrigeration } = req.body;
        const storageSpace = await StorageSpaceService.createStorageSpace(name, max_limit, refrigeration);
        if(storageSpace == "Storage Space already exists"){
            return res.status(409).json({
                message: 'Storage Space already exists',
                data: {},
                success: false,
            });
        }
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

/**
 * Rename an existing storage space.
 *
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The id of the storage space to be renamed.
 * @param {string} req.body.name - The new name for the storage space.
 * @param {Object} res - The response object.
 * @returns {Object} The response containing the renamed storage space.
 */
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
        // console.log(error)
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            error:error.message
        });
    }
}

/**
 * Get items in a storage space.
 *
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The id of the storage space.
 * @param {Object} res - The response object.
 * @returns {Object} The response containing the retrieved items in the storage space.
 */
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

/**
 * Delete a storage space.
 *
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The id of the storage space to be deleted.
 * @param {Object} res - The response object.
 * @returns {Object} The response indicating the status of the deletion.
 */
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

const getAllStorageSpaces = async (req, res) => {
try {
    const storageSpaces = await StorageSpaceService.getAllStorageSpaces();
    return res.status(200).json({
        message: 'Storage Spaces retrieved successfully',
        data: storageSpaces,
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

module.exports = {
    createStorageSpace,
    renameStorageSpace,
    deleteStorageSpace,
    getItemsInStorageSpace,
    getAllStorageSpaces
}