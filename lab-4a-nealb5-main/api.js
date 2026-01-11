class API {
  /**
   * Create a new API instance.
   * @param {string} baseUrl - The base URL for API requests.
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // Function already given
  createTask(cookie, Text, Date) {
    const url = new URL('/api/v1/tasks', this.baseUrl);
    const data = { Text, Date };
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `it210_session=${cookie}`
    };
    return fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
  }

  /**
   * Read all tasks for the user.
   * @param {string} cookie - Pre-authorized cookie.
   * @returns {Promise<Response>} Response from the server.
   */
  readAllTasks(cookie) {
    const url = new URL('/api/v1/tasks', this.baseUrl);
    const headers = { 'Cookie': `it210_session=${cookie}` };
    return fetch(url.toString(), { method: 'GET', headers });
  }

  /**
   * Read a single task by task ID.
   * @param {string} cookie - Pre-authorized cookie.
   * @param {string} taskId - The ID of the task to read.
   * @returns {Promise<Response>} Response from the server.
   */
  readTask(cookie, taskId) {
    const url = new URL(`/api/v1/tasks/${taskId}`, this.baseUrl);
    const headers = { 'Cookie': `it210_session=${cookie}` };
    return fetch(url.toString(), { method: 'GET', headers });
  }

  /**
   * Update a task's completion status.
   * @param {string} cookie - Pre-authorized cookie.
   * @param {string} taskId - The ID of the task to update.
   * @param {boolean} Done - Completion status of the task.
   * @returns {Promise<Response>} Response from the server.
   */
  updateTask(cookie, taskId, Done) {
    const url = new URL(`/api/v1/tasks/${taskId}`, this.baseUrl);
    const data = { Done };
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `it210_session=${cookie}`
    };
    return fetch(url.toString(), {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
  }

  /**
   * Delete a task by ID.
   * @param {string} cookie - Pre-authorized cookie.
   * @param {string} taskId - The ID of the task to delete.
   * @returns {Promise<Response>} Response from the server.
   */
  deleteTask(cookie, taskId) {
    const url = new URL(`/api/v1/tasks/${taskId}`, this.baseUrl);
    const headers = { 'Cookie': `it210_session=${cookie}` };
    return fetch(url.toString(), { method: 'DELETE', headers });
  }

  /**
   * Read current user info.
   * @param {string} cookie - Pre-authorized cookie.
   * @returns {Promise<Response>} Response from the server.
   */
  readCurrentUser(cookie) {
    const url = new URL('/api/v1/user', this.baseUrl);
    const headers = { 'Cookie': `it210_session=${cookie}` };
    return fetch(url.toString(), { method: 'GET', headers });
  }
}

module.exports = API;
