const request = require("supertest");

const app = require("../../index");
const { DEFAULT_USER_TOKEN } = require("../helpers/data");

describe("Crypto Controller", () => {
  it("POST /crypto", async () => {
    const res = await request(app)
      .post("/api/crypto")
      .set({
        Authorization: DEFAULT_USER_TOKEN,
      })
      .send({
        title: "Bitcoin",
        value: 4455.87,
      });
    expect(res.statusCode).toBe(201);
  });

  it("GET /crypto", async () => {
    const res = await request(app)
      .get("/api/crypto")
      .set({
        Authorization: DEFAULT_USER_TOKEN,
      })
      .send();
    expect(res.statusCode).toBe(200);
    console.log(res.body);
  });

  it("PUT /crypto", async () => {
    const res = await request(app)
      .put("/api/crypto/1")
      .set({
        Authorization: DEFAULT_USER_TOKEN,
      })
      .send({ title: "Bitcoin", value: 5000 });
    expect(res.statusCode).toBe(200);
    expect(res.body.value).toBe(5000);
  });

  it("DELETE /crypto", async () => {
    const res = await request(app)
      .delete("/api/crypto/1")
      .set({
        Authorization: DEFAULT_USER_TOKEN,
      })
      .send({ title: "Bitcoin", value: 5000 });
    expect(res.statusCode).toBe(200);
  });
});
