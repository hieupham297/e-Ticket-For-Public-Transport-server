const db = require("../db/dbConnection");
const {
  buildConditionGet,
  buildConditionInsert,
  buildConditionUpdate,
} = require("../utils/common");

class UserModel {
  // Find all users if there is no params
  find = async (params = {}) => {
    let sql = `SELECT * FROM users`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { conditions, values } = buildConditionGet(params);
    sql += `WHERE ${conditions}`;

    return await db.query(sql, [...values]);
  };

  // Find one with conditions
  findOne = async (params) => {
    const { conditions, values } = buildConditionGet(params);

    let sql = `SELECT * FROM users WHERE ${conditions}`;
    console.log(sql);

    const result = await db.query(sql, [...values]);

    // return the first row
    return result[0];
  };

  /**
   * Create new users
   *
   * @param params
   * @returns the number of rows created
   */
  create = async (params) => {
    const { sql, values } = await buildConditionInsert("users", params);
    const result = await db.query(sql, [...values]);
    const affectedRows = result ? result.affectedRows : 0;
    return affectedRows;
  };

  // Update users' info by id
  update = async (params, id) => {
    const { conditions, values } = buildConditionUpdate(params);

    let sql = `UPDATE users SET ${conditions} WHERE id = ?`;
    const result = await db.query(sql, [...values, id]);

    return result;
  };

  /**
   * Delete user by id
   *
   * @param id
   * @returns the number of affected row
   */
  delete = async (id) => {
    const sql = `DELETE FROM user WHERE id = ?`;
    const result = await db.query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new UserModel();
