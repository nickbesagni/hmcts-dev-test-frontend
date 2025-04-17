import { Application } from 'express';
import axios from 'axios';
import { Task, TaskListData, TaskListItem } from '../types/task';

export default function (app: Application): void {
  app.get('/', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/tasks');
      const tasks: Task[] = response.data;

      const taskListItems: TaskListItem[] = tasks.map(task => ({
        title: {
          text: task.title
        },
        href: `#${task.id}`,
        status: {
          tag: {
            text: task.status,
            classes: task.status === 'Completed' ? 'govuk-tag--green' : 'govuk-tag--blue'
          }
        }
      }));

      const taskListData: TaskListData = {
        idPrefix: "task-details",
        items: taskListItems
      };

      res.render('home', { taskListData });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('home', {});
    }
  });
}
