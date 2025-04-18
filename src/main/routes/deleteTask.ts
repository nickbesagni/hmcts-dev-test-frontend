import { Application } from 'express';
import axios from 'axios';

export default function (app: Application): void {
  app.post('/task/:id/delete', async (req, res) => {
    try {
      const taskId = req.params.id;
      await axios.delete(`http://localhost:4000/api/v1/tasks/${taskId}`);
      res.redirect('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      res.render('task-view', { error: 'Failed to delete task' });
    }
  });
}
