const db = require("../config/db");

exports.findAll = async () => {
  const result = await db.query("SELECT * FROM tasks ORDER BY id");
  return result.rows;
};

exports.create = async ({ title }) => {
  const result = await db.query(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
    [title],
  );
  return result.rows[0];
};

exports.update = async (id, data) => {
  const result = await db.query(
    "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
    [data.title, data.completed, id],
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  const result = await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  return result.rowCount > 0;
};
