import { Application } from 'express';
import axios from 'axios';
import { Task } from '../types/task';
import updateTaskStatusRoutes from './updateTaskStatus';

export default function (app: Application): void {
  app.get('/task/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const response = await axios.get(`http://localhost:4000/api/v1/tasks/${taskId}`);
      const task: Task = response.data;

      res.render('task-view', { task });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('task-view', {});
    }
  });

  updateTaskStatusRoutes(app);
}
