const db = require("../db/dbConnection");
const { changeStringToDate } = require("../utils/dateUtil");

const {
  handleError,
  handleSuccess,
  errorSystem,
} = require("../utils/response");

class UserController {
  createUser = async (req, res) => {
    const {
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

    var user = await db.query(
      "SELECT * FROM users WHERE identification_id = $1",
      [req.body.identification_id]
    );
    if (user.length > 0) {
      return handleError(
        res,
        "User with this identification ID already exists",
        409
      );
    }

    user = await db.query("SELECT * FROM users WHERE phone_number = $1", [
      req.body.phone_number,
    ]);
    if (user.length > 0) {
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
      "INSERT INTO users (full_name, address, dob, gender, email, phone_number, identification_id, identification_id_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
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
  getAllUsers = () => {};
}

module.exports = new UserController();
