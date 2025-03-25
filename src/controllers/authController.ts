import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  verifyRefreshToken,
  deleteRefreshToken,
} from "../services/authservice";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await registerUser(username, password);
    res.status(201).json({
      status: "success",
      message: "User berhasil registered",
      data: user,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const tokens = await loginUser(username, password);
    res.status(200).json({
      status: "success",
      message: "Login berhasil",
      data: tokens,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: (error as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await verifyRefreshToken(refreshToken);
    res.status(200).json({
      status: "success",
      message: "Token refreshed",
      data: { accessToken },
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: (error as Error).message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    await deleteRefreshToken(refreshToken);
    res.status(200).json({ status: "success", message: "Logout berhasil" });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: (error as Error).message });
  }
};
