const toLowerCaseEmail = require("../../utility/toLowerCaseEmail");
const expect = require("chai").expect;

describe("toLowerCaseEmail", () => {
  it("should lowercase one email", (done) => {
    const email = "AbcD@gmail.com";
    const lower = toLowerCaseEmail(email);
    expect(lower).to.equal("abcd@gmail.com");
    done();
  });

  it("should lowercase array of strings", (done) => {
    const email = ["AbcD@gmail.com", "eFgH@gMaIl.com"];
    const lower = toLowerCaseEmail(email);
    expect(lower).to.deep.equal(["abcd@gmail.com", "efgh@gmail.com"]);
    done();
  });
});
