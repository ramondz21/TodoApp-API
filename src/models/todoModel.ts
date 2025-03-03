import pool from "../config/database";

export interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

export async function createTable() {
    await pool.query('CREATE TABLE IF NOT EXISTS todos ( id SERIAL PRIMARY KEY, task VARCHAR(255) NOT NULL, completed BOOLEAN DEFAULT FALSE) ')
}