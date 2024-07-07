import mysql from "mysql2/promise";
import pool from "../../mysql";
import bcrypt from "bcrypt";

type User = {
  id: string;
  employeeid: string;
  username: string;
  password: string;
  role: string;
};

export const getAuth = async (
  username: string,
  password: string
): Promise<User | null> => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
  if (rows.length > 0) {
    console.log(rows[0]);
    return rows[0] as User[];
  } else {
    return null;
  }
};

export const addUser = async (post: User): Promise<void> => {
  const { id, employeeid, username, password, role } = post;
  await pool.query(
    "INSERT INTO users (id, employeeid, username, password, role) VALUES (?, ?, ?, ?, ?)",
    [id, employeeid, username, password, role]
  );
};
