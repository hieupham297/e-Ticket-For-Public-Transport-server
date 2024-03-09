exports.buildConditionGet = (object) => {
  if (typeof object !== "object") {
    throw new Error("Invalid input");
  }

  const keys = Object.keys(object);
  const values = Object.values(object);

  conditions = keys.map((key) => `${key} = ?`).join(" AND ");

  return { conditions, values };
};

exports.buildConditionInsert = (table, data) => {
  if (typeof data !== "object") {
    throw new Error("Invalid input");
  }

  const keys = Object.keys(data);
  const values = Object.values(data);

  for (let i = 0; i < values.length; i++) {
    if (values[i] == null) {
      values[i] = "";
    }
  }

  const columnSet = keys.map((key) => `${key}`).join(", ");
  const placeholders = keys.map((key) => "?").join(", ");

  const sql = `INSERT INTO ${table} (${columnSet}) VALUES (${placeholders})`;

  return { sql, values };
};

exports.buildConditionUpdate = (object) => {
  if (typeof object !== "object") {
    throw new Error("Invalid input");
  }

  const keys = Object.keys(object);
  const values = Object.values(object);

  conditions = keys.map((key) => `${key} = ?`).join(", ");

  return { conditions, values };
};
