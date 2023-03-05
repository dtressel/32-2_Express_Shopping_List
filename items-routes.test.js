process.env.NODE_ENV = "test";

const request = require("supertest");
const items = require('./fakeDb');

const app = require("./app");

afterEach(function() {
  items.length = 0;
  items.push({name: 'chips', price: 1.49});
  items.push({name: 'cookies', price: 2.99});
  items.push({name: 'apple', price: 0.79});
  items.push({name: 'pizza', price: 6.99});
});

describe("GET /items", function() {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {name: 'chips', price: 1.49},
      {name: 'cookies', price: 2.99},
      {name: 'apple', price: 0.79},
      {name: 'pizza', price: 6.99}
    ]);
  });
});

describe("POST /items", function() {
  test("Adds a new item", async function() {
    const resp = await request(app).post(`/items`).send(
      {name: 'orange', price: 1.09}
    );
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual(
      {added: {name: 'orange', price: 1.09}},
    );
    expect(items.find(item => item.name === 'orange')).toEqual(
      {name: 'orange', price: 1.09}
    );
  });
});

describe("GET /items/chips", function() {
  test("Gets information about chips", async function() {
    const resp = await request(app).get(`/items/chips`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {name: 'chips', price: 1.49}
    );
  });
});

describe("PATCH /items/chips", function() {
  test("edits chips", async function() {
    const resp = await request(app).patch(`/items/chips`).send(
      {name: 'potato chips', price: 1.29}
    );
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {updated: {name: 'potato chips', price: 1.29}},
    );
    expect(items.find(item => item.name === 'potato chips')).toEqual(
      {name: 'potato chips', price: 1.29}
    );
  });
});

describe("DELETE /items/pizza", function() {
  test("Deletes pizza", async function() {
    const resp = await request(app).delete(`/items/pizza`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {message: "Deleted"}
    );
    expect(items.length).toBe(3);
  });
});