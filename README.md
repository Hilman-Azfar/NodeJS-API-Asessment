# NodeJS-API-Asessment

Api for Teachers administrative functions for their students.

## Hosted Link

This assignment is hosted on **[Heroku!](https://www.heroku.com/)**

## Installation

Clone the repo into your machine and install dependencies.

```sh
git clone https://github.com/Hilman-Azfar/NodeJS-API-Asessment.git
npm install
touch .env
```

Include your .env files with the appropriate credentials

```Shell
// .env

DEBUG=true
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

# options for debugging
SET debugging true
```

Main entry is server.js
The server will run on `http://localhost:8080/`.

### Available endpoints

`POST` /api/register

`GET ` /api/commonstudents

`POST ` /api/suspend

`POST ` /api/retrievefornotifications

### Features

- RESTful api
- Logging to access logs
- Unit testing with ???

### Known issues

#### Mysql auth error

Create an account with using standard authentication type. Node MySQL does not support MySQL v8+ caching_sha256_password.
