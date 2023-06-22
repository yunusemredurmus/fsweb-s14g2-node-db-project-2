const carModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const isExistCar = await carModel.getById(req.params.id);
    if (!isExistCar) {
      res
        .status(404)
        .json({ message: `${req.params.id} kimliğine sahip araba bulunamadı` });
    } else {
      req.existCar = isExistCar;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  try {
    const allRequiredFields = ["vin", "make", "model", "mileage"]; //zorunlu alanlar
    const missingFields = [];

    for (let i = 0; i < allRequiredFields.length; i++) {
      const item = allRequiredFields[i];
      if (!req.body[item]) {
        missingFields.push(item);
      }
    }

    if (missingFields.length > 0) {
      res
        .status(400)
        .json({
          message: `${missingFields.toString()} ${
            missingFields.length == 1 ? "is" : "are"
          } missing`,
        });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberValid = (req, res, next) => {
  // HOKUS POKUS
  try {
    let isValidVin = vinValidator.validate(req.body.vin);
    if (!isValidVin) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try {
    let isExistVin = await carModel.getByVin(req.body.vin);
    if (isExistVin) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
