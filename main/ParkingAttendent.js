const Parking = require('../main/ParkingLot');
class ParkingAttendent {
    constructor() {
        this.parkingLot = new Parking();
    }
    parkTheCar() {
        return this.parkingLot.carParked();
    }
}

module.exports = ParkingAttendent;