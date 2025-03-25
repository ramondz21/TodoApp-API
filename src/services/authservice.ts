import pool from "../config/database";
import { hashPassword, comparePassword } from "../utils/password";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt";
import { InvariantError } from "../exceptions/invariantError";

export const registerUser = async (username: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  const query = {
    text: "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    values: [username, hashedPassword],
  };

  const result = await pool.query(query);
  if (!result.rows[0]) throw new InvariantError("Gagal register user");
  return result.rows[0];
};

export const loginUser = async (username: string, password: string) => {
  const query = {
    text: "SELECT * FROM users WHERE username = $1",
    values: [username],
  };

  const result = await pool.query(query);
  const user = result.rows[0];
  if (!user || !(await comparePassword(password, user.password))) {
    throw new InvariantError("Username atau password salah");
  }

  const accessToken = generateAccessToken({
    id: user.id,
    username: user.username,
  });
  const refreshToken = generateRefreshToken({
    id: user.id,
    username: user.username,
  });
  await storeRefreshToken(refreshToken, user.id);
  return { accessToken, refreshToken };
};

export const storeRefreshToken = async (token: string, userId: number) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const query = {
    text: "INSERT INTO refresh_tokens(token, userId, expiresAt) VALUES ($1, $2, $3)",
    values: [token, userId, expiresAt],
  };

  await pool.query(query);
};

//Check token at DB, if valid give new access token
export const verifyRefreshToken = async (token: string) => {
  const query = {
    text: "SELECT * FROM refresh_tokens WHERE token = $1 AND expiresAt > NOW()",
    values: [token],
  };

  const result = await pool.query(query);
  if (!result.rows[0])
    throw new InvariantError("Refresh token invalid atau expired");
  const userData = verifyToken(token, process.env.REFRESH_TOKEN_SECRET!);
  return generateAccessToken({ id: userData.id, username: userData.username });
};

//Delete token after logout
export const deleteRefreshToken = async (token: string) => {
  const query = {
    text: "DELETE FROM refresh_tokens WHERE token = $1",
    values: [token],
  };
  const result = await pool.query(query);
  if (!result.rowCount)
    throw new InvariantError("Refresh token tidak ditemukan");
};
