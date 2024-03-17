const db = require("../db/dbConnection");
const { handleError, handleSuccess } = require("../utils/response");

class AdvertisementController {
  getAllAds = async (req, res) => {
    try {
      const adsList = await db.query("SELECT * FROM advertisements");
      return handleSuccess(res, adsList.rows, "Successful");
    } catch (error) {
      console.log(error);
      return handleError(res, "Something went wrong!", 400);
    }
  };
}

module.exports = new AdvertisementController();
