const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getTasksController);
router.get('/tasks/:id', taskController.getTaskController);
router.delete('/tasks/:id', taskController.deleteTaskController);
router.patch('/tasks/:id', taskController.updateTaskController);
router.post('/tasks', taskController.createTaskController);

module.exports = router;