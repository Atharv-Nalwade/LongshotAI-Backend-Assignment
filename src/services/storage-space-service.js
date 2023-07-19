const StorageSpaceRepository = require("../repository/storage-space-repository.js");

class StorageSpaceService{
   
    constructor(){
        this.storageSpaceRepository = new StorageSpaceRepository();
    }

    // Create a new storage space
  async createStorageSpace(name,max_limit,refrigeration){
    try {
        const storageSpace = await this.storageSpaceRepository.create(name,max_limit,refrigeration);
        return storageSpace;
    } catch (error) {
        console.log(error);
    }
  }

  // Rename a storage space
  async renameStorageSpace(id,name){
     try {
       const renamedStorageSpace = await this.storageSpaceRepository.renameStorageSpace(id,name);
       return renamedStorageSpace;
     } catch (error) {
      console.log(error);
     }
  }

  // Get all storage spaces
  async getItemsInStorageSpace(storage_space_id){
    try {
       const items = await this.storageSpaceRepository.getItemsInStorageSpace(storage_space_id);
        return items;
    } catch (error) {
      console.log(error);
    }
  }

  // Delete a storage space
  async deleteStorageSpace(id){
    try {
      const deletedStorageSpace = await this.storageSpaceRepository.deleteStorageSpace(id);
      return deletedStorageSpace;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = StorageSpaceService;