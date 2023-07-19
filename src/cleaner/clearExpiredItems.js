const Item = require("../models/item.js");
const ItemService = require("../services/items-service.js");
const itemService = new ItemService();

// function clearExpiredItems(){
//   Item.find({ expiration_date: { $lt: new Date() } }, '_id').then((items) => {
//     const itemIds = items.map((item) => item._id);
  
//     itemIds.forEach(async (itemId) => {
//       console.log(await itemService.deleteItem(itemId));
//     });
//   });

//   console.log("Expired items cleared."); 
  
// }

const fs = require('fs');

function clearExpiredItems() {
  Item.find({ expiration_date: { $lt: new Date() } }, '_id').then(async (items) => {
    const itemIds = items.map((item) => item._id);

    const logFilePath =  './cleaner/log.txt';
    

    const logEntries = [];

    for (const itemId of itemIds) {
      const deletedItem = await itemService.getItem(itemId);
      await itemService.deleteItem(itemId);

      const logEntry = 'Deleted item - ID:'+ deletedItem._id+', '+'Expiration Date: '+deletedItem.expiration_date+'\n';

      logEntries.push(logEntry);
    }

    const logContent = logEntries.join('');

    fs.appendFile(logFilePath, logContent, 'utf8', (error) => {
      if (error) {
        console.error('Error writing to log file:', error);
      } else {
        console.log("Expired items cleared and logged.");
      }
    });
  });
}


module.exports = clearExpiredItems;