/*
endpoint: /api/commonstudents
success response status: http 200
success response body example: 
{
  "students": 
  [
    "commonstudent1@gmail.com",
    "commonstudent2@gmail.com",
    "student_only_under_teacher_ken@gmail.com"
  ]
}

possible cases: 

1. no input
2. mispelt query
3. invalid query email
4. valid query
*/

let request = require("supertest");
request = request("http://localhost:8080");
const endpoint = "/api/commonstudents";

describe("GET /api/commonstudents", () => {
  it("No input validation error", (done) => {
    request.get(endpoint).expect(400, done);
  });

  it("Mispelt query - teacher", (done) => {
    request.get(endpoint + "?teach=teacherken%40gmail.com").expect(400, done);
  });

  it("Mispelt query email", (done) => {
    request.get(endpoint + "?teacher=teacherken%40gmailcom").expect(400, done);
  });

  it("Valid query", (done) => {
    request.get(endpoint + "?teacher=teacherken%40gmail.com").expect(200, done);
  });
});
