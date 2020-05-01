class ParkingLotOwner {
    parkingLotIsFull() {
        throw new Error('Parking lot is full');
    }
    parkingSpaceAvailable() {
        throw new Error('Parking lot has space again');
    }
    getCarParkedTime(carParkedTime){
        console.log(carParkedTime);
    }
}

module.exports = ParkingLotOwner;