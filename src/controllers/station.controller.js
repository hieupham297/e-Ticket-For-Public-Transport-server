const db = require("../db/dbConnection");
const { handleSuccess, handleError } = require("../utils/response");

class StationController {
  getAll = async (req, res) => {
    try {
      const stationList = await db.query("SELECT * FROM stations");
      return handleSuccess(res, stationList.rows, "Successful");
    } catch (error) {
      console.log(error);
      return handleError(res, "Something went wrong!", 400);
    }
  };

  getByCode = async (req, res) => {
    try {
      const station_code = req.params.station_code;
      const station = await db.query(
        "SELECT * FROM stations WHERE station_code = $1",
        [station_code]
      );
      if (station.rows.length == 0) {
        return handleError(res, "Station Not Found!", 400);
      }
      return handleSuccess(res, station.rows[0], "Successful");
    } catch (error) {
      console.log(error);
      return handleError(res, "Something went wrong!", 400);
    }
  };
}

module.exports = new StationController();
