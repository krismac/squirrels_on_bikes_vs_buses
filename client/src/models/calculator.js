const PubSub = require('../helpers/pub_sub.js');

const Calculator = function() {
  this.conversionFactors = {carDiesel: 0.218, // add values here
    carPetrol: 0.286, // gCO2e/km
    carHybrid: 0.118,
    bus: 0.124,
    cycle: 0}; // more figures on docs
  // this.data = data;
};

Calculator.prototype.bindEvents = function() {
  PubSub.subscribe('FormView:add-item', (evt) => {
    this.setData(evt.detail);
    console.log('Calc receiving data', this.data);
  });
};

Calculator.prototype.setData = function(data) {
  this.data = data;
};

Calculator.prototype.totalDistance = function() {
  const singleDistance = this.data.singleTripDistance;
  const days = this.data.commutingDays;
  const tripsPerDay = this.data.singleTripsPerDay;

  const totalDistance = singleDistance * days * tripsPerDay;

  return totalDistance;
};

Calculator.prototype.totalCarbonForEachMode = function() {
  const forEachModeObject = {};
  for (const [conversionFactorKey, value] of Object.entries(this.conversionFactors)) {
    const totalDistance = this.totalDistance();
    const modeCO2 = value * totalDistance;
    forEachModeObject[conversionFactorKey] = modeCO2;
  };
  return forEachModeObject;
};

Calculator.prototype.totalCarbonUserBreakdown = function() {
  const userBreakdownObject = {};
  for (const [conversionFactorKey, value] of Object.entries(this.conversionFactors)) {
    const singleTrips = this.handleTripData(conversionFactorKey);
    console.log('calling single trips', singleTrips);
    const totalCO2 = singleTrips * value * this.data.singleTripDistance;
    userBreakdownObject[conversionFactorKey] = totalCO2;
  };
  console.log('the userBreakdownObject', userBreakdownObject);
  return userBreakdownObject; // This will pubsub eventually
};

Calculator.prototype.handleTripData = function(factorKey) {
  const singleTrips = this.data[factorKey];
  return singleTrips;
};

Calculator.prototype.worstCase = function() {
  const petrol = this.coversionFactors['carPetrol'];
  const result = petrol * this.totalDistance();
  return Math.round(result*100)/100;
};

Calculator.prototype.bus = function() {
  const bus = this.coversionFactors['bus'];
  const result = bus * this.totalDistance();
  return result;
};

module.exports = Calculator;
