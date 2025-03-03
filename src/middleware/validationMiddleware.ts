import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

//Validation with Yup
const todoSchema = Yup.object().shape({
  task: Yup.string().required("Task is required"),
  completed: Yup.boolean().default(false),
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
      message: err.message
    });
  }
};
