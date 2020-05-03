const parkingLotOwner = require('../main/ParkingLotOwner');
const airportSecurityPersonal = require('../main/AirportSecurityPersonal');
class ParkingLot {
    constructor() {
        this.parkingLot = new Map();
        this.counter = 0;
        this.PARKING_LOT_CAPACITY = 9;
        this.parkingSlots = [3,3,3];
        this.firstSlot = [];
        this.secondSlot = [];
        this.thirdSlot = [];
        this.slotCounter = 0;
    }
    // function to park the car
    carParked(carNumber,carInfo,driverType) {
        if(this.isParkingLotFull()) {
            return ('Parking lot is full');
        }
        if (driverType = 'HANDICAP') {
            let slot = this.findNearestSlot();
            this.parkingSlots[slot] = carNumber;
        }
        if (this.slotCounter == 0) {
            this.firstSlot.push(carNumber);
            this.slotCounter++;
        }
        if (this.slotCounter == 1) {
            this.secondSlot.push(carNumber);
            this.slotCounter++;
        }
        if (this.slotCounter == 2) {
            this.thirdSlot.push(carNumber);
            this.slotCounter = 0;
        }
        this.parkingLot.set(carNumber,carInfo);
        if (carInfo.parkingTime != null) {
        parkingLotOwner.getCarParkedTime(carInfo.parkingTime);
        }
        this.counter++;
        return true;
    }
    // function to unpark the car
    carUnParked(carNumber) {
        this.parkingLot.delete(carNumber);
        this.counter--;
        if (this.counter == this.PARKING_LOT_CAPACITY-1) {
            parkingLotOwner.parkingSpaceAvailable();
        }
        return true;
    }
    // function to check parking lot is full or not
    isParkingLotFull() {
        if (this.counter == this.PARKING_LOT_CAPACITY) {
            parkingLotOwner.parkingLotIsFull();
            airportSecurityPersonal.parkingLotIsFull();
            return true;
        }
        return false;
    }
    //function to find car
    findCar(carNumber) {
        let isFind =  this.parkingLot.get(carNumber);
        return isFind;
    }
    //function to find nearest slot in parking lot
    findNearestSlot() {
        for(let position = 0;position < this.parkingSlots.length; position++) {
            if(this.parkingSlots[position] == undefined) {
                return position;
            }
        }
        return false;
    }
    
}

module.exports = ParkingLot;