import { Request, Response } from "express";
import pool from "../config/database";
import { addTodoService, deleteUserByIdService, editUserByIdService, getPaginatedTodos, getUserByIdService } from "../services/todoService";

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

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const result = await getUserByIdService(id)
      res.status(200).json({
      status: "success",
      message: "Task successfully get by id",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get task",
    });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const { task, completed } = req.body;
    const newTodo = await addTodoService(task, completed)
    res.status(201).json({
      status: "success",
      message: "Task is successfully added",
      data: newTodo
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

    const newTodo = await editUserByIdService(id, task, completed)
    res.status(200).json({
      status: "success",
      message: "Task is successfully edited",
      data: newTodo
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

    const newTodo = await deleteUserByIdService(id)
    res.status(200).json({
      status: "success",
      message: "Task is successfully deleted",
      data: newTodo
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete task",
    });
  }
};
