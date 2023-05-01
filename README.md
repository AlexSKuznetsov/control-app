# About

POC showing integration **React.js + Camunda BPM + REST API (Node.js)** containerised in Docker

## Quick start

> !!! Dependencies: git, docker, docker-compose.

### **To start an App use folowing commands**:

1. Clone current repo:

```
git clone git@github.com:AlexSKuznetsov/control-app.git
```

2. Change current directory:

```
cd control-app
```

3. Run App:

```sh
docker-compose up
```

### **Links to different parts:**

**WebApp UI**:
http://localhost

**Tasklist, Cockpit, Admin web apps**:

The three Camunda web apps are accessible through the landing page:
http://localhost:8080/camunda-welcome/index.html

The default credentials for admin access to the web apps is:

- Username: `demo`
- Password: `demo`

**REST API**:

The Camunda Rest-API is accessible through: http://localhost:8080/engine-rest

See the [REST API](https://docs.camunda.org/manual/latest/reference/rest/)
documentation for more details on how to use it.

**MongoDB**:

http://localhost:27017

_Use Mongo DB Compas for GUI https://www.mongodb.com/try/download/compass_

<details>
<summary>Tech stack</summary>

**1. Frontend:**

- React
- Typescript
- Vite

**2. Backend Rest API:**

- Node.js
- Express.js

**3. Mongo DB:**

- Storing Process Data correlated with Process ID

**4. Camunda BPM 7:**

- Process Orchestrator with BPMN support

</details>
