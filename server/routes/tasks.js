const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Tüm görevleri getir
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('userId', 'username email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni görev oluştur
router.post('/', async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      category: req.body.category,
      userId: req.body.userId
    });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Görev güncelle
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Görev sil
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Görev silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;