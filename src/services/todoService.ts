import pool from "../config/database";
import { InvariantError } from "../exceptions/invariantError";

export const addTodoService = async (task: string, completed: boolean) => {
  const query = {
    text: "INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *",
    values: [task, completed]
  }
  const result = await pool.query(query)
  
  if (!result.rows[0].id){
    throw new InvariantError('Tidak dapat menambahkan Todo');
}
  
  return result.rows[0]
}

export const getAllUsersService = async () => {
  const query = {
    text: "SELECT * FROM todos",
  }
  const result = await pool.query(query)
  return result
}

export const getUserByIdService = async (id: number) => {
  const query = {
    text: "SELECT * FROM todos WHERE id = $1",
    values: [id]
  }

  const result = await pool.query(query)
  return result.rows[0]
}

export const editUserByIdService = async (id: number, task: string, completed: boolean) => {
  const query = {
    text: "UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING id",
    values: [task, completed, id]
  }

  const result = await pool.query(query)
  return result.rows[0]
}

export const deleteUserByIdService = async (id: number) => {
  const query = {
    text: "DELETE FROM todos WHERE id = $1 RETURNING id",
    values: [id]
  }
  const result = await pool.query(query)
  return result.rows[0]
}


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