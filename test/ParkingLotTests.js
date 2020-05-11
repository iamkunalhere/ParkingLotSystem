const assert = require('chai').assert;
const ParkingLot = require('../main/ParkingLot.js');
const sinon = require('sinon');
const parkingLotOwner = require('../main/ParkingLotOwner');
const expect = require('chai').expect;
const airportSecurityPersonal = require('../main/AirportSecurityPersonal');
const parkingAttendent = require('../main/ParkingAttendent');
const driver = require('../main/DriverType');
const carType = require('../main/CarType');

describe('Tests on Parking Lot System', function() {

// test to check car is parked in parking lot or not 
it('given car is parked should return true', function() {
    let parkingLot = new ParkingLot(1,1,2);
    car = {name:"audi",driverType:driver.NORMAL}
    let parked = parkingLot.carParked(car);
    assert.equal(true,parked);
});

// test to check car is unparked from the parking lot or not
it('given car is unparked should return true', function() {
    let parkingLot = new ParkingLot(2,2,2);
    car = {name:"audi",driverType:driver.NORMAL}
    parkingLot.carParked(car);
    let unParked = parkingLot.carUnParked(car);
    assert.equal(true,unParked);
});

// test to notify with message to parking lot owner if parking lot is full or not
it('given parking lot is full should return message', function() {
    try {
        let parkingLot = new ParkingLot(2,2,4);
        let cars = [
        {name:"audi",driverType:driver.NORMAL},
        {name:"bmw",driverType:driver.NORMAL},
        {name:"benz",driverType:driver.NORMAL},
        {name:"ford",driverType:driver.NORMAL}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
    } catch (message) {
    assert.equal(message.message,'Parking lot is full');
    }
});

// test to notify with message to parking lot owner if parking lot has space again
it('given parking lot has space again should return message', function(){
    try{
        let parkingLot = new ParkingLot(2,2,4);
        let cars = [
        {name:"audi",driverType:driver.NORMAL},
        {name:"bmw",driverType:driver.NORMAL},
        {name:"benz",driverType:driver.NORMAL}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
        cars.map((car) => {
            parkingLot.carUnParked(car);
        });
    }catch(message) {
    assert.equal(message.message,'Parking lot has space again');
    }
});

// test to check that car is parked by attendent
it('given parking attendent park the car should return true', function(){
    car = {name:"audi",parkingTime:Date()}
    let isParking = parkingAttendent.parkTheCar(car);
    expect(isParking).to.eql(true);
});

// test to check that driver finds his car
it('given driver finds his car should return car information', function(){
    let parkingLot = new ParkingLot(1,1,2);
    car = {name:"audi",driverType:driver.NORMAL}
    parkingLot.carParked(car);
    let isFind = parkingLot.findCar(car);
    expect(0).to.eql(isFind.lot);
});

// test to check that parking lot owner should know when car is parked in lot
it('given car is parked with time should return true', function() {
    let parkingLot = new ParkingLot(1,1,2);
    car = {name:"audi",parkingTime:Date()};
    let parkedOnTime  = parkingLot.carParked(car);
    expect(parkedOnTime).to.eql(true);
    
});

// test to check that attendent should evenly park the cars in slots
it('given car is parked evenly in slots should return true', function() {
    car = {name:"audi",parkingTime:Date()};
    let isParkedEvenly = parkingAttendent.parkTheCar(car);
    expect(isParkedEvenly).to.eql(true);
});

// test to check that attendent should park handicap's car to the nearest slot in parking lot
it('given handicap driver park car in nearest slot should return true', function() {
    car = {name:"audi",parkingTime:Date(),driverType:driver.HANDICAP};
    let isParkNear = parkingAttendent.parkTheCar(car);
    expect(isParkNear).to.eql(true);
});

// test to check that attendent should park the large car to lot that has max free space
it('given large car should park in lot that has max free space', function() {
    let parkingLot = new ParkingLot(2,2,4);
    car = {name:"audi",type:carType.LARGE};
    let parkedInMaxFreeLot = parkingLot.carParked(car);
    expect(parkedInMaxFreeLot).to.eql(true);
});

// test to check that police department should know location of all white cars
it('given white car should return location', function() {
    let parkingLot = new ParkingLot(3,3,9);
    try {
    let cars = [
        {owner:'kunal',name:"toyota",driverType:driver.NORMAL,color:'blue',number:'1111'},
        {owner:'rishi',name:"bmw",driverType:driver.NORMAL,color:'red',number:'1212'},
        {owner:'pravin',name:"benz",driverType:driver.NORMAL,color:'white',number:'1313'},
        {owner:'akshay',name:"toyota",driverType:driver.NORMAL,color:'blue',number:'2222'},
        {owner:'gaurav',name:"lexus",driverType:driver.NORMAL,color:'white',number:'1414'},
        {owner:'prithvi',name:"maserati",driverType:driver.NORMAL,color:'white',number:'1515'}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
    let carInfo = parkingLot.getCarInfo(null,'white');
    expect(carInfo[0][0]).to.eql('gaurav');
    expect(carInfo[0][1]).to.eql('1414');
    expect(carInfo[0][2]).to.eql(1);
    expect(carInfo[0][3]).to.eql(1);
    } catch (message) {
        assert.equal(message.message,'function should have arguments');
    }
});

// test to check that police should know location,number plate and name of car owner of blue toyota cars
it('given blue toyota cars should return location,number plate and name of car owner', function() {
    let parkingLot = new ParkingLot(3,3,9);
    try {
    let cars = [
        {owner:'kunal',name:"toyota",driverType:driver.NORMAL,color:'blue',number:'1111'},
        {owner:'rishi',name:"bmw",driverType:driver.NORMAL,color:'red',number:'1212'},
        {owner:'pravin',name:"benz",driverType:driver.NORMAL,color:'white',number:'1313'},
        {owner:'akshay',name:"toyota",driverType:driver.NORMAL,color:'blue',number:'2222'},
        {owner:'gaurav',name:"lexus",driverType:driver.NORMAL,color:'white',number:'1414'},
        {owner:'prithvi',name:"maserati",driverType:driver.NORMAL,color:'white',number:'1515'}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
    let carInfo = parkingLot.getCarInfo('toyota','blue');
    expect(carInfo[0][0]).to.eql('kunal');
    expect(carInfo[0][1]).to.eql('1111');
    expect(carInfo[0][2]).to.eql(0);
    expect(carInfo[0][3]).to.eql(0);
    } catch (message) {
        assert.equal(message.message,'function should have arguments');
    }
});

// test to check that police should know all parked BMW cars
it('given all bmw cars should return the car information', function() {
    let parkingLot = new ParkingLot(3,3,9);
    try {
    let cars = [
        {owner:'kunal',name:"toyota",driverType:driver.NORMAL,color:'blue',number:'1111'},
        {owner:'rishi',name:"ford",driverType:driver.NORMAL,color:'red',number:'1212'},
        {owner:'pravin',name:"benz",driverType:driver.NORMAL,color:'white',number:'1313'},
        {owner:'akshay',name:"toyota",driverType:driver.NORMAL,color:'blue',number:'2222'},
        {owner:'gaurav',name:"lexus",driverType:driver.NORMAL,color:'white',number:'1414'},
        {owner:'prithvi',name:"bmw",driverType:driver.NORMAL,color:'white',number:'1515'}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
    let carInfo = parkingLot.getCarInfo('bmw',null);
    expect(carInfo[0][0]).to.eql('prithvi');
    expect(carInfo[0][1]).to.eql('1515');
    expect(carInfo[0][2]).to.eql(2);
    expect(carInfo[0][3]).to.eql(1);
    } catch (message) {
        assert.equal(message.message,'function should have arguments');
    }
});

// test to check that police want to know cars parked before 30 minutes
it('given cars when parked before 30 minutes should return car information', function() {
    let parkingLot = new ParkingLot(3,3,9);
    var today = new Date();
    var parkingTime = today.getMinutes();
    try {
    let cars = [
        {owner:'kunal',name:"toyota",driverType:driver.NORMAL,color:'blue',number:'1111'},
        {owner:'rishi',name:"ford",driverType:driver.NORMAL,color:'red',number:'1212'},
        {owner:'pravin',name:"benz",driverType:driver.NORMAL,color:'white',number:'1313'},
        {owner:'akshay',name:"toyota",driverType:driver.NORMAL,color:'blue',number:'2222',parkingTime:parkingTime},
        {owner:'gaurav',name:"lexus",driverType:driver.NORMAL,color:'white',number:'1414'},
        {owner:'prithvi',name:"bmw",driverType:driver.NORMAL,color:'white',number:'1515'}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
        let carInfo = parkingLot.getCarInfoParkedBeforeMinutes(30);
        expect(carInfo[0][0]).to.eql('akshay');
        expect(carInfo[0][1]).to.eql('2222');
        expect(carInfo[0][2]).to.eql(0);
        expect(carInfo[0][3]).to.eql(1);
        } catch (message) {
            assert.equal(message.message,'function should have arguments');
        }
});

// test to check that police want to know the location of all small and handicap drivers cars
it('given cars when of type small and handicaps should return locatio', function() {
    let parkingLot = new ParkingLot(3,3,9);
    try {
    let cars = [
        {owner:'kunal',name:"toyota",driverType:driver.HANDICAP,color:'blue',number:'1111',type:carType.SMALL},
        {owner:'rishi',name:"ford",driverType:driver.NORMAL,color:'red',number:'1212'},
        {owner:'pravin',name:"benz",driverType:driver.NORMAL,color:'white',number:'1313'},
        {owner:'akshay',name:"toyota",driverType:driver.NORMAL,color:'blue',number:'2222'},
        {owner:'gaurav',name:"lexus",driverType:driver.NORMAL,color:'white',number:'1414'},
        {owner:'prithvi',name:"bmw",driverType:driver.NORMAL,color:'white',number:'1515'}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
        let carInfo = parkingLot.getCarInfoByTypeAndDriver('SMALL','HANDICAP');
        expect(carInfo[0][0]).to.eql(0);
        expect(carInfo[0][1]).to.eql(0);
        } catch (message) {
            assert.equal(message.message,'function should have arguments');
        }
});

// test to check that police should know all cars to investigate fraudulent plates
it('given cars when parked all should know all cars information', function() {
    let parkingLot = new ParkingLot(3,3,9);
    let cars = [
        {owner:'kunal',name:"toyota",driverType:driver.HANDICAP,color:'blue',number:'1111',type:carType.SMALL},
        {owner:'rishi',name:"ford",driverType:driver.NORMAL,color:'red',number:'1212'},
        {owner:'pravin',name:"benz",driverType:driver.NORMAL,color:'white',number:'1313'},
        {owner:'akshay',name:"toyota",driverType:driver.NORMAL,color:'blue',number:'2222'},
        {owner:'gaurav',name:"lexus",driverType:driver.NORMAL,color:'white',number:'1414'},
        {owner:'prithvi',name:"bmw",driverType:driver.NORMAL,color:'white',number:'1515'}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
        let carInfo = parkingLot.getAllCarsInformation();
        expect(carInfo[5][0]).to.eql(2);
        expect(carInfo[5][1]).to.eql(1);
        expect(carInfo[5][2]).to.eql(6);
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
    let parkingLot = new ParkingLot(2,2,4);
    let cars = [
        {name:"audi",driverType:driver.NORMAL},
        {name:"bmw",driverType:driver.NORMAL},
        {name:"benz",driverType:driver.NORMAL}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
    } catch (message) {
    expect(message.message).to.eql('Parking lot is full');
    }
});

// test to notify with message to airport security personal if parking lot is full or not
it('given parking lot is full should return message', function() {
    this.stub = sinon.stub(airportSecurityPersonal,'parkingLotIsFull');
    try {
    let parkingLot = new ParkingLot(2,2,4);
    let cars = [
        {name:"audi",driverType:driver.NORMAL},
        {name:"bmw",driverType:driver.NORMAL},
        {name:"benz",driverType:driver.NORMAL}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
    } catch (message) {
    expect(message.message).to.eql('Parking lot is full');
    }
});

// test to notify with message to parking lot owner if parking lot has space again
it('given parking lot has space again should return message', function(){
    this.stub = sinon.stub(parkingLotOwner,'parkingSpaceAvailable');
    try {
    let parkingLot = new ParkingLot(2,2,4);
        let cars = [
        {name:"audi",driverType:driver.NORMAL},
        {name:"bmw",driverType:driver.NORMAL},
        {name:"benz",driverType:driver.NORMAL}
        ];
        cars.map((car) => {
            parkingLot.carParked(car);
        });
        cars.map((car) => {
            parkingLot.carUnParked(car);
        });
    } catch(message) {
    assert.equal(message.message,'Parking lot has space again');
    }
});

});