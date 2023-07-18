const Item = require("../models/item.js");

function clearExpiredItems(){
  const currentDate = new Date();
  Item.deleteMany({expiration_date:{$lt:currentDate}}).then((result)=>{
    console.log(result);
  });
}


module.exports = clearExpiredItems;