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

export const getPosts = async (): Promise<Post[]> => {
  const [rows] = await pool.query(
    'SELECT * FROM parts'
  );
  return rows as Post[];
};

export const addPost = async (post: Post): Promise<void> => {
  const { part_id, part_name, model_id, size, status_part } = post;
  await pool.query(
    "INSERT INTO usage_part (part_id, part_name, model_id, size, status_part) VALUES (?, ?, ?, ?, ?)",
    [part_id, part_name, model_id, size, status_part]
  );
};

export const deletePost = async (id: string): Promise<void> => {
  const connection = await pool.getConnection();
  try {
      await connection.beginTransaction();

      // * Hapus data di tabel usage_part
      await connection.query('DELETE FROM usage_part WHERE part_id = ?', [id]);
            
      // * Hapus data di tabel part
      await connection.query('DELETE FROM parts WHERE part_id = ?', [id]);
      
      await connection.commit();
  } catch (error) {
      await connection.rollback();
      throw error;
  } finally {
      connection.release();
  }
};

export const updatePost = async (
  part_id: string,
  part_name: string,
  model_id: string,
  size: string,
  status_part: string,
): Promise<void> => {
  const [result] = await pool.query(
    "UPDATE parts SET part_name = ?, model_id = ?, size = ?, status_part = ? WHERE part_id = ?",
    [part_id, part_name, model_id, size, status_part]
  );
  const updateResult = result as mysql.ResultSetHeader;
  if (updateResult.affectedRows === 0) {
    throw new Error("No Post Found");
  }
};

// * ini menampilkan data part dengan status available tanpa duplikasi sesuai id
export const getById = async (id: string): Promise<Post[]> => {
  const [rows] = await pool.query("SELECT MIN(part_id) AS part_id, model_id, part_name, size, status_part FROM parts WHERE parts.model_id = ? AND parts.status_part = 'Available' GROUP BY parts.part_name, parts.size, parts.status_part ", [id]);
  return rows as Post[];
};

// * ini menampilkan data part dengan status ordered tanpa duplikasi sesuai id
export const getByIdOrdered = async (id: string): Promise<Post[]> => {
  const [rows] = await pool.query("SELECT MIN(part_id) AS part_id, model_id, part_name, size, status_part FROM parts WHERE parts.model_id = ? AND parts.status_part = 'Ordered' GROUP BY parts.part_name, parts.size, parts.status_part ", [id]);
  return rows as Post[];
};

// ! kode ini tidak/belum digunakan
export const getByIdAvailable = async (id: string): Promise<Post[]> => {
  const [rows] = await pool.query("SELECT DISTINCT parts.part_name, parts.size FROM parts WHERE parts.model_id = ?", [id]);
  return rows as Post[];
};

// const [rows] = await pool.query("SELECT DISTINCT parts.part_name, parts.size FROM parts WHERE parts.model_id = ?", [id]);

// export const getByIdAvailable = async (id: string): Promise<Post[]> => {
//   const [rows] = await pool.query("SELECT parts.part_name, parts.size, process_qty_part.quantity FROM process_qty_part JOIN parts ON process_qty_part.part_id = parts.part_id WHERE parts.model_id = ?", [id]);
//   return rows as Post[];
// };
