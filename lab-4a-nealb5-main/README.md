
# API Endpoints Documentation

This document provides an overview of the tested API endpoints, detailing path parameters, request bodies, and response formats.

## Authentication

### Google Login

- **Purpose**: Initiates a login using Google OAuth.
- **Endpoint**: `GET api/v1/auth/google`
- **Path Parameters**: None
- **Request Body**: None
- **Expected Response**: Redirects you to the Google Login page.

## Tasks

### Create Task

- **Endpoint**: `POST api/v1/tasks`
- **Purpose**: Creates new task
- **Path Parameters**: None
- **Request Body JSON Example**:
  ```json
  {
    "Text": "Pick up groceries",
    "Date": "2024-10-24"
  }
  ```
- **Response Body JSON Example**:
  ```json
  {
    "id": "abc123",
    "Text": "Pick up groceries",
    "Date": "2024-10-24",
    "Done": false
  }
  ```

### List Tasks

- **Endpoint**: `GET api/v1/tasks`
- **Purpose**: Retrieves list of tasks
- **Path Parameters**: None
- **Request Body**: None
- **Response Body JSON Example**:
  ```json
  [
    {
      "id": "abc123",
      "Text": "Pick up groceries",
      "Date": "2024-10-24",
      "Done": false
    },
    {
      "id": "def456",
      "Text": "Read a book",
      "Date": "2024-10-20",
      "Done": false
    }
  ]
  ```

### Retrieve Single Task

- **Endpoint**: `GET api/v1/tasks/[task_id]`
- **Purpose**: Retrieves single task by the ID
- **Path Parameters**:

  | Parameter | Description       |
  |-----------|-------------------|
  | task_id   | The ID of the task|

- **Request Body**: None
- **Response Body JSON Example**:
  ```json
  {
    "id": "abc123",
    "Text": "Pick up groceries",
    "Date": "2024-10-24",
    "Done": false
  }
  ```

### Update Task

- **Endpoint**: `PUT api/v1/tasks/[task_id]`
- **Purpose**: Updates specified task's completion status
- **Path Parameters**:

  | Parameter | Description       |
  |-----------|-------------------|
  | task_id   | The ID of the task|

- **Request Body JSON Example**:
  ```json
  {
    "Done": true
  }
  ```
- **Response Body JSON Example**:
  ```json
  {
    "id": "abc123",
    "Text": "Pick up groceries",
    "Date": "2024-10-24",
    "Done": true
  }
  ```

### Delete Task

- **Endpoint**: `DELETE api/v1/tasks/[task_id]`
- **Purpose**: Deletes a specified task.
- **Path Parameters**:

  | Parameter | Description       |
  |-----------|-------------------|
  | task_id   | The ID of the task|

- **Request Body**: None
- **Expected Response**: Confirmation of task deletion

## User

### Logged in User Info

- **Endpoint**: `GET api/v1/user`
- **Purpose**: Retrieves information about currently logged-in user
- **Path Parameters**: None
- **Request Body**: None
- **Response Body JSON Example**:
  ```json
  {
    "id": "user123",
    "name": "John Smith",
    "email": "john.smith@example.com"
  }
  ```
