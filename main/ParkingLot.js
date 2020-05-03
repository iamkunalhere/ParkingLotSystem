const parkingLotOwner = require('../main/ParkingLotOwner');
const airportSecurityPersonal = require('../main/AirportSecurityPersonal');
class ParkingLot {
    constructor() {
        this.parkingOwner = new parkingLotOwner();
        this.airportSecurity = new airportSecurityPersonal();
        this.parkingLot = new Map();
        this.counter = 0;
        this.PARKING_LOT_CAPACITY = 9;
        this.firstSlot = [];
        this.secondSlot = [];
        this.thirdSlot = [];
        this.parkingLotSlots = [this.firstSlot,this.secondSlot,this.thirdSlot];
        this.firstSlotCounter = 0;
        this.secondSlotCounter = 0;
        this.thirdSlotCounter = 0;
        this.SLOT_CAPACITY = 3; 
    }
    // function to park the car
    carParked(carNumber,carInfo) {
        if(this.isParkingLotFull()) {
            throw new Error('Parking lot is full');
        }
        this.parkInSlots(carNumber);
        this.parkingLot.set(carNumber,carInfo);
        this.parkingOwner.getCarParkedTime(carInfo.parkingTime);
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
    //function to find car
    findCar(carNumber) {
        let isFind =  this.parkingLot.get(carNumber);
        return isFind;
    }
    //function to park in slots
    parkInSlots(carNumber) {
        if(this.firstSlotCounter == 0 || (this.firstSlotCounter < this.secondSlotCounter && this.firstSlotCounter < this.thirdSlotCounter && this.firstSlotCounter != this.SLOT_CAPACITY)) {
            this.firstSlot.push(carNumber);
            this.firstSlotCounter++;
        }
        else if(this.secondSlotCounter == 0 || (this.secondSlotCounter < this.firstSlotCounter && this.secondSlotCounter < this.thirdSlotCounter && this.secondSlotCounter != this.SLOT_CAPACITY)) {
            this.secondSlot.push(carNumber);
            this.secondSlotCounter++;
        }
        else if(this.thirdSlotCounter == 0 || (this.thirdSlotCounter < this.firstSlotCounter && this.thirdSlotCounter < this.secondSlotCounter && this.thirdSlotCounter != this.SLOT_CAPACITY)) {
            this.thirdSlot.push(carNumber);
            this.thirdSlotCounter++;
        }
    }
}

module.exports = ParkingLot;