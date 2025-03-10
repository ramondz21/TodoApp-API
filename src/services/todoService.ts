import pool from "../config/database";

export const getPaginatedTodos = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const query = {
    text: "SELECT * FROM todos LIMIT $1 OFFSET $2",
    values: [limit, offset],
  };
  const countQuery = await pool.query("SELECT COUNT(*) FROM todos");

  const [result, countResult] = await Promise.all([
    pool.query(query),
    countQuery,
  ]);

  const totalItems = parseInt(countResult.rows[0].count);
  const totalPages = Math.ceil(totalItems / limit);

  return {
    todos: result.rows,
    totalItems,
    totalPages,
  };
};