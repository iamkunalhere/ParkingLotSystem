const parkingLotOwner = require('../main/ParkingLotOwner');
const airportSecurityPersonal = require('../main/AirportSecurityPersonal');
class ParkingLot {
    constructor() {
        this.parkingOwner = new parkingLotOwner();
        this.airportSecurity = new airportSecurityPersonal();
        this.parkingLot = new Map();
        this.counter = 0;
        this.PARKING_LOT_CAPACITY = 3;
    }
    // function to park the car
    carParked(carNumber,carName) {
        if(this.isParkingLotFull()) {
            throw new Error('parking lot is full');
        }
        this.parkingLot.set(carNumber,carName);
        this.counter++;
        return true;
    }
    // function to unpark the car
    carUnParked(carNumber) {
        this.parkingLot.delete(carNumber);
        this.counter--;
        if (this.counter == this.PARKING_LOT_CAPACITY-1) {
            this.parkingOwner.parkingSpaceAvailable();
        }
        return true;
    }
    // function to check parking lot is full or not
    isParkingLotFull() {
        if (this.counter == this.PARKING_LOT_CAPACITY) {
            this.parkingOwner.parkingLotIsFull();
            this.airportSecurity.parkingLotIsFull();
            return true;
        }
        return false;
    }
    //functio to find car
    findCar(carNumber) {
        return this.parkingLot.get(carNumber);
    }
}

module.exports = ParkingLot;