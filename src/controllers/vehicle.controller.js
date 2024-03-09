const VehicleModel = require("../models/vehicle.model");

class VehicleController {
  getAll = async (req, res) => {
    let vehicleList = await VehicleModel.find();

    return res.send(vehicleList);
  };
}

module.exports = new VehicleController();
