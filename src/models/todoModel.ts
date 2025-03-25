import pool from "../config/database";

export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface RefreshToken {
  token: string;
  userId: number;
  expiresAt: Date;
}

export async function createTable() {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS todos ( id SERIAL PRIMARY KEY, task VARCHAR(255) NOT NULL, completed BOOLEAN DEFAULT FALSE) "
  );
}

export async function createTableUsers() {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);
}

export async function createTableRefreshTokens() {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        token VARCHAR(255) PRIMARY KEY,
        userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
        expiresAt TIMESTAMP NOT NULL
      )
    `);
}

//Call all when app start
export async function initTables() {
  await Promise.all([
    createTable(),
    createTableUsers(),
    createTableRefreshTokens(),
  ]);
}
