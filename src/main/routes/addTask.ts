import { Application } from 'express';
import axios from 'axios';
import moment from 'moment';

interface FieldError {
  field: string;
  message: string;
}

function getFieldErrorMessage(errors: FieldError[], field: string): string | null {
  const error = errors.find(e => e.field === field);
  console.log(errors);
  return error ? error.message : null;
}

export default function (app: Application): void {
  // Route for the task form
  app.get('/add-task', (req, res) => {
    res.render('add-task');
  });

  // Route to handle form submission
  app.post('/task/new', async (req, res) => {
    const { title, description, status, dueDateTime } = req.body;

    // Validation
    const errors = [];
    if (!title) {
      errors.push({ field: 'title', message: 'Enter a title' });
    }
    if (!dueDateTime) {
      errors.push({ field: 'dueDateTime', message: 'Enter a due date' });
    }

    if (errors.length > 0) {
      return res.render('add-task', { errors, formData: req.body, getFieldErrorMessage });
    }

    try {
      const formattedDueDateTime = moment(dueDateTime).format("YYYY-MM-DDTHH:mm:ss");
      await axios.post('http://localhost:4000/api/v1/tasks', { title, description, status, dueDateTime: formattedDueDateTime });
      res.redirect('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      res.render('add-task', { error: 'Failed to add task', formData: req.body, getFieldErrorMessage });
    }
  });
}
