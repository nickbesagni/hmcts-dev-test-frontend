import request from 'supertest';
import express from 'express';
import path from 'path';
import updateTaskStatusRoutes from '../../main/routes/updateTaskStatus';
import { Task } from '../../main/types/task';

const app = express();
app.set('views', path.join(__dirname, '../../main/views'));
app.set('view engine', 'njk');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
updateTaskStatusRoutes(app);

jest.mock('axios');
const axios = require('axios');

describe('Update Task Status Routes', () => {
  const task: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: 'Not done',
    dueDateTime: '2023-12-31T23:59:00'
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: task });
    axios.put.mockResolvedValue({});
  });

  it('should update the task status and redirect to task view', async () => {
    const response = await request(app).get('/task/1/update-status?status=Completed');
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/task/1');
    expect(axios.put).toHaveBeenCalledWith('http://localhost:4000/api/v1/tasks/1', {
      title: task.title,
      description: task.description,
      status: 'Completed',
      dueDateTime: task.dueDateTime
    });
  });

  it('should handle errors gracefully', async () => {
    axios.put.mockRejectedValue(new Error('Failed to update task status'));
    const response = await request(app).get('/task/1/update-status?status=Completed');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Failed to update task status');
  });
});
