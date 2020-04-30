const assert = require('chai').assert;
const Parking = require('../main/ParkingLot');
const sinon = require('sinon');
const ParkingLotOwner = require('../main/ParkingLotOwner');
const expect = require('chai').expect;
const AirportSecurityPersonal = require('../main/AirportSecurityPersonal');
const ParkingAttendent = require('../main/ParkingAttendent');

describe('Tests on Parking Lot System', function() {
    
    beforeEach(function(){
        this.parkingLot = new Parking();
        this.parkingAttendent = new ParkingAttendent();

    });

// test to check car is parked in parking lot or not 
it('when car is parked should return true', function() {
    let parked = this.parkingLot.carParked("car1","audi");
    assert.equal(true,parked);
});

// test to check car is unparked from the parking lot or not
it('when car is unparked should return true', function() {
    this.parkingLot.carParked("car1","Audi");
    let unParked = this.parkingLot.carUnParked("car1")
    assert.equal(true,unParked);
});

// test to notify with message to parking lot owner if parking lot is full or not
it('when parking lot is full should return message', function() {
    try {
    this.parkingLot.carParked("car1","Audi");
    this.parkingLot.carParked("car2","bmw");
    this.parkingLot.carParked("car3","ford");
    this.parkingLot.carParked("car4","benz");
    } catch (message) {
    assert.equal(message.message,'Parking lot is full');
    }
});

// test to notify with message to parking lot owner if parking lot has space again
it('when parking lot has space again should return message', function(){
    try{
    this.parkingLot.carParked("car1","Audi");
    this.parkingLot.carParked("car2","bmw");
    this.parkingLot.carParked("car3","ford");
    this.parkingLot.carUnParked("car1");
    }catch(message) {
    assert.equal(message.message,'Parking lot has space again');
    }
});

// test to check that car is parked by attendent
it('when parking attendent park the car should return true', function(){
    let isParking = this.parkingAttendent.parkTheCar();
    expect(isParking).to.eql(true);
});

// test to check that driver finds his car
it('when driver finds his car should return car information', function(){
    this.parkingLot.carParked("car1","audi");
    let isFind = this.parkingLot.findCar("car1");
    expect(isFind).to.eql("audi");
});

});

describe('Tests using Sinon', function(){
    
    beforeEach(function(){
        this.parkingLot = new Parking();
        this.parkingLotOwner = new ParkingLotOwner();
        this.airportSecurityPersonal = new AirportSecurityPersonal();
    });
    afterEach(function(){
        this.stub.restore();
    });

// test to notify with message to parking lot owner if parking lot is full or not
it('when parking lot is full should return message', function() {
    this.stub = sinon.stub(this.parkingLotOwner,'parkingLotIsFull');
    try {
    this.parkingLot.carParked("car1","Audi");
    this.parkingLot.carParked("car2","bmw");
    this.parkingLot.carParked("car3","ford");
    this.parkingLot.carParked("car4","benz");
    } catch (message) {
    expect(message.message).to.eql('Parking lot is full');
    }
});

// test to notify with message to airport security personal if parking lot is full or not
it('when parking lot is full should return message', function() {
    this.stub = sinon.stub(this.airportSecurityPersonal,'parkingLotIsFull');
    try {
    this.parkingLot.carParked("car1","Audi");
    this.parkingLot.carParked("car2","bmw");
    this.parkingLot.carParked("car3","ford");
    this.parkingLot.carParked("car4","benz");
    } catch (message) {
    expect(message.message).to.eql('Parking lot is full');
    }
});

// test to notify with message to parking lot owner if parking lot has space again
it('when parking lot has space again should return message', function(){
    try {
    this.stub = sinon.stub(this.parkingLotOwner,'parkingSpaceAvailable');
    this.parkingLot.carParked("car1","Audi");
    this.parkingLot.carParked("car2","bmw");
    this.parkingLot.carParked("car3","ford");
    this.parkingLot.carUnParked("car1");
    } catch(message) {
    assert.equal(message.message,'Parking lot has space again');
    }
});

});
