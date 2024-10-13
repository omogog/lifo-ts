
# In-Memory Stack and Key-Value Store API

This project implements an in-memory stack (LIFO) and an in-memory key-value store with optional TTL (Time-to-Live) using Node.js, Express, and TypeScript. The application follows Clean Architecture principles and includes comprehensive test coverage.

## Features
- **In-Memory Stack (LIFO)**: Allows adding items to the stack and retrieving/removing the top item.
- **In-Memory Key-Value Store**: Supports key-value storage with optional TTL (expiration time).
- **Error Handling**: Centralized error handling with custom error types (e.g., `NotFoundError`).
- **Swagger Documentation**: Automatically generated API documentation using Swagger.
- **Testing**: Comprehensive unit and integration tests using Jest and Supertest.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-url
   ```

2. Navigate to the project directory:

   ```bash
   cd your-project-directory
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Application

1. Start the server:

   ```bash
   npm run start
   ```

2. The server will be running on `http://localhost:3000`.

3. Access the Swagger API documentation at:

   ```
   http://localhost:3000/api-docs
   ```

## API Endpoints

### Stack API

1. **Add to Stack**
   - **Endpoint**: `POST /stack/add`
   - **Body**:
     ```json
     {
       "item": "string"
     }
     ```
   - **Response**: `200 OK` with message "Item added to stack"

2. **Get from Stack**
   - **Endpoint**: `GET /stack/get`
   - **Response**: `200 OK` with the top item from the stack or `404 Not Found` if the stack is empty

### Key-Value Store API

1. **Add to Key-Value Store**
   - **Endpoint**: `POST /kvstore/add`
   - **Body**:
     ```json
     {
       "key": "string",
       "value": "string",
       "ttl": "number (optional)"
     }
     ```
   - **Response**: `200 OK` with message "Key added to store"

2. **Get from Key-Value Store**
   - **Endpoint**: `GET /kvstore/get/:key`
   - **Response**: `200 OK` with the value for the given key or `404 Not Found` if the key is not found or has expired

3. **Delete from Key-Value Store**
   - **Endpoint**: `DELETE /kvstore/delete/:key`
   - **Response**: `200 OK` with message "Key deleted" or `404 Not Found` if the key does not exist

## Testing

To run the tests:

```bash
npm test
```

The test suite covers the following:
- **Stack API**: Tests for adding items, retrieving items, and handling empty stacks.
- **Key-Value Store API**: Tests for adding, retrieving, deleting, and TTL-based expiration of key-value pairs.

