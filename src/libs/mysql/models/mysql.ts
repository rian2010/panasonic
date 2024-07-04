import mysql from "mysql2/promise";
import pool from "../../mysql";

// Create a connection pool

type Post = {
    model_id: string;
    model_name: string;
    process_id: string;
};


export const getById = async (id: string): Promise<Post | null> => {
    const [rows] = await pool.query("SELECT * FROM models WHERE model_id = ?", [
      id,
    ]);
    const posts = rows as Post[];
    return posts[0] || null;
  };

export const addPost = async (post: Post): Promise<void> => {
    const { model_name, process_id } = post;
    await pool.query(
      "INSERT INTO models (model_name, process_id) VALUES (?, ?)",
      [ model_name, process_id]
    );
  };


export const updatePost = async (
    model_id: string,
    model_name: string,
    process_id: string,
  ): Promise<void> => {
    const [result] = await pool.query(
      "UPDATE models SET model_name = ?, process_id = ? WHERE model_id = ?",
      [model_id, model_name, process_id]
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
              
        // * Hapus data di tabel models
        await connection.query('DELETE FROM models WHERE model_id = ?', [id]);
        
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
  };