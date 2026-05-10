const db = require("../config/db");

const createPost = (
    title,
    content,
    user_id,
    callback
) => {

    const sql =
        "INSERT INTO posts(title,content,user_id) VALUES(?,?,?)";

    db.query(
        sql,
        [title, content, user_id],
        callback
    );
};
const getAllPosts = (callback) => {

    const sql = `
      SELECT posts.*,
      users.username

      FROM posts

      JOIN users
      ON posts.user_id = users.id

      ORDER BY posts.created_at DESC
   `;

    db.query(sql, callback);
};
const getPostById = (id, callback) => {

    const sql = `
      SELECT posts.*,
      users.username

      FROM posts

      JOIN users
      ON posts.user_id = users.id

      WHERE posts.id = ?
   `;

    db.query(sql, [id], callback);
};
const updatePost = (
    id,
    title,
    content,
    callback
) => {

    const sql = `
      UPDATE posts
      SET title = ?,
      content = ?

      WHERE id = ?
   `;

    db.query(
        sql,
        [title, content, id],
        callback
    );
};
const deletePost = (id, callback) => {

    const sql =
        "DELETE FROM posts WHERE id=?";

    db.query(sql, [id], callback);
};
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};