const ParkingLot = require('../main/ParkingLot');
class ParkingAttendent {

    constructor() {
        this.parkingLot = new ParkingLot(); 
    }

    parkTheCar(car) {
    let isParked = this.parkingLot.carParked(car);
    return isParked;
    }
}

module.exports = new ParkingAttendent;