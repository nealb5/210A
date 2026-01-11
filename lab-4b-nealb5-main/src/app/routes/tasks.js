const express = require(`express`);
const router = express.Router();

const Task = require(`../models/Task`);

// GET: Returns one task with the task's id specified in the path
router.get(`/:id`, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            // Make sure the error response is in JSON format
            return res.status(404).send({ error: `Task with ID ${req.params.id} does not exist.` });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        // Also send this error in JSON format
        res.status(500).send({ error: `Something went wrong.` });
    }
});


// POST: Create a new task
router.post('/', async (req, res) => {
    // Simple validation (ensure text or other required fields are present)
    if (!req.body.Text) {
        return res.status(500).send({ error: 'Text field is required' });
    }

    try {
        const task = new Task({
            UserId: req.user.Id, // Assuming req.user.Id is available and correct
            Text: req.body.Text,
            Done: req.body.done,
            Date: req.body.Date
        });
        const savedTask = await task.save();
        res.status(201).send(savedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create task due to an internal error');
    }
});

// GET: Retrieve all tasks
router.get('/', async (req, res) => {
    try {
        
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve tasks due to an internal error');
    }
});


// PUT: Update a task
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).send({ error: 'Task not found' });
        }
        res.send(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to update task due to an internal error');
    }
});

// DELETE: Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndRemove(req.params.id);
		if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
