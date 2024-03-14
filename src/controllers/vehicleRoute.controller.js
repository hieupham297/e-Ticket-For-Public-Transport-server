const db = require("../db/dbConnection");
const { handleError, handleSuccess } = require("../utils/response");

class VehicleRouteController {
  getAllBusRoute = async (req, res) => {
    try {
      const busRouteList = await db.query(
        "SELECT * FROM vehicle_routes WHERE vehicle_type = 'bus'"
      );
      return handleSuccess(res, busRouteList.rows, "Successful");
    } catch (error) {
      console.log(error);
      return handleError(res, "Something went wrong!", 400);
    }
  };

  getAllMetroRoute = async (req, res) => {
    try {
      const metroRouteList = await db.query(
        "SELECT * FROM vehicle_routes WHERE vehicle_type = 'metro'"
      );
      return handleSuccess(res, metroRouteList.rows, "Successful");
    } catch (error) {
      console.log(error);
      return handleError(res, "Something went wrong!", 400);
    }
  };
}

module.exports = new VehicleRouteController();
