const Parking = require('../main/ParkingLot');
class ParkingAttendent {
    constructor() {
        this.parkingLot = new Parking();
    }
    parkTheCar(carNumber,carInfo) {
        return this.parkingLot.carParked(carNumber,carInfo);
    }
}

module.exports = ParkingAttendent;