/*
endpoint: /api/register
headers: Content-type: application/json
success responsive status: http 204

example body: 

{
  "teacher": "teacher@gmail.com",
  "students": 
  [
    "studentjon@gmail.com",
    "studenthon@gmail.com"
  ]
}

possible cases

1. no input
2. valid content header
3. wrong input 
  - keys misspelt
  - teacher does not exist in the system
  - values not valid email
4. valid input
*/
let request = require("supertest");
request = request("http://localhost:8080");
const endpoint = "/api/register";

describe("POST /api/register", () => {
  it("should return 400 when no input", (done) => {
    request.post(endpoint).expect(400, done);
  });

  it("should return 404 when wrong method", (done) => {
    request
      .get(endpoint)
      .expect(404, { message: "Endpoint does not exist..." }, done);
  });

  it("should return 400 on wrong key input", (done) => {
    request
      .post(endpoint)
      .send({
        teach: "teacherken@gmail.com",
        students: ["studentjon@gmail.com", "studenthon@gmail.com"],
      })
      .expect(400, done);
  });

  it("should return 400 on invalid email", (done) => {
    request
      .post(endpoint)
      .send({
        teacher: "teacherken@gmailcom",
        students: ["studentjon@gmail.com", "studenthon@gmail.com"],
      })
      .expect(400, done);
  });

  it("should return 404 when teacher not found", (done) => {
    request
      .post(endpoint)
      .send({
        teacher: "unknown@gmail.com",
        students: ["studentjon@gmail.com", "studenthon@gmail.com"],
      })
      .expect(404, done);
  });

  it("should return 204 and add studentjon and studenthon to teacherken", (done) => {
    request
      .post(endpoint)
      .send({
        teacher: "teacherken@gmail.com",
        students: ["studentjon@gmail.com", "studenthon@gmail.com"],
      })
      .expect(204, done);
  });
});
