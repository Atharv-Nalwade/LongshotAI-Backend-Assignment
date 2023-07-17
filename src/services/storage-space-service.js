const StorageSpaceRepository = require("../repository/storage-space-repository.js");

class StorageSpaceService{
   
    constructor(){
        this.storageSpaceRepository = new StorageSpaceRepository();
    }

  async createStorageSpace(name,max_limit,refrigeration){
    try {
        const storageSpace = await this.storageSpaceRepository.create(name,max_limit,refrigeration);
        return storageSpace;
    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = StorageSpaceService;