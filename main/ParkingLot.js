const parkingLotOwner = require('../main/ParkingLotOwner');
class ParkingLot {
    constructor() {
        this.counter = 0;
        this.PARKING_LOT_CAPACITY = 3;
    }
    // function to park the car
    carParked(carNumber,carName) {
        if(this.isParkingLotFull()) {
            throw new Error('parking lot is full');
        }
        this.parkingLot = new Map();
        this.parkingLot.set(carNumber,carName);
        this.counter++;
        return true;
    }
    // function to unpark the car
    carUnParked(carNumber) {
        this.parkingLot.delete(carNumber);
        this.counter--;
        return true;
    }
    // function to check parking lot is full or not
    isParkingLotFull() {
        if (this.counter == this.PARKING_LOT_CAPACITY) {
            let parkingOwner = new parkingLotOwner();
            parkingOwner.parkingLotIsFull();
            return true;
        }
        return false;
    }
}

module.exports = ParkingLot;