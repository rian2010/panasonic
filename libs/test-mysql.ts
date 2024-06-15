import mysql from 'mysql2/promise';

// Configure the database connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    waitForConnections: true,
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

type Post = {
    id: string;
    title: string;
    desc: string;
    date: Date;
};

export const getPosts = async (): Promise<Post[]> => {
    const [rows] = await pool.query('SELECT * FROM posts');
    return rows as Post[];
};

export const addPost = async (post: Post): Promise<void> => {
    const { id, title, desc, date } = post;
    await pool.query('INSERT INTO posts (id, title, description, date) VALUES (?, ?, ?, ?)', [id, title, desc, date]);
};

export const deletePost = async (id: string): Promise<void> => {
    await pool.query('DELETE FROM posts WHERE id = ?', [id]);
};

export const updatePost = async (id: string, title: string, desc: string): Promise<void> => {
    const [result] = await pool.query('UPDATE posts SET title = ?, description = ? WHERE id = ?', [title, desc, id]);
    const updateResult = result as mysql.ResultSetHeader;
    if (updateResult.affectedRows === 0) {
        throw new Error('No Post Found');
    }
};

export const getById = async (id: string): Promise<Post | null> => {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    const posts = rows as Post[];
    return posts[0] || null;
};
