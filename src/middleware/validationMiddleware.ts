import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

//Validation with Yup
const todoSchema = Yup.object().shape({
  task: Yup.string().required("Task is required"),
  completed: Yup.boolean().default(false),
});

const authSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password is required"),
});

export const validateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Validation data from req.body
    await todoSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const err = error as unknown as Error;
    res.status(400).json({
      message: err.message,
    });
  }
};

export const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
