const db = require("../db/dbConnection");
const { buildConditionGet } = require("../utils/common");

class VehicleModel {
  // Find all vehicles if there is no params
  find = async (params = {}) => {
    let sql = `SELECT * FROM vehicles`;

    if (!Object.keys(params).length) {
      return await db.query(sql);
    }

    const { conditions, values } = buildConditionGet(params);
    sql += `WHERE ${conditions}`;

    return await db.query(sql, [...values]);
  };

  // Find one vehicle with conditions
  findOne = async (params) => {
    const { conditions, values } = buildConditionGet(params);

    let sql = `SELECT * FROM vehicles WHERE ${conditions} LIMIT 1`;

    const result = await db.query(sql, [...values]);

    // return the first row
    return result[0];
  };
}

module.exports = new VehicleModel();
