# NodeJS-API-Asessment

Api for Teachers administrative functions for their students.

## Hosted Link

This assignment is hosted on **[Heroku!](https://manage-school-api.herokuapp.com/)**

## Installation

1. Clone the repo into your machine and install dependencies.

```sh
git clone https://github.com/Hilman-Azfar/NodeJS-API-Asessment.git
npm install or
yarn install
touch .env
```

2. Add a .env file in your root folder with the appropriate credentials

```Shell
// .env

NODE_ENV=development
HOST=localhost
DBPORT=3306
DBUSER=<insert_your_username>
PASSWORD=<insert_your_password>
DATABASE=<your_preferred_database_name>
```

## Usage

```sh
// production
npm start

// development
npm run dev
yarn dev

// testing
npm run test
yarn test
```

Main entry is server.js.
The server will run on `http://localhost:8080/` by default.

### Available endpoints

`POST` /api/register

`GET ` /api/commonstudents

`POST ` /api/suspend

`POST ` /api/retrievefornotifications

### Features

- RESTful api
- Logging to access logs
- Unit testing with mocha chai and supertest
- MVC project structure
- Request validation with express-validation and joi

## Known issues

#### Mysql auth error

Create an account with using standard authentication type. Node MySQL does not support MySQL v8+ caching_sha256_password.
