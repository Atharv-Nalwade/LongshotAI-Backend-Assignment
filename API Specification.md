# API Documentation

### Storage Spaces API

#### Create Storage Space

- URL: POST /api/v1/storage-spaces
- Description: Creates a new storage space.
- Request Body:
  - `name` (string, required): The name of the storage space.
  - `max_limit` (number, required): The maximum capacity of the storage space.
  - `refrigeration` (boolean, required): Indicates if the storage space has refrigeration capabilities.
- Response:
  - Status: 201 (Created)
  - Body:
    - `message` (string): Success message.
    - `data` (object): The created storage space details.
    - `success` (boolean): Indicates the success status of the request.
  - Status: 409 (Conflict)
  - Body:
  - `message` (string): Failure message ("Storage Space already exists").
  - `data` (object): Empty object.
  - `success` (boolean): Indicates the success status of the request (false).

#### Rename Storage Space

- URL: PUT /api/v1/storage-spaces/:id
- Description: Renames an existing storage space.
- Request Parameters:
  - `id` (string): The ID of the storage space to be renamed.
- Request Body:
  - `name` (string, required): The new name for the storage space.
- Response:
  - Status: 200 (OK)
  - Body:
    - `message` (string): Success message.
    - `data` (object): The renamed storage space details.
    - `success` (boolean): Indicates the success status of the request.
  - Status: 500 (Internal Server Error)
  - Body:
    - `message` (string): Failure message ("Something went wrong").
    - `data` (object): Empty object.
    - `success` (boolean): Indicates the success status of the request (false).

#### Delete Storage Space

- URL: DELETE /api/v1/storage-spaces/:id
- Description: Deletes a storage space.
- Request Parameters:
  - `id` (string): The ID of the storage space to be deleted.
- Response:
  - Status: 200 (OK)
  - Body:
    - `message` (string): Success message.
    - `data` (object): The deleted storage space details.
    - `success` (boolean): Indicates the success status of the request.
  - Status: 404
  - Body:
    - `message` (string): Failure message ("Storage Space not found").
    - `data` (object): Empty object.
    - `success` (boolean): Indicates the success status of the request (false).

#### Get Items in Storage Space

- URL: GET /api/v1/storage-spaces/:id/items
- Description: Retrieves the items stored in a storage space.
- Request Parameters:
  - `id` (string): The ID of the storage space to retrieve items from.
- Response:
  - Status: 200 (OK)
  - Body:
    - `message` (string): Success message.
    - `data` (array): An array of items in the storage space, each containing the item's ID, item type name, and expiration date.
    - `success` (boolean): Indicates the success status of the request.
  - Status: 500 (Internal Server Error)
  - Body:
    - `message` (string): Failure message ("Something went wrong").
    - `data` (object): Empty object.
    - `success` (boolean): Indicates the success status of the request (false).

### Item Types API

#### Create Item Type

- URL: POST /api/v1/item-types
- Description: Creates a new item type.
- Request Body:
  - `name` (string, required): The name of the item type.
  - `requires_refrigeration` (boolean, required): Indicates if the item type requires refrigeration.
- Response:
  - Status: 201 (Created)
  - Body:
    - `message` (string): Success message.
    - `data` (object): The created item type details.
    - `success` (boolean): Indicates the success status of the request.
  - Status: 400 (Bad Request)
  - Body:
    - `message` (string): Failure message ("Item Type already exists").
    - `success` (boolean): Indicates the success status of the request (false).
  - Status: 500 (Internal Server Error)
  - Body:
    - `message` (string): Failure message ("Something went wrong").
    - `data` (object): Empty object.
    - `success` (boolean): Indicates the success status of the request (false).

#### Rename Item Type

- URL: PUT /api/v1/item-types/:id
- Description: Renames an existing item type.
- Request Parameters:
  - `id` (string): The ID of the item type to be renamed.
- Request Body:
  - `name` (string, required): The new name for the item type.
- Response:
  - Status: 200 (OK)
  - Body:
    - `message` (string): Success message.
    - `data` (object): The renamed item type details.
    - `success` (boolean): Indicates the success status of the request.
  - Status: 500 (Internal Server Error)
  - Body:
    - `message` (string): Failure message ("Something went wrong").
    - `data` (object): Empty object.
    - `success` (boolean): Indicates the success status of the request (false).

#### Delete Item Type

- URL: DELETE /api/v1/item-types/:id
- Description: Deletes an item type.
- Request Parameters:
  - `id` (string): The ID of the item type to be deleted.
- Response:
  - Status: 200 (OK)
  - Body:
    - `message` (string): Success message.
    - `data` (object): The deleted item type details.
    - `success` (boolean): Indicates the success status of the request.
  - Status: 400 (Bad Request)
  - Body:
    - `message` (string): Failure message ("Cannot delete item type. Items are linked to it.").
    - `success` (boolean): Indicates the success status of the request (false).
  - Status: 500 (Internal Server Error)
  - Body:
    - `message` (string): Failure message ("Something went wrong").
    - `data` (object): Empty object.
    - `success` (boolean): Indicates the success status of the request (false).

### Items API

#### Create Item

- URL: POST /api/v1/items
- Description: Creates a new item.
- Request Body:
  - `item_type_id` (string, required): The ID of the item type.
  - `storage_space_id` (string, required): The ID of the storage space to store the item.
  - `expiration_date` (string, required): The expiration date of the item (format: "YYYY-MM-DD").
- Response:
  - Status: 201 (Created)
  - Body:
    - `message` (string): Success message.
    - `data` (object): The created item details.
    - `success` (boolean): Indicates the success status of the request.
- Status: 400 (Bad Request)
- Body:
  - `message` (string): Failure message ("Item Type or Storage Space does not exist or Storage Space is full or Expiration Date is in the past.").
  - `success` (boolean): Indicates the success status of the request (false).
- Status: 500 (Internal Server Error)
- Body:
  - `message` (string): Failure message ("Something went wrong").
  - `data` (object): Empty object.
  - `success` (boolean): Indicates the success status of the request (false).

#### Get All Items

- URL: GET /api/v1/items
- Description: Retrieves all items.
- Request Body:
  - `sortingManner` (string): The sorting manner for the items (optional).
- Response:
  - Status: 200 (OK)
  - Body:
    - `message` (string): Success message.
    - `data` (array): An array of items, each containing the item's ID, item type name, and expiration date.
    - `success` (boolean): Indicates the success status of the request.
  - Status: 500 (Internal Server Error)
  - Body:
    - `message` (string): Failure message ("Something went wrong").
    - `data` (object): Empty object.
    - `success` (boolean): Indicates the success status of the request (false).

#### Relocate Item

- URL: PUT /api/v1/items/:id/move
- Description: Relocates an item to a different storage space.
- Request Parameters:
  - `id` (string): The ID of the item to be relocated.
- Request Body:
  - `storage_space_id` (string, required): The ID of the destination storage space.
- Response:
  - Status: 200 (OK)
  - Body:
    - `message` (string): Success message.
    - `data` (object): The relocated item details.
    - `success` (boolean): Indicates the success status of the request.
- Status: 500 (Internal Server Error)
  - Body:
    - `message` (string): Failure message ("Something went wrong").
    - `data` (object): Empty object.
    - `success` (boolean): Indicates the success status of the request (false).

#### Delete Item

- URL: DELETE /api/v1/items/:id
- Description: Deletes an item.
- Request Parameters:
  - `id` (string): The ID of the item to be deleted.
- Response:
  - Status: 200 (OK)
  - Body:
    - `message` (string): Success message.
    - `data` (object): The deleted item details.
    - `success` (boolean): Indicates the success status of the request.
    - Status: 500 (Internal Server Error)
  - Body:
    - `message` (string): Failure message ("An error occured while deleting the item").
    - `data` (object): Empty object.
    - `success` (boolean): Indicates the success status of the request (false).
