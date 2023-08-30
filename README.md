# My ToDo List App

A highly intuitive ToDo List/Task Manager web application built using React, TypeScript, and SWR for data fetching.

## Live Demo

Check out the live demo of the app: [Task Manager List App](https://task-manager-frontend.vercel.app/)

## Tech Stack

- **Frontend**: React, TypeScript
- **State Management**: Context API
- **Data Fetching**: SWR and Axios
- **Styling**: TailwindCSS
- **API**: NodeJS + Express.js
- **Database**: MongoDB

## Features

- Create, update, and delete tasks.
- Toggle task completion status.
- Filter tasks based on completion status.
- Manage tags for tasks.
- Responsive design for mobile and desktop.

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/Maestroharyor/task-manager-frontend
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your API base URL:

   ```env
   VITE_BASE_URL=link_to_the_endpoint
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to see the app in action.

## How It Works

- The app uses React and TypeScript for building the user interface.
- The Context API is utilized for state management, including tasks and tags.
- SWR is employed for efficient data fetching and caching from the API.
- Users can create, update, and delete tasks, and also toggle task completion status.
- The user interface is designed to provide a user-friendly experience on both mobile and desktop devices.
- The app's data is persisted in a database (MongoDB) via the API endpoints.
- Tags can be assigned to tasks, allowing for better organization and categorization.
- Tags can be visually differentiated based on colors.
- The app follows a component-based architecture for modular and maintainable code.

## Contributions

Contributions are welcome! Feel free to open issues or submit pull requests for enhancements, bug fixes, or new features.
````
