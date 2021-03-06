const { getConnection } = require("../config/db");

exports.create_customer = (user_data) =>
  new Promise((resolve, reject) =>
    getConnection((err, connection) => {
      if (err) reject(err);
      connection.query(
        `INSERT INTO users (email, name, id, address, phone) VALUES (?, ?, ?, ?, ?)`,
        user_data,
        (error, response) => {
          connection.release();
          if (error) reject(error);
          resolve(response);
        }
      );
    })
  );

exports.get_user_by_email = (email) =>
  new Promise((resolve, reject) =>
    getConnection((err, connection) => {
      if (err) reject(err);
      connection.query(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (error, userData) => {
          connection.release();
          if (error) reject(error);
          let user = Object.assign({}, userData[0]);
          resolve(user);
        }
      );
    })
  );
