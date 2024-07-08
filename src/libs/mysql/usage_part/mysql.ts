import mysql from "mysql2/promise";
import pool from "../../mysql";
import moment from 'moment-timezone';

// Create a connection pool

type Post = {
    id_usage: string;
    part_id: string;
    id_line: string;
    status_usage: string;
    start_date: string;
    end_date: string;
};

export const getById = async (id: string): Promise<Post | null> => {
  const [rows] = await pool.query("SELECT * FROM usage_part WHERE id_usage = ?", [
    id,
  ]);
  const posts = rows as Post[];
  return posts[0] || null;
};

export const getByIdCompleted = async (id: string): Promise<Post[]> => {
  const [rows] = await pool.query("SELECT usage_part.id_usage, parts.part_name, parts.size, parts.location, usage_part.status_usage, parts.status_part FROM usage_part LEFT JOIN parts ON usage_part.part_id = parts.part_id LEFT JOIN models ON parts.model_id = models.model_id WHERE usage_part.status_usage = 'Completed' AND models.model_id = ? ", [id]);
  return rows as Post[];
};

export const getByIdOrdered = async (id: string): Promise<Post[]> => {
  const [rows] = await pool.query("SELECT usage_part.id_usage, parts.part_name, parts.size, parts.location, usage_part.status_usage, parts.status_part FROM usage_part LEFT JOIN parts ON usage_part.part_id = parts.part_id LEFT JOIN models ON parts.model_id = models.model_id WHERE usage_part.status_usage = 'Ordered' AND models.model_id = ? ", [id]);
  return rows as Post[];
};

export const getByIdUncompleted = async (id: string): Promise<Post[]> => {
  const [rows] = await pool.query("SELECT usage_part.id_usage, parts.part_id, parts.part_name, parts.size, parts.location, usage_part.status_usage, parts.status_part FROM usage_part LEFT JOIN parts ON usage_part.part_id = parts.part_id LEFT JOIN models ON parts.model_id = models.model_id WHERE usage_part.status_usage = 'Uncompleted' AND models.model_id = ? ", [id]);
  return rows as Post[];
};

export const addPost = async (post: Post): Promise<void> => {
    const { id_usage, part_id, id_line, status_usage, start_date, end_date } = post;
    await pool.query(
      "INSERT INTO usage_part (id_usage, part_id, id_line, status_usage, start_date, end_date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?)",
      [id_usage, part_id, id_line, status_usage, start_date, end_date]
    );
  };

export const updatePost = async (
  id_usage: string,
  status_usage: string,
): Promise<void> => {
  const currentDate = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
  const [result] = await pool.query(
    "UPDATE usage_part SET status_usage = ?, end_date = ? WHERE id_usage = ?",
    [id_usage, currentDate, status_usage]
  );
  const updateResult = result as mysql.ResultSetHeader;
  if (updateResult.affectedRows === 0) {
    throw new Error("No Post Found");
  }
};
  

export const deletePost = async (id: string): Promise<void> => {
  const connection = await pool.getConnection();
  try {
      await connection.beginTransaction();
            
      // * Hapus data di tabel usage_part
      await connection.query('DELETE FROM usage_part WHERE id_usage = ?', [id]);
      
      await connection.commit();
  } catch (error) {
      await connection.rollback();
      throw error;
  } finally {
      connection.release();
  }
};