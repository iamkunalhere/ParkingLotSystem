const assert = require('chai').assert;
const Parking = require('../main/ParkingLot');
const sinon = require('sinon');
const ParkingLotOwner = require('../main/ParkingLotOwner');
const expect = require('chai').expect;
const AirportSecurityPersonal = require('../main/AirportSecurityPersonal');
const ParkingAttendent = require('../main/ParkingAttendent');

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

// test to notify with message to parking lot owner if parking lot has space again
it('when parking lot has space again should return true', function(){
    let parkingLot = new Parking();
    parkingLot.carParked("car1","Audi");
    parkingLot.carParked("car2","bmw");
    parkingLot.carParked("car3","ford");
    let isSpace = parkingLot.carUnParked("car1");
    assert.isTrue(isSpace);

});

// test to check that car is parked by attendent
it('when parking attendent park the car should return true', function(){
    let parkingAttendent = new ParkingAttendent();
    let isParking = parkingAttendent.parkTheCar();
    expect(isParking).to.eql(true);
});

// test to check that driver finds his car
it.only('when driver finds his car should return true', function(){
    let parkingLot = new Parking();
    parkingLot.carParked("car1","audi");
    let isFind = parkingLot.findCar("car1");
    expect(isFind).to.eql(true);
});

});

describe('Tests using Sinon', function(){

// test to notify with message to parking lot owner if parking lot is full or not
it('when parking lot is full should return message', function() {
    let parkingLotOwner = new ParkingLotOwner();
    var stub = sinon.stub(parkingLotOwner,'parkingLotIsFull');
    try {
    let parkingLot = new Parking();
    parkingLot.carParked("car1","Audi");
    parkingLot.carParked("car2","bmw");
    parkingLot.carParked("car3","ford");
    parkingLot.carParked("car4","benz");
    } catch (message) {
    expect(message.message).to.eql('parking lot is full');
    }
    stub.restore();
});

// test to notify with message to airport security personal if parking lot is full or not
it('when parking lot is full should return message', function() {
    let airportSecurityPersonal = new AirportSecurityPersonal();
    let stub = sinon.stub(airportSecurityPersonal,'parkingLotIsFull');
    try {
    let parkingLot = new Parking();
    parkingLot.carParked("car1","Audi");
    parkingLot.carParked("car2","bmw");
    parkingLot.carParked("car3","ford");
    parkingLot.carParked("car4","benz");
    } catch (message) {
    expect(message.message).to.eql('parking lot is full');
    }
    stub.restore();
});

// test to notify with message to parking lot owner if parking lot has space again
it('when parking lot has space again should return true', function(){
    let parkingLotOwner = new ParkingLotOwner();
    var stub = sinon.stub(parkingLotOwner,'parkingSpaceAvailable');
    let parkingLot = new Parking();
    parkingLot.carParked("car1","Audi");
    parkingLot.carParked("car2","bmw");
    parkingLot.carParked("car3","ford");
    let isSpace = parkingLot.carUnParked("car1");
    assert.isTrue(isSpace);
    stub.restore();
});

});
