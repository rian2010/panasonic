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
    id_mesin: string;
    id_line: string;
    nama_mesin: string;
};

export const getPosts = async (): Promise<Post[]> => {
    const [rows] = await pool.query('SELECT m.id_mesin, m.nama_mesin, l.id_line, l.nama_line, s.id_suhu, s.suhu, s.status, s.time FROM mesin m LEFT JOIN line l ON l.id_line = m.id_line LEFT JOIN suhu_mesin s ON s.id_mesin = m.id_mesin AND s.time = (SELECT MAX(time) FROM suhu_mesin WHERE id_mesin = m.id_mesin) WHERE l.nama_line IS NOT NULL ORDER BY CASE WHEN s.status = "Unsafe" THEN 1 WHEN s.status = "Medium" THEN 2 WHEN s.status = "Safe" THEN 3 ELSE 4 END');
    return rows as Post[];
};

export const addPost = async (post: Post): Promise<void> => {
    const { id_mesin, id_line, nama_mesin } = post;
    await pool.query('INSERT INTO mesin (id_mesin, id_line, nama_mesin) VALUES (?, ?, ?)', [id_mesin, id_line, nama_mesin]);
};

export const deletePost = async (id: string): Promise<void> => {
    await pool.query('DELETE FROM mesin WHERE id_mesin = ?', [id]);
};

export const updatePost = async (id_mesin: string, id_line: string, nama_mesin: string): Promise<void> => {
    const [result] = await pool.query('UPDATE mesin SET id_line = ?, nama_mesin = ? WHERE id_mesin = ?', [id_mesin, id_line, nama_mesin]);
    const updateResult = result as mysql.ResultSetHeader;
    if (updateResult.affectedRows === 0) {
        throw new Error('No Post Found');
    }
};

export const getById = async (id: string): Promise<Post | null> => {
    const [rows] = await pool.query('SELECT * FROM mesin WHERE id_mesin = ?', [id]);
    const posts = rows as Post[];
    return posts[0] || null;
};
