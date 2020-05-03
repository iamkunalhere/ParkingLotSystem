class ParkingLotOwner {
    parkingLotIsFull() {
        return ('Parking lot is full');
    }
    parkingSpaceAvailable() {
        return ('Parking lot has space again');
    }
    getCarParkedTime(carParkedTime){
        console.log(carParkedTime);
    }
}

module.exports = new ParkingLotOwner;