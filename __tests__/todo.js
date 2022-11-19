/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todo Test Cases", () => {
  beforeAll(() => {
    add({
      title: "Test 1",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Add a new todo in list", () => {
    let length = all.length;
    add({
      title: "Test 2",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(length + 1);
  });

  test("Mark todo as a completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Test for overdue", () => {
    let due = overdue();
    expect(
      due.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("Test for dueToday", () => {
    let due = dueToday();
    expect(
      due.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("Test for dueLater", () => {
    let due = dueLater();
    expect(
      due.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
