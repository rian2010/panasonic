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

export const getAuth = async (username: string, password: string): Promise<User | null> => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (rows.length === 0) {
    return null; // User not found
  }

  const user = rows[0] as User;

  // Compare hashed password with entered password using bcrypt
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    return user; // Passwords match, return user object
  } else {
    return null; // Passwords do not match
  }
};

export const addUser = async (post: User): Promise<void> => {
  const { employeeid, username, password, role } = post;
  await pool.query(
    "INSERT INTO users (employeeid, username, password, role) VALUES (?, ?, ?, ?)",
    [employeeid, username, password, role]
  );
};

