const ParkingLot = require('../main/ParkingLot');
class ParkingAttendent {

    constructor() {
        this.parkingLot = new ParkingLot(); 
    }

    parkTheCar(carNumber,carInfo) {
    let isParked = this.parkingLot.carParked(carNumber,carInfo);
    return isParked;
    }
}

module.exports = new ParkingAttendent;