class ParkingLotOwner {
    parkingLotIsFull() {
        throw new Error('Parking lot is full');
    }
    parkingSpaceAvailable() {
        throw new Error('Parking lot has space again');
    }
}

module.exports = ParkingLotOwner;