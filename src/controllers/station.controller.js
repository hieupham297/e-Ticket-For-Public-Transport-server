const db = require("../db/dbConnection");
const { handleSuccess } = require("../utils/response");

class StationController {
  getAll = async (req, res) => {
    try {
      const stationList = await db.query("SELECT * FROM stations");
      return handleSuccess(res, stationList, "Successful");
    } catch (error) {
      console.log(error);
      return handleError(res, "Something went wrong!", 400);
    }
  };
}

module.exports = new StationController();
