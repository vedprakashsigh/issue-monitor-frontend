# Issue Monitor - Frontend

## Overview

The frontend of the Issue Monitor web application is developed using React, Chakra UI, and TypeScript. It provides a user interface for managing projects, issues, and users. Users can interact with various components, such as modals and forms, to perform actions like adding or removing users and issues.

## Features

- **User Authentication:** Users can register and log in to access the application.
- **Project Management:** Users can view, add, edit, and delete projects.
- **Issue Tracking:** Users can create, view, edit, and delete issues within projects.
- **User Management:** Admins and Project Managers can add or remove users from projects.
- **Responsive Design:** The application is designed to be responsive across different screen sizes.
- **Theming:** Supports both light and dark themes.

## Installation

To set up the frontend locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/vedprakashsigh/issue-monitor-frontend
   cd issue-monitor-frontend/
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` File:**

   Create a `.env` file in the root of the frontend directory and add the following configuration:

   ```env
   REACT_APP_API_URL=<your-backend-api-url>
   ```

4. **Start the Development Server:**

   ```bash
   npm start
   ```

5. **Open the Application:**

   Navigate to `http://localhost:5173` in your browser.

## Components

- **MainSection:** Displays the selected project’s details and issues.
- **AddUserModal:** Modal for adding users to a project.
- **RemoveUserModal:** Modal for removing users from a project.
- **UsersListModal:** Modal displaying all registered users.
- **IssueList:** Displays a list of issues within a project.
- **IssueItem:** Represents a single issue with actions to edit, delete, or comment.

## Theming

The application uses Chakra UI for styling and supports light and dark themes. The themes are defined in the `theme.ts` file.

## Contexts

- **AuthContext:** Manages user authentication state.
- **ModalContext:** Manages the state of modals.
- **ProjectContext:** Manages the state related to projects and issues.
- **ThemeContext:** Provides the selected theme across the application.

## Contributing

If you would like to contribute to the frontend, please follow these guidelines:

- Fork the repository.
- Create a new branch for your feature or bugfix.
- Make your changes and test thoroughly.
- Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For more detailed documentation, please refer to the [Backend README](https://github.com/vedprakashsigh/issue-monitor-backend/README.md).
