/*
endpoint: /api/retrievefornotifications
success response status: http 200
request body example: 
{
  "teacher": "teacherken@gmail.com",
  "notification": "Hello students! @studentagnes@gmail.com"
}

success response body:
{
  "recipients": 
  [
    "studentbob@gmail.com",
    "studentagnes@gmail.com",
    "studentmiche@gmail.com"
  ]
}

possible cases: 

1. no input
2. mispelt key
3. invalid email
4. teacher not found
5. valid request - no duplicates correct status code
*/

let request = require("supertest");
request = request("http://localhost:8080");
const endpoint = "/api/retrievefornotifications";

describe("POST /api/retrievefornotifications", () => {
  it("should return 400 when no input", (done) => {
    request.post(endpoint).expect(400, done);
  });

  it("should return 400 when teacher is mispelt", (done) => {
    request
      .post(endpoint)
      .send({
        teache: "teacherken@gmail.com",
        notification: "Hello students! @underken@gmail.com",
      })
      .expect(400, done);
  });

  it("should return 400 when teacher email is invalid", (done) => {
    request
      .post(endpoint)
      .send({
        teacher: "teacherken@gmailcom",
        notification: "Hello students! @underken@gmail.com",
      })
      .expect(400, done);
  });

  it("should return 404 when teacher is not found", (done) => {
    request
      .post(endpoint)
      .send({
        teacher: "unknown@gmail.com",
        notification: "Hello students! @underken@gmail.com",
      })
      .expect(404, done);
  });

  it("should return 200 and recipient array", (done) => {
    request
      .post(endpoint)
      .send({
        teacher: "teacherken@gmail.com",
        notification: "Hello students! @underken@gmail.com",
      })
      .expect(200, done);
  });
});
