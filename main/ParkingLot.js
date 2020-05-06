const parkingLotOwner = require('../main/ParkingLotOwner');
const airportSecurityPersonal = require('../main/AirportSecurityPersonal');
class ParkingLot {
    constructor(lotsInParkingLot,capacityOfLot,capacityOfParkingLot) {
        this.parkingLot;
        this.getParkingLotStructure(lotsInParkingLot,capacityOfLot);
        this.capacityOfParkingLot = capacityOfParkingLot;
        this.noOfCars = 0;
    }

    getParkingLotStructure(lotsInParkingLot,capacityOfLot) {
        this.parkingLot = [];
        for(let lot = 0; lot < lotsInParkingLot; lot++) {
            this.parkingLot[lot] = [capacityOfLot];
            for(let slot = 0; slot < capacityOfLot; slot++) {
                this.parkingLot[lot][slot] = null;
            }
        }
    }

    // function to park the car
    carParked = (car) => {
        if(typeof car === 'object' && car != null) {
            if(this.isParkingLotFull()) {
                throw new Error('Parking lot is full');
            }
            if (car.driverType == 'HANDICAP') {
                this.findNearestSlot(car);
            }
            if (car.driverType == 'NORMAL') {
                this.findSlot(car);
            }
            if (car.parkingTime != null) {
                parkingLotOwner.getCarParkedTime(car.parkingTime);
            }
        }
        else {
            throw new Error('car must be object and cannot be null');
        }
        return true;
    }
    // function to unpark the car
    carUnParked = (car) => {
        for(let lot = 0; lot < this.parkingLot.length; lot++) {
            for(let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if(this.parkingLot[lot][slot] === car) {
                    this.parkingLot[lot][slot] = null;
                    this.noOfCars--;
                    if (this.noOfCars == this.capacityOfParkingLot-1) {
                        parkingLotOwner.parkingSpaceAvailable();
                    }
                    return true;
                }
            }
        }   
    }
    // function to check parking lot is full or not
    isParkingLotFull = () => {
        if (this.noOfCars === this.capacityOfParkingLot) {
            parkingLotOwner.parkingLotIsFull();
            airportSecurityPersonal.parkingLotIsFull();
            return true;
        }
        return false;
    }
    //function to find car
    findCar = (car) => {
        for(let lot = 0; lot < this.parkingLot.length; lot++) {
            for(let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if(this.parkingLot[lot][slot] === car) {
                    let carPosition = {lot:lot,slot:slot};
                    return carPosition;
                }
            }
        }   
    }
    //function to find nearest slot in parking lot for handicap driver
    findNearestSlot = (car) => {
        for(let lot = 0; lot < this.parkingLot.length; lot++) {
            for(let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if(this.parkingLot[lot][slot] === null) {
                    this.parkingLot[lot][slot] = car;
                    this.noOfCars++;
                    this.isParkingLotFull();
                    return true;
                }
            }
        }   
    }
    // function to park car for normal driver
    findSlot = (car) => {
        for(let lot = 0; lot < this.parkingLot.length; lot++) {
            for(let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if(this.parkingLot[slot][lot] === null) {
                    this.parkingLot[slot][lot] = car;
                    this.noOfCars++;
                    this.isParkingLotFull();
                    return true;
                }
            }
        }   
    }
    
}

module.exports = ParkingLot;