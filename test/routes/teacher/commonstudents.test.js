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
  it("should return 400 when no input", (done) => {
    request.get(endpoint).expect(400, done);
  });

  it("should return 400 when teacher is mispelt", (done) => {
    request.get(endpoint + "?teach=teacherken%40gmail.com").expect(400, done);
  });

  it("should return 400 when email is invalid", (done) => {
    request.get(endpoint + "?teacher=teacherken%40gmailcom").expect(400, done);
  });

  it("should return 200 and student array", (done) => {
    request.get(endpoint + "?teacher=teacherken%40gmail.com").expect(200, done);
  });
});
