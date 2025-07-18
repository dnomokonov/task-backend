const db = require('../config/db');

const getAllTasks = async () => {
    try {
        return await db.any('SELECT * FROM tasks');
    } catch (e) {
        throw new Error(`Error fetching tasks: ${e.message}`);
    }
};

const getTaskById = async (id) => {
    try {
        return await db.oneOrNone('SELECT * FROM tasks WHERE id = $1', [id]);
    } catch (e) {
        throw new Error(`Error fetching task with id ${id}: ${e.message}`);
    }
};

const createTask = async (data) => {
    try {
        const { title, description, category, status, priority } = data;

        if (!title || !status || !priority || !category) {
            throw new Error('Required fields: title, status, priority, category');
        }

        const dateCreated = new Date().toISOString().split('T')[0];

        const query = `
            INSERT INTO tasks (title, description, category, status, priority, datecreated)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `;
        const values = [title, description || null, category, status, priority, dateCreated];

        const result = await db.one(query, values);
        return result.id;
    } catch (e) {
        throw new Error(`Error creating task: ${e.message}`);
    }
};

const updateTask = async (id, data) => {
    try {
        const { title, description, category, status, priority } = data;

        if (!title || !status || !priority || !category) {
            throw new Error('Required fields: title, status, priority, category');
        }

        const query = `
            UPDATE tasks 
            SET title = $1, description = $2, category = $3, status = $4, priority = $5
            WHERE id = $6
            RETURNING *
        `;
        const values = [title, description || null, category, status, priority, id];

        const updated = await db.oneOrNone(query, values);
        return updated;
    } catch (e) {
        throw new Error(`Error updating task with id ${id}: ${e.message}`);
    }
};

const deleteTask = async (id) => {
    try {
        const result = await db.result('DELETE FROM tasks WHERE id = $1', [id]);
        return result.rowCount > 0;
    } catch (e) {
        throw new Error(`Error deleting task with id ${id}: ${e.message}`);
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
