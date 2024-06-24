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

// //ubah dulu, sesuaikan dengan line
// export const addPost = async (post: Post): Promise<void> => {
//     const { id_mesin, id_line, nama_mesin } = post;
//     await pool.query('INSERT INTO mesin (id_mesin, id_line, nama_mesin) VALUES (?, ?, ?)', [id_mesin, id_line, nama_mesin]);
// };

// export const deletePost = async (id: string): Promise<void> => {
//     await pool.query('DELETE FROM mesin WHERE id_mesin = ?', [id]);
// };

// export const updatePost = async (id_mesin: string, id_line: string, nama_mesin: string): Promise<void> => {
//     const [result] = await pool.query('UPDATE mesin SET id_line = ?, nama_mesin = ? WHERE id_mesin = ?', [id_mesin, id_line, nama_mesin]);
//     const updateResult = result as mysql.ResultSetHeader;
//     if (updateResult.affectedRows === 0) {
//         throw new Error('No Post Found');
//     }
// };

// export const getById = async (id: string): Promise<Post | null> => {
//     const [rows] = await pool.query('SELECT * FROM mesin WHERE id_mesin = ?', [id]);
//     const posts = rows as Post[];
//     return posts[0] || null;
// };
