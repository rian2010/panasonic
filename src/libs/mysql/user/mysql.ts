import mysql from "mysql2/promise";
import pool from "../../mysql";

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
    return rows[0] as User[];
  } else {
    return null;
  }
};
