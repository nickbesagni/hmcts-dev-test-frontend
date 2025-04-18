import { Application } from 'express';
import axios from 'axios';
import { Task } from '../types/task';

export default function (app: Application): void {
  app.get('/task/:id/update-status', async (req, res) => {
    try {
      const taskId = req.params.id;
      const { status } = req.query;

      // Fetch the current task data
      const response = await axios.get(`http://localhost:4000/api/v1/tasks/${taskId}`);
      const task: Task = response.data;

      // Update only the status field
      await axios.put(`http://localhost:4000/api/v1/tasks/${taskId}`, {
        title: task.title,
        description: task.description,
        status,
        dueDateTime: task.dueDateTime
      });

      // Redirect back to the task-view page
      res.redirect(`/task/${taskId}`);
    } catch (error) {
      console.error('Error updating task status:', error);
      res.render('task-view', { error: 'Failed to update task status' });
    }
  });
}
