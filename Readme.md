# Grocery App API Documentation

This documentation provides an overview of the APIs available in the Grocery App project. It explains the functionality and usage of each API endpoint, along with any requirements and expected outputs.

## VideoExplanation Link : https://drive.google.com/drive/folders/1EQcHFhfovV8XIttB-De9h6nvzb2Plz3-?usp=sharing

## Postman Collection Link:- https://crimson-spaceship-479000.postman.co/workspace/New-Team-Workspace~5e5d7c09-620b-47cb-9380-723511705cb8/collection/19543675-70fe63fb-d4fa-43cd-a35a-004acc5dddde?action=share&creator=19543675

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Using Docker](#using-docker)
- [API Endpoints](#api-endpoints)
  - [Storage Spaces](#storage-spaces)
  - [Item Types](#item-types)
  - [Items](#items)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Atharv-Nalwade/LongshotAI-Backend-Assignment.git
   ```

2. Install dependencies:

   ```shell
   npm install
   ```

3. Start the application:

   ```shell
   npm start
   ```

   The application will be running at `http://localhost:3000`.

### Using Docker

1. Install Docker on your machine.

2. Build the Docker image:

   ```shell
   docker build -t grocery-app .
   ```

3. Run the Docker container:

   ```shell
   docker run -p 3000:3000 -d grocery-app
   ```

   The application will be running inside the Docker container at `http://localhost:3000`.

## API Endpoints

### Storage Spaces

- `POST /api/v1/storage-spaces`: Create a new storage space.
- `PUT /api/v1/storage-spaces/:id`: Rename a storage space.
- `DELETE /api/v1/storage-spaces/:id`: Delete a storage space.
- `GET /api/v1/storage-spaces/:id/items`: Get items in a storage space.

### Item Types

- `POST /api/v1/item-types`: Create a new item type.
- `PUT /api/v1/item-types/:id`: Rename an item type.
- `DELETE /api/v1/item-types/:id`: Delete an item type.

### Items

- `POST /api/v1/items`: Create a new item.
- `GET /api/v1/items`: Get all items.
- `PUT /api/v1/items/:id/move`: Relocate an item to a different storage space.
- `DELETE /api/v1/items/:id`: Delete an item.

For detailed information on each endpoint, including request payloads and responses, please refer to the API documentation markdown file.

## Error Handling

The API endpoints handle various error scenarios and provide appropriate error responses. Common error status codes include:

- 400 Bad Request: Invalid or missing request parameters.
- 409 Conflict: Conflict in the current state of a resource.
- 404 Not Found: The requested resource was not found.
- 500 Internal Server Error: An unexpected error occurred on the server.

For detailed error handling information, please refer to the API documentation.

## Note
- The src/cleaner/log.txt file is used to keep trackk of deleted items and thus is used for logging purposes.
- I learned Dokcer in a very short span and have tried to get the job done. If it fails( which it wont mostly) kinldy consider that.

## Assumptions
 - The expired items are cleaned up after every 24 hours given the server is running
 - The expiration_date parameter requires JS Date Object.

## Following resources were used whil eits devlopment:
  - StackOverflow
  - Mongoose
  - npm
  - MDN Docs
  - ChatGPT
  - Google Articles

## Future Scope
 - Currently anyone can make/remove/rename the items/types/storage so authentication mechanism should be implemented.
 - The current error handling scenario can be improved etc.
 