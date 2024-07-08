import * as mysql from "mysql2/promise";
import pool from "../../mysql";

// Create a connection pool

type Post = {
  id_line: string;
  nama_line: string;
  status_line: string;
};

export const getPosts = async (): Promise<Post[]> => {
  const [rows] = await pool.query("SELECT * FROM line");
  return rows as Post[];
};

export const getPostsStatus = async (): Promise<Post[]> => {
  const [rows] = await pool.query("SELECT * FROM line WHERE line.status_line = 'Return'");
  return rows as Post[];
};

export const addPost = async (post: Post): Promise<void> => {
    const { id_line, nama_line, status_line } = post;
    await pool.query('INSERT INTO line (id_line, nama_line, status_line) VALUES (?, ?, ?)', [id_line, nama_line, status_line]);
};

export const deletePost = async (id: string): Promise<void> => {
  const connection = await pool.getConnection();
  try {
      await connection.beginTransaction();

      // * Updaate data mesin jadi null di id_line karena line nya mau dihapus
      // await connection.query('UPDATE mesin SET id_line = NULL WHERE id_line = ?', [id]);
      await connection.query('DELETE FROM mesin WHERE id_line = ?', [id]);

      await connection.query('DELETE FROM usage_part WHERE id_line = ?', [id]);

      // * Hapus data di tabel line
      await connection.query('DELETE FROM line WHERE id_line = ?', [id]);
      
      await connection.commit();
  } catch (error) {
      await connection.rollback();
      throw error;
  } finally {
      connection.release();
  }
};

export const updatePost = async (
  id_line: string, 
  nama_line: string, 
  status_line: string
): 
Promise<void> => {
    const [result] = await pool.query('UPDATE line SET nama_line = ?, status_line = ? WHERE id_line = ?', 
    [id_line, nama_line, status_line]);
    const updateResult = result as mysql.ResultSetHeader;
    if (updateResult.affectedRows === 0) {
        throw new Error('No Post Found');
    }
};

export const getById = async (id: string): Promise<Post | null> => {
    const [rows] = await pool.query('SELECT * FROM line WHERE id_line = ?', [id]);
    const posts = rows as Post[];
    return posts[0] || null;
};
