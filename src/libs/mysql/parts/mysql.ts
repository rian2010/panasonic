import mysql from "mysql2/promise";
import pool from "../../mysql";

// Create a connection pool

type Post = {
  part_id: string;
  part_name: string;
  model_id: string;
  size: string;
  status_part: string;
};

// export const getPosts = async (): Promise<Post[]> => {
//   const [rows] = await pool.query(
//     'SELECT m.id_mesin, m.nama_mesin, l.id_line, l.nama_line, s.id_suhu, s.suhu, s.status, s.time FROM mesin m LEFT JOIN line l ON l.id_line = m.id_line LEFT JOIN suhu_mesin s ON s.id_mesin = m.id_mesin AND s.time = (SELECT MAX(time) FROM suhu_mesin WHERE id_mesin = m.id_mesin) WHERE l.nama_line IS NOT NULL ORDER BY CASE WHEN s.status = "Unsafe" THEN 1 WHEN s.status = "Medium" THEN 2 WHEN s.status = "Safe" THEN 3 ELSE 4 END'
//   );
//   return rows as Post[];
// };

// export const addPost = async (post: Post): Promise<void> => {
//   const { id_usage, part_id, id_line, status_usage, start_date, end_date } = post;
//   await pool.query(
//     "INSERT INTO usage_part (id_usage, part_id, id_line, status_usage, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)",
//     [id_usage, part_id, id_line, status_usage, start_date, end_date]
//   );
// };

// export const deletePost = async (id: string): Promise<void> => {
//   await pool.query("DELETE FROM mesin WHERE id_mesin = ?", [id]);
// };

// export const updatePost = async (
//   id_mesin: string,
//   id_line: string,
//   nama_mesin: string
// ): Promise<void> => {
//   const [result] = await pool.query(
//     "UPDATE mesin SET id_line = ?, nama_mesin = ? WHERE id_mesin = ?",
//     [id_mesin, id_line, nama_mesin]
//   );
//   const updateResult = result as mysql.ResultSetHeader;
//   if (updateResult.affectedRows === 0) {
//     throw new Error("No Post Found");
//   }
// };

// * ini menampilkan data tanpa duplikasi sesuai id
export const getById = async (id: string): Promise<Post[]> => {
  const [rows] = await pool.query("SELECT MIN(part_id) AS part_id, model_id, part_name, size, status_part FROM parts WHERE parts.model_id = ? AND parts.status_part = 'Available' GROUP BY parts.part_name, parts.size, parts.status_part ", [id]);
  return rows as Post[];
};

export const getByIdAvailable = async (id: string): Promise<Post[]> => {
  const [rows] = await pool.query("SELECT DISTINCT parts.part_name, parts.size FROM parts WHERE parts.model_id = ?", [id]);
  return rows as Post[];
};

// const [rows] = await pool.query("SELECT DISTINCT parts.part_name, parts.size FROM parts WHERE parts.model_id = ?", [id]);

// export const getByIdAvailable = async (id: string): Promise<Post[]> => {
//   const [rows] = await pool.query("SELECT parts.part_name, parts.size, process_qty_part.quantity FROM process_qty_part JOIN parts ON process_qty_part.part_id = parts.part_id WHERE parts.model_id = ?", [id]);
//   return rows as Post[];
// };
