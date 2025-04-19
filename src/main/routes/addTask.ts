import { Application } from 'express';
import axios from 'axios';
import moment from 'moment';

interface Error {
  field: string;
  message: string;
}

function getFieldErrorMessage(errors: Error[], field: string): string | null {
  const error = errors.find(e => e.field === field);
  return error ? error.message : null;
}

export default function (app: Application): void {
  // Route for the task form
  app.get('/add-task', (req, res) => {
    res.render('add-task');
  });

  // Route to handle form submission
  app.post('/task/new', async (req, res) => {
    const { title, description, status } = req.body;
    const { 'dueDateTime-day': day, 'dueDateTime-month': month, 'dueDateTime-year': year } = req.body;

    // Combine date input values into a single dueDateTime string
    const combinedDueDateTime = `${year}-${month}-${day}`;

    // Validation
    const errors = [];
    if (!title) {
      errors.push({ field: 'title', message: 'Enter a title' });
    }
    if (!day || !month || !year || !moment(combinedDueDateTime, 'YYYY-MM-DD', true).isValid()) {
      errors.push({ field: 'dueDateTime', message: 'Enter a valid due date' });
    }

    if (errors.length > 0) {
      return res.render('add-task', { errors, formData: req.body, getFieldErrorMessage });
    }

    try {
      const formattedDueDateTime = moment(combinedDueDateTime).format("YYYY-MM-DDTHH:mm:ss");
      await axios.post('http://localhost:4000/api/v1/tasks', { title, description, status, dueDateTime: formattedDueDateTime });
      res.redirect('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      res.render('add-task', { error: 'Failed to add task', formData: req.body, getFieldErrorMessage });
    }
  });
}
