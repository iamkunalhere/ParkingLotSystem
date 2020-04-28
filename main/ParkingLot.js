const parkingLotOwner = require('../main/ParkingLotOwner');
class ParkingLot {
    // function to park the car
    carParked(carNumber,carName) {
        this.parkingLot = new Map();
        this.parkingLot.set(carNumber,carName);
        let parkingOwner = new parkingLotOwner();
        parkingOwner.parkingLotIsFull();
        return true;
    }
    // function to unpark the car
    carUnParked(carNumber) {
        this.parkingLot.delete(carNumber);
        return true;
    }
}

module.exports = ParkingLot;