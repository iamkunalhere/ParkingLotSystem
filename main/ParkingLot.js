const parkingLotOwner = require('../main/ParkingLotOwner');
const airportSecurityPersonal = require('../main/AirportSecurityPersonal');
class ParkingLot {
    constructor(lotsInParkingLot,capacityOfLot,capacityOfParkingLot) {
        this.parkingLot = [];
        this.getParkingLotStructure(lotsInParkingLot,capacityOfLot);
        this.capacityOfParkingLot = capacityOfParkingLot;
        this.noOfCars = 0;
    }

    getParkingLotStructure(lotsInParkingLot,capacityOfLot) {
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
            if (car.type == 'LARGE') {
                this.parkInMaxFreeLot(car);
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
    // function to park large car in max free lot
    parkInMaxFreeLot = (car) => {
        let lotNum = null;
        let slotNum = null;
        let maxFreeLot = null;
        let maxFreeLotSlot = null;
        let maxCounter = 0;
        let Counter = 0; 
        for(let lot = 0; lot < this.parkingLot.length; lot++) {
            for(let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if(this.parkingLot[lot][slot] === null) {
                    Counter++;
                    lotNum = lot;
                    slotNum = slot;   
                }
            }
            if (Counter > maxCounter) {
                maxCounter = Counter;
                Counter = 0;
                maxFreeLot = lotNum;
                maxFreeLotSlot = slotNum;
            }
        }
        this.parkingLot[maxFreeLot][maxFreeLotSlot] = car;
        this.noOfCars++;
        this.isParkingLotFull();
        return true;
    }
    // function to get all information of car
    getCarInfo = (brand,color) => {
        let carInfo = [];
        if (brand != null || color != null) {
            for(let lot = 0; lot < this.parkingLot.length; lot++) {
                for(let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                    if (this.parkingLot[lot][slot] != null ) {
                        if (this.parkingLot[lot][slot].color === color || this.parkingLot[lot][slot].color === color && this.parkingLot[lot][slot].name === brand || this.parkingLot[lot][slot].name === brand ) {
                            carInfo.push([this.parkingLot[lot][slot].owner,this.parkingLot[lot][slot].number,lot,slot]); 
                        }
                    }
                }
            }
            return carInfo;
        }
        throw new Error('function should have arguments');
    }
    // function to get information of car on its parking time
    getCarInfoParkedBeforeMinutes = (beforeMinutes) => {
        let carInfo = [];
        let today = new Date();
        let currentTime = today.getMinutes();
        if (beforeMinutes != null) {
            for(let lot = 0; lot < this.parkingLot.length; lot++) {
                for(let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                    if (this.parkingLot[lot][slot] != null ) {
                        if (currentTime - this.parkingLot[lot][slot].parkingTime <= beforeMinutes) {
                            carInfo.push([this.parkingLot[lot][slot].owner,this.parkingLot[lot][slot].number,lot,slot]);
                        }
                    }
                }
            }
            return carInfo;
        }
        throw new Error('function should have arguments')
    }
    // function to know location of cars by car type and drivers type
    getCarInfoByTypeAndDriver = (carType,driverType) => {
        let carInfo = [];
        if (carType != null || driverType != null) {
            for(let lot = 0; lot < this.parkingLot.length; lot++) {
                for(let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                    if (this.parkingLot[lot][slot] != null ) {
                        if (this.parkingLot[lot][slot].type === carType && this.parkingLot[lot][slot].driverType === driverType ) {
                            carInfo.push([lot,slot]);
                        }
                    }
                }
            }
            return carInfo;
        }
        throw new Error('function should have arguments')
    }
    // function to know all cars
    getAllCarsInformation = () => {
        let carInfo = [];
        let counter = 1;
        for(let lot = 0; lot < this.parkingLot.length; lot++) {
            for(let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if(this.parkingLot[lot][slot] != null) {
                    carInfo.push([lot,slot,counter++])
                }
            }
        }
        if(carInfo != null) {
            return carInfo;
        }
        return false;
    }
}
module.exports = ParkingLot;