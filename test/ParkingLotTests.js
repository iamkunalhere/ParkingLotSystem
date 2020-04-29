const assert = require('chai').assert;
const Parking = require('../main/ParkingLot');

describe('Tests on Parking Lot System', function() {

// test to check car is parked in parking lot or not 
it('when car is parked should return true', function() {
    let parkingLot = new Parking();
    let parked = parkingLot.carParked("car1","audi");
    assert.equal(true,parked);
});

// test to check car is unparked from the parking lot or not
it('when car is unparked should return true', function() {
    let parkingLot = new Parking();
    parkingLot.carParked("car1","Audi");
    let unParked = parkingLot.carUnParked("car1")
    assert.equal(true,unParked);
});

// test to notify with message to parking lot owner if parking lot is full or not
it('when parking lot is full should return message', function() {
    try {
    let parkingLot = new Parking();
    parkingLot.carParked("car1","Audi");
    parkingLot.carParked("car2","bmw");
    parkingLot.carParked("car3","ford");
    parkingLot.carParked("car4","benz");
    } catch (message) {
    assert.equal(message.message,'parking lot is full');
    }
});

});
