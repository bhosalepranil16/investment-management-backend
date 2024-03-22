const { generateOTP, errorHandler } = require("../../util/index");

describe("util.js", () => {
  it("Test generateOTP", () => {
    expect(generateOTP("error message")).toMatchSnapshot();
  });

  it("Test errorHandler", () => {
    expect(errorHandler("error message")).toMatchSnapshot();
  });
});
