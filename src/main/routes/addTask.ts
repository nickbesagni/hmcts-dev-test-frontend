import { Application } from 'express';
import axios from 'axios';

export default function (app: Application): void {
  // Route for the task form
  app.get('/add-task', (req, res) => {
    res.render('add-task');
  });

  // Route to handle form submission
  app.post('/task/new', async (req, res) => {
    try {
      const { title, description, status, dueDateTime } = req.body;
      await axios.post('http://localhost:4000/api/v1/tasks', { title, description, status, dueDateTime });
      res.redirect('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      res.render('taskForm', { error: 'Failed to add task' });
    }
  });
}
