import { Request, Response } from "express";
import pool from "../config/database";
import { getPaginatedTodos } from "../services/todoService";

export const getTodos = async (req: Request, res: Response) => {
  try {
    // Get page and limit  from query and set default value 
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { todos, totalItems, totalPages } = await getPaginatedTodos(page, limit)

    res.status(200).json({
      status: "success",
      message: "Tasks retrieved successfully",
      data: todos,
      pagination: {
        currentPage: page,
        limit: limit,
        totalItems: totalItems,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve tasks",
    });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { task, completed } = req.body;
    const query = {
      text: "INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING id",
      values: [task, completed || false], // Default completed false kalo ga ada
    };
    const result = await pool.query(query);
    const { id } = result.rows[0];
    res.status(201).json({
      status: "success",
      message: "Task is successfully added",
      data: { id, task, completed },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to add task",
    });
  }
};

export const editTodoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { task, completed } = req.body;

    const query = {
      text: "UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING id",
      values: [task, completed || false, id],
    };
    const result = await pool.query(query);
    res.status(200).json({
      status: "success",
      message: "Task is successfully edited",
      data: { id, task, completed },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to edit task",
    });
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const query = {
      text: 'DELETE FROM todos WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await pool.query(query);
    res.status(200).json({
      status: "success",
      message: "Task is successfully deleted",
      data: { id: result.rows[0].id }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete task",
    });
  }
};
