import mysql from "mysql2/promise";
import pool from "../../mysql";

// Create a connection pool

type Post = {
    id_usage: string;
    part_id: string;
    id_line: string;
    status_usage: string;
    start_date: string;
    end_date: string;
};

export const addPost = async (post: Post): Promise<void> => {
    const { id_usage, part_id, id_line, status_usage, start_date, end_date } = post;
    await pool.query(
      "INSERT INTO usage_part (id_usage, part_id, id_line, status_usage, start_date, end_date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?)",
      [id_usage, part_id, id_line, status_usage, start_date, end_date]
    );
  };