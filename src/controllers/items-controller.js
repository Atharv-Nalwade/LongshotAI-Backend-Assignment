const Item = require("../services/items-service.js");

const itemsService = new Item();

/**
 * Create a new item.
 *
 * @param {Object} req - The request object.
 * @param {string} req.body.item_type_id - The id of the item type.
 * @param {string} req.body.storage_space_id - The id of the storage space.
 * @param {string} req.body.expiration_date - The expiration date of the item.
 * @param {Object} res - The response object.
 * @returns {Object} The response containing the created item.
 */

const createItem = async (req, res) => {
  try {
    const { item_type_id, storage_space_id, expiration_date } = req.body;
    const item = await itemsService.createItem(
      item_type_id,
      storage_space_id,
      expiration_date
    );
    if (
      item ==
      "Item Type or Storage Space does not exist or Storage Space is full or Expiration Date is in the past."
    ) {
      return res.status(400).json({
        message:
          "Item Type or Storage Space does not exist or Storage Space is full or Expiration Date is in the past.",
        data: {},
        success: false,
      });
    }
    return res.status(201).json({
      message: "Item created successfully",
      data: item,
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
 * Get all items.
 *
 * @param {Object} req - The request object.
 * @param {string} req.body.sortingManner - The manner in which the items should be sorted(optional). Value can be ascending or descending
 * @param {Object} res - The response object.
 * @returns {Object} The response containing the retrieved items.
 */
const getAllItems = async (req, res) => {
  try {
    const { sortingManner } = req.body;
    const items = await itemsService.getAllItems(sortingManner);
    return res.status(200).json({
      message: "Items retrieved successfully",
      data: items,
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
 * Relocate an item to a different storage space.
 *
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The id of the item to be relocated.
 * @param {string} req.body.storage_space_id - The id of the new storage space.
 * @param {Object} res - The response object.
 * @returns {Object} The response containing the relocated item.
 */
const relocateItem = async (req, res) => {
  try {
    const { id: id } = req.params;
    const { storage_space_id } = req.body;
    const item = await itemsService.relocateItem(id, storage_space_id);
    return res.status(200).json({
      message: "Item relocated successfully",
      data: item,
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
 * Delete an item.
 *
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The id of the item to be deleted.
 * @param {Object} res - The response object.
 * @returns {Object} The response indicating the status of the deletion.
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemsService.deleteItem(id);
    if (item == "An error occurred while deleting the item.") {
      return res.status(401).json({
        message: "An error occurred while deleting the item.",
        data: {},
        success: false,
      });
    }
    return res.status(200).json({
      message: "Item deleted successfully",
      data: item,
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

module.exports = {
  createItem,
  getAllItems,
  relocateItem,
  deleteItem,
};
