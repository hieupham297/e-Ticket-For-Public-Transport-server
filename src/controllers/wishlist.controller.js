const db = require("../db/dbConnection");
const { handleError, handleSuccess } = require("../utils/response");

class wishlistController {
  addNewItem = async (req, res) => {
    const { user_id, vehicle_route_code, station_code } = req.body;

    if (!user_id) {
      return handleError(res, "Missing required fields", 400);
    }

    // Add new station to wishlist
    if (user_id && station_code) {
      // Find existed favorite station_code
      const existedStationCode = await db.query(
        "SELECT id FROM wishlist WHERE user_id = $1 AND station_code = $2",
        [user_id, station_code]
      );
      if (existedStationCode.rows.length > 0) {
        return handleError(
          res,
          "This station is already existed in wishlist!",
          404
        );
      }

      // If not existed, add new station to table wishlist
      await db.query(
        "INSERT INTO wishlist (user_id, station_code) VALUES ($1, $2)",
        [user_id, station_code]
      );
      return handleSuccess(res, null, "Add new item to wishlist successfully!");
    }
    // Add new routes to wishlist
    else if (user_id && vehicle_route_code) {
      // Find existed favorite vehicle route
      const existedRoute = await db.query(
        "SELECT id FROM wishlist WHERE user_id = $1 AND vehicle_route_code = $2",
        [user_id, vehicle_route_code]
      );

      if (existedRoute.rows.length > 0) {
        return handleError(
          res,
          "This route is already existed in wishlist!",
          404
        );
      }
      // If not existed, add new route to table wishlist
      await db.query(
        "INSERT INTO wishlist (user_id, vehicle_route_code) VALUES ($1, $2)",
        [user_id, vehicle_route_code]
      );
      return handleSuccess(
        res,
        null,
        "Add new route to wishlist successfully!"
      );
    } else {
      return handleError(res, "Something went wrong!", 404);
    }
  };

  removeItem = async (req, res) => {
    const { user_id, vehicle_route_code, station_code } = req.body;

    if (!user_id) {
      return handleError(res, "Missing required fields!", 404);
    }
    // Remove routes in wishlist
    if (user_id && vehicle_route_code) {
      // Find existed route in wishlist
      const existedRoute = await db.query(
        "SELECT id FROM wishlist WHERE user_id = $1 AND vehicle_route_code = $2",
        [user_id, vehicle_route_code]
      );
      if (existedRoute.rows.length == 0) {
        return handleError(res, "Route not found in wishlist!", 404);
      }
      await db.query("DELETE FROM wishlist WHERE id = $1", [
        existedRoute.rows[0].id,
      ]);
      return handleSuccess(res, null, "Remove route successfully!");
    }
    // Remove station in wishlist
    else if (user_id && station_code) {
      // Find existed station in wishlist
      const existedStation = await db.query(
        "SELECT id FROM wishlist WHERE user_id = $1 AND station_code = $2",
        [user_id, station_code]
      );
      if (existedStation.rows.length) {
        return handleError(res, "Station not found in wishlist!", 404);
      }
      await db.query("SELECT id FROM wishlist WHERE id = $1", [
        existedStation.rows[0].id,
      ]);
      return handleSuccess(res, null, "Remove station successfully!");
    }
  };
}

module.exports = new wishlistController();
