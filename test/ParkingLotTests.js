const assert = require('chai').assert;
const Parking = require('../main/ParkingLot');

describe('Tests on Parking Lot System', function() {

// test to check car is parked in parking lot or not 
it('when car is parked should return true', function() {
    let parkingLot = new Parking();
    let parked = parkingLot.carParked("car1","audi");
    assert.equal(true,parked);
});

});