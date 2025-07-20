const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../models/taskModel');

const getTasksController = async (_, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

const getTaskController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await getTaskById(id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({error: 'Task not found'});
        }
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

const deleteTaskController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await deleteTask(id);
        if (task) {
            res.status(200).json({id: id, message: 'successfully'});
        } else {
            res.status(404).json({error: 'Task not found'});
        }
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

const updateTaskController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await updateTask(id, req.body);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const createTaskController = async (req, res) => {
    try {
        const task = await createTask(req.body);
        res.status(201).json(task);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    getTasksController,
    getTaskController,
    deleteTaskController,
    updateTaskController,
    createTaskController,
}