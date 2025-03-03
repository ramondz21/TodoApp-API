import { Request, Response } from "express";
import pool from "../config/database";

export const getTodos = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        res.status(200).json({
            status: 'success',
            message: 'Todos retrieved successfully',
            data: result.rows
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve todos'
        })
    }
}