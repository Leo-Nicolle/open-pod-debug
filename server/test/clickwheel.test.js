const chai = require("chai");
const chaiHttp = require("chai-http");
const regeneratorRuntime = require("regenerator-runtime");
global.regeneratorRuntime = regeneratorRuntime;

// import { writeDb, sendRequest, baseWords } from "./utils";
chai.use(chaiHttp);
const { expect } = chai;

describe("Clickwheel", () => {
  before((done) => {
    const { createApp } = require("../dist/test/server.js");
    const { app, server } = createApp();
    global.app = app;
    global.server = server;
    setTimeout(() => {
      done();
    }, 500);
  });

  after((done) => {
    global.server.close();
    setTimeout(() => {
      done();
    }, 1000);
  });
  // Test to get all students record
  it("should send all the words", () => {
    return sendRequest({
      req: "/word",
      callback: (err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body).to.have.length(3);
        expect(res.body).to.deep.equal(baseWords);
      },
    });
  });

});
