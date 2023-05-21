# React.js + Camunda BPM + REST API (Node.js) Integration POC

This repository contains a proof of concept (POC) demonstrating the integration of React.js, Camunda BPM, and a REST API built with Node.js. The POC showcases a containerized application using Docker, combining frontend, backend, and process orchestration capabilities.

## About

The purpose of this POC is to showcase how React.js, Camunda BPM, and a Node.js REST API can be seamlessly integrated to build a full-stack application. It demonstrates the coordination between the user interface, backend services, and process orchestration using BPMN workflows. The combination of these technologies enables efficient business process automation, task management, and data storage.

## Key Features

- **React.js Frontend**: The frontend is built using React.js, a popular JavaScript library for building user interfaces. It provides a responsive and interactive user interface for interacting with the application.

- **Camunda BPM**: Camunda BPM is an open-source platform for workflow and decision automation. It offers a robust process engine capable of executing BPMN workflows, managing process instances, and handling user tasks.

- **Node.js REST API**: The backend REST API is implemented using Node.js and Express.js. It provides endpoints for data retrieval, storage, and interaction with the Camunda BPM engine.

- **MongoDB**: MongoDB is used as the database to store process-related data. It provides a flexible and scalable solution for persisting process instances and associated information.

## Quick start

> Note: Make sure you have the following dependencies installed: git, docker, docker-compose.

### **To start the application, follow these steps:**:

1. Clone the repository:

   ```
   git clone https://github.com/AlexSKuznetsov/control-app.git
   ```

2. Navigate to the project directory:

   ```
   cd control-app
   ```

3. Run the application using Docker Compose:

   ```sh
   docker-compose up
   ```

   To run the application in detached mode, use the following command instead:

   ```sh
   docker-compose up -d
   ```

4. Upload the BPMN model from the camunda directory to the Camunda Engine using the Camunda Modeler. You can download the modeler from [here](https://camunda.com/download/modeler/)
   - REST endpoint: http://localhost:8080/engine-rest

### **Links to different parts:**

Here are the links to access different parts of the application:

- **WebApp UI**:
  http://localhost

- **Tasklist, Cockpit, Admin web apps**:

  The three Camunda web apps are accessible through the landing page: http://localhost:8080/camunda-welcome/index.html

  - Default admin credentials:
    - Username: `admin`
    - Password: `admin`

- **REST API**:

  The Camunda Rest-API is accessible through: http://localhost:8080/engine-rest

  See the [REST API](https://docs.camunda.org/manual/latest/reference/rest/)
  documentation for more details on how to use it.

- **MongoDB**: http://localhost:27017

  - Use Mongo DB Compas for GUI https://www.mongodb.com/try/download/compass

<details>
<summary>Tech stack</summary>

**1. Frontend:**

- React
- Typescript
- Vite
- React Router
- React Query
- Material UI

**2. Backend Rest API:**

- Node.js
- Express.js

**3. Mongo DB:**

- Storing Process Data correlated with Process ID

**4. Camunda BPM 7:**

- Process Orchestrator with BPMN support

</details>

That's it! You now have the application up and running with the various components integrated.
