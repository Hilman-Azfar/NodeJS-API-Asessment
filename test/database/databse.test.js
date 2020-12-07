const { expect } = require("chai");
const { SqlPool } = require("../../config/db");
const config = require("../../config/env");

describe("database", () => {
  const db = new SqlPool(config.MYSQL);
  beforeEach(async () => {
    await db.initialize();
  });

  afterEach((done) => {
    db.pool.end();
    done();
  });

  it("should initialize and have pool reference", (done) => {
    expect(db.pool).to.not.be.null;
    done();
  });
});
