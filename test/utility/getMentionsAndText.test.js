const getMentionsAndText = require("../../utility/getMentionsAndText");
const expect = require("chai").expect;

describe("getMentionsAndText", () => {
  it("should not split text", (done) => {
    const notification = "Hello world! I went to the @moon";
    const parsed = getMentionsAndText(notification);
    expect(parsed).to.deep.equal(["Hello world! I went to the @moon"]);
    done();
  });

  it("should not split invalid emails", (done) => {
    const notification = "This is a @bad@emailcom";
    const parsed = getMentionsAndText(notification);
    expect(parsed).to.deep.equal(["This is a @bad@emailcom"]);
    done();
  });

  it("should split text and one mention", (done) => {
    const notification = "Hello world @alien@spaceship.com";
    const parsed = getMentionsAndText(notification);
    expect(parsed).to.deep.equal(["Hello world", "alien@spaceship.com"]);
    done();
  });

  it("should split text and multiple mentions", (done) => {
    const notification = "Hello world @alien@spaceship.com @pirate@ship.com";
    const parsed = getMentionsAndText(notification);
    expect(parsed).to.deep.equal([
      "Hello world",
      "alien@spaceship.com",
      "pirate@ship.com",
    ]);
    done();
  });

  it("should split fancy email", (done) => {
    const notification = "Fancy @aa.uu@fncy.ahhh @educator@gov.edu.sg";
    const parsed = getMentionsAndText(notification);
    expect(parsed).to.deep.equal([
      "Fancy",
      "aa.uu@fncy.ahhh",
      "educator@gov.edu.sg",
    ]);
    done();
  });
});
