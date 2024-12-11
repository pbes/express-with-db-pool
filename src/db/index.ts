import { Pool } from 'pg';
import dotenv from "dotenv";

dotenv.config();

const config = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST ?? 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    max: 20, // maximum number of connections in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // how long to wait for a connection to be established
}

const initData = async (pool: Pool) => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL
            )
        `);
        console.log('Table created successfully');
        const res = await client.query(`SELECT * FROM users WHERE email = 'john.doe@example.com'`);
        if (res.rows.length === 0) {
            await client.query(`
            INSERT INTO users (name, email, password) VALUES
            ('John Doe', 'john.doe@example.com', 'password123');
            `);
        } else {
            console.log('User already exists');
        }
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        client.release();
    }
}

export const pool = new Pool({ ...config });

pool.addListener('connect', () => {
    console.log('Database connected');
    initData(pool);
});