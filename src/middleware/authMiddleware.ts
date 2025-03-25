import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import "../types/index";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid atau expired token" });
    return;
  }
};