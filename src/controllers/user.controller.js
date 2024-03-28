const db = require("../db/dbConnection");
const { changeStringToDate } = require("../utils/dateUtil");

const { handleError, handleSuccess } = require("../utils/response");

class UserController {
  createUser = async (req, res) => {
    const {
      user_id,
      full_name,
      address,
      dob,
      gender,
      email,
      phone_number,
      identification_id,
      identification_id_date,
    } = req.body;

    if (
      !user_id ||
      !full_name ||
      !address ||
      !dob ||
      !gender ||
      !phone_number ||
      !identification_id ||
      !identification_id_date
    ) {
      return handleError(res, "Missing required fields", 400);
    }

    var user = await db.query("SELECT * FROM users WHERE user_id = $1", [
      req.body.user_id,
    ]);
    if (user.rows.length > 0) {
      return handleError(res, "User has already existed", 409);
    }

    user = await db.query("SELECT * FROM users WHERE phone_number = $1", [
      req.body.phone_number,
    ]);
    if (user.rows.length > 0) {
      return handleError(
        res,
        "User with this phone number already exists",
        409
      );
    }

    const dobDate = changeStringToDate(req.body.dob);
    const identificationIdDate = changeStringToDate(
      req.body.identification_id_date
    );
    db.query(
      "INSERT INTO users (user_id, full_name, address, dob, gender, email, phone_number, identification_id, identification_id_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        user_id,
        full_name,
        address,
        dobDate,
        gender,
        email,
        phone_number,
        identification_id,
        identificationIdDate,
      ]
    );

    return handleSuccess(res, null, "User was created successfully");
  };

  getById = async (req, res) => {
    const userId = req.params.user_id;

    if (!userId) {
      return handleError(res, "Missing required user_id", 400);
    }

    try {
      const user = await db.query("SELECT * FROM users WHERE user_id = $1", [
        userId,
      ]);
      if (user.rows.length === 0) {
        return handleError(res, "User Not Found", 404);
      }

      return handleSuccess(res, user.rows[0], "User retrieved successfully");
    } catch (error) {
      return handleError(res, "Failed to retrieve user", 500);
    }
  };

  getByPhoneNumber = async (req, res) => {
    const phoneNumber = req.params.phone_number;

    if (!phoneNumber) {
      return handleError(res, "Missing required phone_number", 400);
    }

    try {
      const user = await db.query(
        "SELECT * FROM users WHERE phone_number = $1",
        [phoneNumber]
      );
      if (user.rows.length === 0) {
        return handleError(res, "User Not Found", 404);
      }

      return handleSuccess(res, user.rows[0], "User retrieved successfully");
    } catch (error) {
      return handleError(res, "Failed to retrieve user", 500);
    }
  };
}

module.exports = new UserController();
