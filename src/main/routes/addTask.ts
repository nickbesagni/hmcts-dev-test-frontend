import { Application } from 'express';
import axios from 'axios';
import moment from 'moment';

export default function (app: Application): void {
  // Route for the task form
  app.get('/add-task', (req, res) => {
    res.render('add-task');
  });

  // Route to handle form submission
  app.post('/task/new', async (req, res) => {
    try {
      const { title, description, status, dueDateTime } = req.body;
      const formattedDueDateTime = moment(dueDateTime).format("yyyy-MM-DDTHH:mm:ss");
      await axios.post('http://localhost:4000/api/v1/tasks', { title, description, status, dueDateTime: formattedDueDateTime });
      res.redirect('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      res.render('add-task', { error: 'Failed to add task' });
    }
  });
}
