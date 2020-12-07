/*
endpoint: /api/suspend
success response status: http 204
request body example: 
{
  "students": "studentmary@gmail.com"
}

possible cases: 

1. no input
2. mispelt key
3. invalid email
4. error on more than one
5. valid request
*/

let request = require("supertest");
request = request("http://localhost:8080");
const endpoint = "/api/suspend";

describe("POST /api/suspend", () => {
  it("should return 400 when no input", (done) => {
    request.post(endpoint).expect(400, done);
  });

  it("should return 400 when student is mispelt", (done) => {
    request
      .post(endpoint)
      .send({
        studen: "studentjon@gmail.com",
      })
      .expect(400, done);
  });

  it("should return 400 on invalid email", (done) => {
    request
      .post(endpoint)
      .send({
        student: "studentjon@gmailcom",
      })
      .expect(400, done);
  });

  it("should return 400 when more than one email", (done) => {
    request
      .post(endpoint)
      .send({
        student: ["studentjon@gmail.com", "studenthon@gmail.com"],
      })
      .expect(400, done);
  });

  it("should return 404 when no student found", (done) => {
    request
      .post(endpoint)
      .send({
        student: "darthvader@gmail.com",
      })
      .expect(404, done);
  });

  it("should return 400 when sent in wrong content", (done) => {
    request.post(endpoint).send("suspended1@gmail.com").expect(400, done);
  });

  it("should return 200 and recipients object", (done) => {
    request
      .post(endpoint)
      .send({ student: "suspended1@gmail.com" })
      .expect(204, done);
  });
});
