const assert = require('chai').assert;
const ParkingLot = require('../main/ParkingLot');
const sinon = require('sinon');
const parkingLotOwner = require('../main/ParkingLotOwner');
const expect = require('chai').expect;
const airportSecurityPersonal = require('../main/AirportSecurityPersonal');
const parkingAttendent = require('../main/ParkingAttendent');
const driver = require('../main/DriverType');

describe('Tests on Parking Lot System', function() {

    beforeEach(() => {
        parkingLot = new ParkingLot();
    });

// test to check car is parked in parking lot or not 
it('given car is parked should return true', function() {
    let parked = parkingLot.carParked("car1","audi");
    assert.equal(true,parked);
});

// test to check car is unparked from the parking lot or not
it('given car is unparked should return true', function() {
    parkingLot.carParked("car1","Audi");
    let unParked = parkingLot.carUnParked("car1")
    assert.equal(true,unParked);
});

// test to notify with message to parking lot owner if parking lot is full or not
it('given parking lot is full should return message', function() {
    try {
    parkingLot.carParked("car1","Audi");
    parkingLot.carParked("car2","bmw");
    parkingLot.carParked("car3","ford");
    parkingLot.carParked("car4","benz");
    } catch (message) {
    assert.equal(message.message,'Parking lot is full');
    }
});

// test to notify with message to parking lot owner if parking lot has space again
it('given parking lot has space again should return message', function(){
    try{
    parkingLot.carParked("car1","Audi");
    parkingLot.carParked("car2","bmw");
    parkingLot.carParked("car3","ford");
    parkingLot.carUnParked("car1");
    }catch(message) {
    assert.equal(message.message,'Parking lot has space again');
    }
});

// test to check that car is parked by attendent
it('given parking attendent park the car should return true', function(){
    carInfo = {name:"audi",parkingTime:Date()}
    let isParking = parkingAttendent.parkTheCar("car1",carInfo);
    expect(isParking).to.eql(true);
});

// test to check that driver finds his car
it('given driver finds his car should return car information', function(){
    parkingLot.carParked("car1","audi");
    let isFind = parkingLot.findCar("car1");
    expect(isFind).to.eql("audi");
});

// test to check that parking lot owner should know when car is parked in lot
it('given car is parked with time should return true', function() {
    carInfo = {name:"audi",parkingTime:Date()};
    let parkedOnTime  = parkingLot.carParked("car1",carInfo);
    expect(parkedOnTime).to.eql(true);
    
});

// test to check that attendent should evenly park the cars in slots
it('given car is parked evenly in slots should return true', function() {
    carInfo = {name:"audi",parkingTime:Date()};
    let isParkedEvenly = parkingAttendent.parkTheCar("car1",carInfo);
    expect(isParkedEvenly).to.eql(true);
});

// test to check that attendent should park handicap's car to the nearest slot in parking lot
it('given handicap driver park car in nearest slot should return true', function() {
    carInfo = {name:"audi",parkingTime:Date()};
    let isParkNear = parkingAttendent.parkTheCar("car1",carInfo,driver.HANDICAP);
    expect(isParkNear).to.eql(true);
});

});

describe('Tests using Sinon', function(){
    
    afterEach(function(){
        this.stub.restore();
    });

// test to notify with message to parking lot owner if parking lot is full or not
it('given parking lot is full should return message', function() {
    this.stub = sinon.stub(parkingLotOwner,'parkingLotIsFull');
    try {
    parkingLot.carParked("car1","Audi");
    parkingLot.carParked("car2","bmw");
    parkingLot.carParked("car3","ford");
    parkingLot.carParked("car4","benz");
    } catch (message) {
    expect(message.message).to.eql('Parking lot is full');
    }
});

// test to notify with message to airport security personal if parking lot is full or not
it('given parking lot is full should return message', function() {
    this.stub = sinon.stub(airportSecurityPersonal,'parkingLotIsFull');
    try {
    parkingLot.carParked("car1","Audi");
    parkingLot.carParked("car2","bmw");
    parkingLot.carParked("car3","ford");
    parkingLot.carParked("car4","benz");
    } catch (message) {
    expect(message.message).to.eql('Parking lot is full');
    }
});

// test to notify with message to parking lot owner if parking lot has space again
it('given parking lot has space again should return message', function(){
    try {
    this.stub = sinon.stub(parkingLotOwner,'parkingSpaceAvailable');
    parkingLot.carParked("car1","Audi");
    parkingLot.carParked("car2","bmw");
    parkingLot.carParked("car3","ford");
    parkingLot.carUnParked("car1");
    } catch(message) {
    assert.equal(message.message,'Parking lot has space again');
    }
});

});
