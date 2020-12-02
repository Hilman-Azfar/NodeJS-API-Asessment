# NodeJS-API-Asessment

Api for Teachers administrative functions for their students.

## Hosted Link

This assignment is hosted on **[Heroku!](https://www.heroku.com/)**

## Installation

Clone the repo into your machine and install dependencies.

```sh
git clone https://github.com/Hilman-Azfar/NodeJS-API-Asessment.git
npm install
```

Include your .env files with the appropriate credentials

```Shell
NODE_ENV=development
SECRET=foobar
```

## Usage

```sh
npm start

# options for debugging
SET debugging true
```

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
