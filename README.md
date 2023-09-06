![Good Shit](./good_shit.png)

![Contributors](https://img.shields.io/github/contributors/csesoc/trainee-1-2-23t2)
![Commit Activity](https://img.shields.io/github/commit-activity/m/csesoc/trainee-1-2-23t2)
![GitHub Repo size](https://img.shields.io/github/repo-size/csesoc/trainee-1-2-23t2)

Good Shit is an interactive toilet finder designed to help UNSW students plan and find their ideal bathroom breaks.

## Running Good Shit Locally

Prerequisites
Before you start, make sure that you have the following software installed.

- Git (standard on Linux) or GitHub Desktop
- Node.js and npm (usually bundled with Node.js)

## Setup

Clone the repository:

```shell
$ git clone git@github.com:csesoc/trainee-1-2-23t2.git
```

### Download Dependencies

From the root of the repository run the following command to download dependencies:

```shell
$ cd backend && npm i && cd ../frontend && npm i && cd ..
```

NPM install in both the backend and frontend directories.

### Running the Frontend

Run to run the frontend run

```shell
$ cd frontend && npm run dev
```

from root or

```shell
$ npm run dev
```

from the `frontend` directory.

### Running the Backend

Run to run the backend:

1. Navigate to the backend directory:
```shell
$ cd backend
```
2. Create a `.env` file in the root of the project containing:
```js
MONGO_URI = [YOUR MONGO URI]
JWT_SECRET = [YOUR JWT SECRET]
```
3. To start the server, run:
```shell
$ npm start
```
