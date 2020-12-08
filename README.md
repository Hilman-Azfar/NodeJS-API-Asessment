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

// testing. server has to be running.
npm run test
yarn test
```

Main entry is server.js.
The server will run on `http://localhost:8080/` by default.

## Available endpoints

### 1. As a teacher, I want to register one or more students to a specified teacher.

- Endpoint: `POST /api/register`
- Headers: `Content-Type: application/json`
- Success response status: HTTP 204
- Request body example:

```
{
  "teacher": "teacherken@gmail.com"
  "students":
    [
      "studentjon@gmail.com",
      "studenthon@gmail.com"
    ]
}
```

Teacher email has to exist in the system. Students can be new/existing entries. Existing students will not be duplicated and only new entries will be added.

### 2. As a teacher, I want to retrieve a list of students common to a given list of teachers.

- Endpoint: `GET /api/commonstudents`
- Success response status: HTTP 200
- Request example 1: `GET /api/commonstudents?teacher=teacherken%40gmail.com`
- Success response body 1:

```
{
  "students" :
    [
      "commonstudent1@gmail.com",
      "commonstudent2@gmail.com",
      "student_only_under_teacher_ken@gmail.com"
    ]
}
```

- Request example 2: `GET /api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com`
- Success response body 2:

```
{
  "students" :
    [
      "commonstudent1@gmail.com",
      "commonstudent2@gmail.com"
    ]
}
```

### 3. As a teacher, I want to suspend a specified student.

- Endpoint: `POST /api/suspend`
- Headers: `Content-Type: application/json`
- Success response status: HTTP 204
- Request body example:

```
{
  "student" : "studentmary@gmail.com"
}
```

Student email has to exist in the database.

### 4. As a teacher, I want to retrieve a list of students who can receive a given notification.

- Endpoint: `POST /api/retrievefornotifications`
- Headers: `Content-Type: application/json`
- Success response status: HTTP 200
- Request body example 1:

```
{
  "teacher":  "teacherken@gmail.com",
  "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
}
```

- Success response body 1:

```
{
  "recipients":
    [
      "studentbob@gmail.com",
      "studentagnes@gmail.com",
      "studentmiche@gmail.com"
    ]
}
```

- Request body example 2:

```
{
  "teacher":  "teacherken@gmail.com",
  "notification": "Hey everybody"
}
```

- Success response body 2:

```
{
  "recipients":
    [
      "studentbob@gmail.com"
    ]
}
```

Teacher email has to exist.

### Features

- RESTful api
- Logging to access logs
- Unit testing with mocha chai and supertest
- MVC project structure
- Request validation with express-validation and joi

## Known issues

#### Mysql auth error

Create an account with using standard authentication type. Node MySQL does not support MySQL v8+ caching_sha256_password.
