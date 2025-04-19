import axios from 'axios';
import { Application } from 'express';
import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import taskRoutes from '../../main/routes/task';
import { Task } from '../../main/types/task';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GET /task/:id', () => {
  let app: Application;

  beforeAll(() => {
    app = express();
    nunjucks.configure('src/main/views', {
      autoescape: true,
      express: app,
    });
    app.set('view engine', 'njk');
    app.set('views', 'src/main/views');
    taskRoutes(app);
  });

  it('should fetch the task and render the task-view template with the task data', async () => {
    const task: Task = {
      id: 1,
      title: 'Test Task',
      description: 'This is a test task',
      status: 'Completed',
      dueDateTime: '2025-10-31T01:00:00Z',
    };

    mockedAxios.get.mockResolvedValueOnce({ data: task });

    const response = await request(app).get('/task/1');

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:4000/api/v1/tasks/1');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Test Task');
    expect(response.text).toContain('This is a test task');
    expect(response.text).toContain('Completed');
    expect(response.text).toContain('October');
  });

  it('should render the task-view template with an empty object if an error occurs', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Request failed'));

    const response = await request(app).get('/task/1');

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:4000/api/v1/tasks/1');
    expect(response.status).toBe(200);
    expect(response.text).not.toContain('Test Task');
  });
});
