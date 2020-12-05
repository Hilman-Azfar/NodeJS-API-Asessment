const getMentionsAndText = require("../../utility/getMentionsAndText");
const expect = require("chai").expect;

describe("getMentionAndText", () => {
  it("should not split text", (done) => {
    const notification = "Hello world! I went to the @moon";
    const parsed = getMentionsAndText(notification);
    expect(parsed).to.deep.equal(["Hello world! I went to the @moon"]);
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
});
