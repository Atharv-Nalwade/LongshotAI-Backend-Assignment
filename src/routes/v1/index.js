const express = require('express');
const router = express.Router();

const { createStorageSpace,renameStorageSpace,deleteStorageSpace,getItemsInStorageSpace,getAllStorageSpaces } = require("../../controllers/storage-space-controller.js");
const { createItemType,renameItemType,deleteItemType,getAllItemTypes } = require("../../controllers/item-types-controller.js");
const { createItem, getAllItems, relocateItem, deleteItem } = require("../../controllers/items-controller.js");

// Storage Spaces API
router.post('/storage-spaces', createStorageSpace);  
router.put('/storage-spaces/:id', renameStorageSpace); 
router.delete('/storage-spaces/:id', deleteStorageSpace); 
router.get('/storage-spaces/:id/items', getItemsInStorageSpace); 
router.get('/storage-spaces', getAllStorageSpaces); 

// Item Types API
router.post('/item-types', createItemType); 
router.get('/item-types',getAllItemTypes)
router.put('/item-types/:id', renameItemType);
router.delete('/item-types/:id', deleteItemType);

// Items API
router.post('/items', createItem); 
router.get('/items', getAllItems); 
router.put('/items/:id/move', relocateItem); 
router.delete('/items/:id', deleteItem); 

module.exports = router;
