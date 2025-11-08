# MERN Bug Tracker

## About the Project

This is a **Bug Tracker application** built with the **MERN stack** (MongoDB, Express, React, Node.js). The project helps users report, view, update and delete bugs while demonstrating testing and debugging best practices.

The main goals of this project were to:

* Ensure reliable backend and frontend through tests
* Handle errors gracefully with error boundaries and notifications
* Learn debugging techniques in both client and server

---

## Project Structure

testing-and-debugging-ensuring-mern-app-reliability-MorganWambulwa/
├── client/
│   ├── node_modules/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── bugApi.js
│   │   ├── components/
│   │   │   ├── BugCard.jsx
│   │   │   ├── BugForm.jsx
│   │   │   ├── BugList.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── styles/
│   │   │   └── main.css
│   │   ├── tests/
│   │   │   ├── integration/
│   │   │   └── unit/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── jest.config.js
│   ├── package-lock.json
│   └── package.json
├── server/
│   ├── node_modules/
│   ├── controllers/
│   │   ├── bugController.js
│   │   └── postsController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Bug.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   │   ├── bugRoutes.js
│   │   └── posts.js
│   ├── utils/
│   │   ├── auth.js
│   │   └── validateBug.js
│   ├── tests/
│   │   ├── integration/
│   │   │   └── posts.test.js
│   │   ├── unit/
│   │   │   └── auth.test.js
│   │   └── utils/
│   │       └── testHelpers.js
│   ├── app.js
│   ├── server.js
│   ├── setup.js
│   ├── package-lock.json
│   └── package.json
├── .gitignore
├── jestconfig.js
├── package-lock.json
├── README.md
└── Week6-Assignment.md

---

## Features

* Add, view, update and delete bugs
* Backend validation for bug data
* Error handling using Express middleware
* Frontend error boundaries to catch crashes
* Notifications using `react-toastify`

---

## Installation

### Backend

```bash
cd server
npm install
```

Start server:

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

---

## Testing

### Backend

* Unit tests for helper functions like `validateBug`
* Integration tests for API endpoints using **Supertest**
* Mock database calls to avoid hitting real MongoDB

Run backend tests:

```bash
cd server
npm test
```

### Frontend

* Unit tests for components (`BugForm`, `BugList`, `Navbar`)
* Integration tests: simulate API calls, check UI updates, loading and empty states, error messages

Run frontend tests:

```bash
cd client
npm test
```

---

## Debugging

* **Console logs** for tracking state
* **Chrome DevTools** for inspecting components and network requests
* **Node.js Inspector** for server debugging
* Introduce minor intentional bugs to test error handling
* **ErrorBoundary** to catch frontend crashes

---

## Error Handling

* Backend: Express middleware returns structured error messages
* Frontend: ErrorBoundary component wraps `<App />` and uses toast notifications for API errors

---

## Contributing

1. Fork the repo
2. Clone locally: `git clone <repo-url>`
3. Create a branch: `git checkout -b feature/my-feature`
4. Make changes and commit: `git commit -m "Add feature"`
5. Push and open a pull request

## License

MIT License
