const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/data/todos.mock", () => ({
  todos: [
    { id: 1, title: "Learn Node.js", done: false },
    { id: 2, title: "Write automated tests", done: false }
  ]
}));

describe("TODOS API", () => {

  test("GET /todos returns array", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /todos/:id returns todo", async () => {
    const res = await request(app).get("/todos/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Learn Node.js");
  });

  test("GET /todos/:id returns 404 for unknown id", async () => {
    const res = await request(app).get("/todos/99");
    expect(res.statusCode).toBe(404);
  });

  let createdTodoID;
  test("POST /todos creates a todo", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "New Task" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("New Task");
    createdTodoID = res.body.id;
  });
  test("GET /todos/${createdTodoID} check the created todo exists", async () => {
    const res = await request(app).get(`/todos/${createdTodoID}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("New Task");
  });

  test("POST /todos returns 400 if missing title", async () => {
    const res = await request(app)
      .post("/todos")
      .send({});

    expect(res.statusCode).toBe(400);
  });

  test("PUT /todos/:id updates a todo", async () => {
    const res = await request(app)
      .put("/todos/1")
      .send({ done: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(true);
  });

  test("DELETE /todos/1 removes a todo", async () => {
    const res = await request(app).delete("/todos/1");
    expect(res.statusCode).toBe(204);
  });
  test("GET /todos/1 check todo is removed", async () => {
    const res = await request(app).get("/todos/1");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Todo not found");
  });

});