import { pool } from "../../db";
import { NotFoundException } from "../../exception/NotFoundException";
import { UserDTO } from "../../types/user";

export const getUser = async (userId: number): Promise<UserDTO> => {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    if (rows.length === 0) {
        throw new NotFoundException('User not found');
    }
    return {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email,
    }
}