import { Application } from 'express';
import axios from 'axios';
import moment from 'moment';
import { Task, TaskListData, TaskListItem } from '../types/task';

export default function (app: Application): void {
  app.get('/', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/tasks');
      let tasks: Task[] = response.data;

      // Sort tasks by priority ('Not done' first, then 'Completed') and by dueDateTime in chronological order
      tasks = tasks.sort((a, b) => {
        if (a.status === b.status) {
          return new Date(a.dueDateTime).getTime() - new Date(b.dueDateTime).getTime();
        }
        return a.status === 'Not done' ? -1 : 1;
      });

      const taskListItems: TaskListItem[] = tasks.map(task => ({
        title: {
          text: `${task.title} - Due: ${moment(task.dueDateTime).format('D MMM YYYY')}`
        },
        href: `/task/${task.id}`,
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
