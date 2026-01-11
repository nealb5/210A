const API = require('./api');

/**
 * Helper function to generate random text for creating new tasks.
 * @param {number} l - How long the generated text should be (default 10).
 * @returns {string} A randomly-generated string of length `l`.
 */
function generateRandomText(l=10) {
    const characters = 'ABCDEFabcdef0123456789';
    let result = '';
    for (let i = 0; i < l; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

/**
 * Helper function to generate random date for creating new tasks.
 * @returns {string} A randomly-generated date string.
 */
function generateRandomDate() {
    const year = Math.floor(Math.random() * (2025 - 2000 + 1) + 2000);
    const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`;
}

// Update with a valid cookie value for testing
const { baseUrl, cookie } = { baseUrl: 'https://s1.cf-itc210.net', cookie: 's%3A-DTVjWQQWuxZuR22qraGKXF77k3krWmy.ll6WEB9ghyiMAIx64%2B8SJfkQhUpygEGhkDs5Uinq%2FiA' };
const api = new API(baseUrl);

describe('API Tests', () => {
    /* Positive Test Cases */

    test('CREATE', async () => {
        const Text = generateRandomText();
        const Date = generateRandomDate();
        let response = await api.createTask(cookie, Text, Date);
        expect(response.ok).toBe(true);
        let task = await response.json();

        expect(task.Text).toEqual(Text);
        expect(task.Date).toEqual(Date);
        expect(task.Done).toBe(false);
        expect(task).toHaveProperty('UserId');

        await api.deleteTask(cookie, task._id); // Cleanup
    });

    test('READ ONE', async () => {
        const task = await api.createTask(cookie, 'Task for Read Test', generateRandomDate()).then(res => res.json());
        const response = await api.readTask(cookie, task._id);
        expect(response.ok).toBe(true);
        const data = await response.json();
        expect(data.Text).toEqual('Task for Read Test');
        expect(data).toHaveProperty('UserId');
        await api.deleteTask(cookie, task._id); // Cleanup
    });

    test('READ ALL', async () => {
        const response = await api.readAllTasks(cookie);
        expect(response.ok).toBe(true);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
    });

    test('UPDATE', async () => {
        const task = await api.createTask(cookie, 'Task for Update Test', generateRandomDate()).then(res => res.json());
        const response = await api.updateTask(cookie, task._id, true);
        expect(response.ok).toBe(true);
        const updatedTask = await response.json();
        expect(updatedTask.Done).toBe(true);
        await api.deleteTask(cookie, task._id); // Cleanup
    });

    test('DELETE', async () => {
        const task = await api.createTask(cookie, 'Task for Delete Test', generateRandomDate()).then(res => res.json());
        const response = await api.deleteTask(cookie, task._id);
        expect(response.ok).toBe(true);
        const readResponse = await api.readTask(cookie, task._id);
        expect(readResponse.ok).toBe(false); // Should fail to find the deleted task
    });

    test('READ USER', async () => {
        const response = await api.readCurrentUser(cookie);
        expect(response.ok).toBe(true);
        const user = await response.json();
        expect(user).toHaveProperty('Id');
        expect(user).toHaveProperty('UserName');
        expect(user).toHaveProperty('Email');
    });

    /* Negative Test Cases */

    test('READ ONE NONEXISTENT', async () => {
        const response = await api.readTask(cookie, '1234567890abcdef12345678');
        expect(response.status).toBe(404);
    });

    test('DELETE NONEXISTENT', async () => {
        const response = await api.deleteTask(cookie, '1234567890abcdef12345678');
        expect(response.status).toBe(404);
    });

    test('UPDATE NONEXISTENT', async () => {
        const response = await api.updateTask(cookie, '1234567890abcdef12345678', true);
        expect(response.status).toBe(404);
    });

    test('DELETE INVALID ID', async () => {
        const response = await api.deleteTask(cookie, '1234567890abcde'); // invalid length
        expect(response.status).toBe(500);
    });

    test('READ ALL NO COOKIE', async () => {
        const response = await api.readAllTasks('');
        expect(response.status).toBe(401);
    });

    test('CREATE NOT ENOUGH DATA', async () => {
        const response = await api.createTask(cookie, '', ''); // missing data
        expect(response.status).toBe(500);
    });
});
