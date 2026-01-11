
# API Endpoints Documentation

This outlines the tested endpoints within the API, including details on path parameters, request bodies, and responses.

## Authentication

### Google Login

- **Purpose**: Initiates a login flow using Google OAuth.
- **Endpoint**: `GET api/v1/auth/google`
- **Path Parameters**: None
- **Request Body**: None
- **Expected Response**: A redirection to the Google Login page.

## Tasks

### Create Task

- **Endpoint**: `POST api/v1/tasks`
- **Purpose**: Creates a new task.
- **Path Parameters**: None
- **Request Body JSON Example**:
```json
{
  "Text": "Buy milk",
  "Date": "2024-03-20"
}
```
- **Response Body JSON Example**:
```json
{
  "id": "123",
  "Text": "Buy milk",
  "Date": "2024-03-20",
  "Done": false
}
```

### List Tasks

- **Endpoint**: `GET api/v1/tasks`
- **Purpose**: Retrieves a list of tasks.
- **Path Parameters**: None
- **Request Body**: None
- **Response Body JSON Example**:
```json
[
  {
    "id": "123",
    "Text": "Buy milk",
    "Date": "2024-03-20",
    "Done": false
  },
  {
    "id": "124",
    "Text": "Read a book",
    "Date": "2024-03-21",
    "Done": false
  }
]
```

### Retrieve Single Task

- **Endpoint**: `GET api/v1/tasks/[task_id]`
- **Purpose**: Retrieves a single task by ID.
- **Path Parameters**:
  
  | Parameter | Description          |
  |-----------|----------------------|
  | task_id   | The ID of the task.  |

- **Request Body**: None
- **Response Body JSON Example**:
```json
{
  "id": "123",
  "Text": "Buy milk",
  "Date": "2024-03-20",
  "Done": false
}
```

### Update Task

- **Endpoint**: `PUT api/v1/tasks/[task_id]`
- **Purpose**: Updates a specified task's completion status.
- **Path Parameters**:
  
  | Parameter | Description          |
  |-----------|----------------------|
  | task_id   | The ID of the task.  |

- **Request Body JSON Example**:
```json
{
  "Done": true
}
```
- **Response Body JSON Example**:
```json
{
  "id": "123",
  "Text": "Buy milk",
  "Date": "2024-03-20",
  "Done": true
}
```

### Delete Task

- **Endpoint**: `DELETE api/v1/tasks/[task_id]`
- **Purpose**: Deletes a specified task.
- **Path Parameters**:
  
  | Parameter | Description          |
  |-----------|----------------------|
  | task_id   | The ID of the task.  |

- **Request Body**: None
- **Expected Response**: A confirmation of task deletion.

## User

### Logged in User Info

- **Endpoint**: `GET api/v1/user`
- **Purpose**: Retrieves information about the currently logged-in user.
- **Path Parameters**: None
- **Request Body**: None
- **Response Body JSON Example**:
```json
{
  "id": "user123",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```