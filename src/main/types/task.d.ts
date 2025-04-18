// task.d.ts

export interface Task {
    id: number;
    title: string;
    description?: string; // Optional property
    status: string;
    dueDateTime: string;
  }
  
  export interface TaskListItem {
    title: {
      text: string;
    };
    href: string;
    status: {
      tag: {
        text: string;
        classes: string;
      };
    };
  }
  
  export interface TaskListData {
    idPrefix: string;
    items: TaskListItem[];
  }
  