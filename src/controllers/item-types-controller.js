const ItemType = require("../services/item-types-service.js");

const itemTypesService = new ItemType();

/**
 * Create a new item type.
 *
 * @param {Object} req - The request object.
 * @param {string} req.body.name - The name of the item type.
 * @param {boolean} req.body.requires_refrigeration - Indicates if the item type requires refrigeration.
 * @param {Object} res - The response object.
 * @returns {Object} The response containing the created item type.
 */
const createItemType = async (req, res) => {
  try {
    const { name, requires_refrigeration } = req.body;
    const itemType = await itemTypesService.createItemType(
      name,
      requires_refrigeration
    );
    if (itemType === "Item Type already exists") {
      return res.status(400).json({
        message: itemType,
        data: {},
        success: false,
      });
    }
    return res.status(201).json({
      message: "Item Type created successfully",
      data: itemType,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
    });
  }
};

/**
 * Rename an existing item type.
 *
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The id of the item type to be renamed.
 * @param {string} req.body.name - The new name for the item type.
 * @param {Object} res - The response object.
 * @returns {Object} The response containing the renamed item type.
 */
const renameItemType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const itemType = await itemTypesService.renameItemType(id, name);
    return res.status(200).json({
      message: "Item Type renamed successfully",
      data: itemType,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
    });
  }
};

/**
 * Delete an item type.
 *
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The id of the item type to be deleted.
 * @param {Object} res - The response object.
 * @returns {Object} The response indicating the status of the deletion.
 */
const deleteItemType = async (req, res) => {
  try {
    const { id } = req.params;
    const itemType = await itemTypesService.deleteItemType(id);
    if (itemType === "Cannot delete item type. Items are linked to it.") {
      return res.status(400).json({
        message: itemType,
        data: {},
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "Item Type deleted successfully",
        data: itemType,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
    });
  }
};

module.exports = {
  createItemType,
  renameItemType,
  deleteItemType,
};
