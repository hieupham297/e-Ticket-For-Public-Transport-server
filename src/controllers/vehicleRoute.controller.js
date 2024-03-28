const db = require("../db/dbConnection");
const { handleError, handleSuccess } = require("../utils/response");

class VehicleRouteController {
  getAllBusRoute = async (req, res) => {
    try {
      const user_id = req.params.user_id;
      // Lấy tất cả tuyến xe buýt
      const busRouteList = await db.query(
        `SELECT vehicle_routes.*,
              CASE
                  WHEN EXISTS (SELECT * FROM wishlist
                               WHERE wishlist.vehicle_route_code = vehicle_routes.vehicle_route_code
                               AND wishlist.user_id = $1)
                  THEN TRUE
                  ELSE FALSE
              END AS is_favorite
          FROM vehicle_routes
          WHERE vehicle_type = 'bus'`,
        [user_id]
      );
      return handleSuccess(res, busRouteList.rows, "Successful!");
    } catch (error) {
      console.log(error);
      return handleError(res, "Something went wrong!", 400);
    }
  };

  getAllMetroRoute = async (req, res) => {
    try {
      const user_id = req.params.user_id;
      // Lấy tất cả tuyến metro
      const metroRouteList = await db.query(
        `SELECT vehicle_routes.*,
              CASE
                  WHEN EXISTS (SELECT * FROM wishlist
                               WHERE wishlist.vehicle_route_code = vehicle_routes.vehicle_route_code
                               AND wishlist.user_id = $1)
                  THEN TRUE
                  ELSE FALSE
              END AS is_favorite
          FROM vehicle_routes
          WHERE vehicle_type = 'metro'`,
        [user_id]
      );
      return handleSuccess(res, metroRouteList.rows, "Successful!");
    } catch (error) {
      console.log(error);
      return handleError(res, "Something went wrong!", 400);
    }
  };
}

module.exports = new VehicleRouteController();
