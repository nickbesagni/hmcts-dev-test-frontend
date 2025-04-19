# Task Management Application

This is a simple task management application built with Express.js, Nunjucks, and Axios. The application allows users to add, view, and manage tasks.

## Features

- Add new tasks with a title, description, status, and due date.
- View task details.
- Update task status.
- Delete tasks.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/nickbesagni/hmcts-dev-test-frontend
   cd task-management-app
```
2. Install dependencies:
```sh
yarn install
```
3. Start the application:
```sh
yarn start
```
4. Open your browser and navigate to `http://localhost:3100` 

## Running tests
To run the unit tests, use the following command:
```sh
yarn test:unit
```
To run the routing tests, use the following command:
```sh
yarn test:routing
```

N.B.: Functional tests are not yet implemented.

## Project Structure
```
.
├── src
│   ├── main
│   │   ├── routes
│   │   │   ├── addTask.ts
│   │   │   ├── task.ts
│   │   │   └── updateTaskStatus.ts
│   │   ├── views
│   │   │   ├── add-task.njk
│   │   │   ├── task-view.njk
│   │   │   └── template.njk
│   │   ├── app.ts
│   │   └── server.ts
│   ├── test
│   │   ├── unit
│   │   │   ├── addTask.test.ts
│   │   │   └── task.test.ts
│   │   └── functional
│   │       └── add-task.feature
│   └── types
│       └── task.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Limitations
- Validation: The current validation logic is basic and only checks for the presence of the title and due date fields. More comprehensive validation (e.g., checking for valid date formats) could be added.
- Error Handling: Error handling is minimal and could be improved to provide more detailed error messages and handle different types of errors more gracefully.
- Test Coverage: The current test coverage is limited to unit tests for the routes. More test types, such as integration tests and end-to-end tests, could be added to ensure the application works correctly in different scenarios.
- User Authentication: The application does not include user authentication. Adding authentication would allow for user-specific task management.

## Future Work
- Enhanced Validation: Implement more comprehensive validation logic to ensure data integrity and provide better user feedback.
- Improved Error Handling: Add more detailed error messages and handle different types of errors more gracefully.
- Increased Test Coverage: Add more test types, such as integration tests and end-to-end tests, to ensure the application works correctly in different scenarios.
- User Authentication: Implement user authentication to allow for user-specific task management.
- Database Integration: Integrate a database to allow for persistent storage of tasks.
- Task Prioritization: Add functionality to allow users to prioritize tasks. This could be done by adding a priority field to the task model and updating the views and routes accordingly. 
- UI/UX Improvements: Enhance the user interface and user experience to make the application more user-friendly.