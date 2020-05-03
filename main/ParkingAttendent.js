const ParkingLot = require('../main/ParkingLot');
class ParkingAttendent {

    constructor() {
        this.parkingLot = new ParkingLot(); 
    }

    parkTheCar(carNumber,carInfo,driverType) {
    let isParked = this.parkingLot.carParked(carNumber,carInfo,driverType);
    return isParked;
    }
}

module.exports = new ParkingAttendent;