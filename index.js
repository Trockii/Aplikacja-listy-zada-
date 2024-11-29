const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Serwowanie statycznych plików HTML
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        const updatedTask = { ...tasks[taskIndex], ...req.body };
        tasks[taskIndex] = updatedTask;
        res.json(updatedTask);
    } else {
        res.status(404).send('Zadanie nie znalezione');
    }
});
