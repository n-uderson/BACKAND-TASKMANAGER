const db = require("../config/db");

exports.create = async ({ title, date, userId }) => {
  const result = await db.query(
    "INSERT INTO tasks (title, date, completed, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, date, false, userId],
  );
  return result.rows[0];
};

exports.update = async (id, userId, data) => {
  const result = await db.query(
    "UPDATE tasks SET title = $1, date = $2, completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
    [data.title, data.date, data.completed, id, userId],
  );
  return result.rows[0];
};

exports.remove = async (id, userId) => {
  const result = await db.query(
    "DELETE FROM tasks WHERE id = $1 AND user_id = $2",
    [id, userId],
  );
  return result.rowCount > 0;
};

exports.findByUser = async (userId) => {
  const result = await db.query(
    "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id",
    [userId],
  );
  return result.rows;
};
