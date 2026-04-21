const db = require("../config/db");

exports.findAll = async () => {
  const result = await db.query("SELECT * FROM tasks ORDER BY id");
  return result.rows;
};

exports.create = async ({ title, date }) => {
  const result = await db.query(
    "INSERT INTO tasks (title, date, completed) VALUES ($1, $2, $3) RETURNING *",
    [title, date, false],
  );
  return result.rows[0];
};

exports.update = async (id, data) => {
  const result = await db.query(
    "UPDATE tasks SET title = $1, date = $2, completed = $3 WHERE id = $4 RETURNING *",
    [data.title, data.date, data.completed, id],
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  const result = await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  return result.rowCount > 0;
};
