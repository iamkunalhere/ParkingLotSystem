class ParkingLot {
    
    carParked(carNumber,carName) {
        this.parkingLot = new Map();
        this.parkingLot.set(carNumber,carName);
        return true;
    }
}

module.exports = ParkingLot;