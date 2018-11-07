const PubSub = require('../helpers/pub_sub.js');


const JustEatString = function(container){
  this.container = container;
}
// bind events subscribe for all result data ubSub.publish('ResultView:highchart-data-ready', allResultData)

JustEatString.prototype.bindEvents = function () {
  PubSub.subscribe('ResultView:highchart-data-ready', (evt)=>{
    this.renderString(evt.detail)
  });
};

JustEatString.prototype.renderString = function (allResultData) {
  let bikeHelpString = `Currently, your commute has a carbon footprint of ${allResultData.userMix}gCO2e.  By cycling or walking for even one trip you could reduce your carbon footprint.`

  let checkMapString = `Check the map below for just eat cycle stations convenient to your route.`

  const bikeHelpDiv = this.container;
  const bikeHelpContent = document.createElement("p");
  bikeHelpContent.textContent = bikeHelpString;
  const checkMapContent = document.createElement("p");
  checkMapContent.textContent = checkMapString;

  bikeHelpDiv.appendChild(bikeHelpContent);
  bikeHelpDiv.appendChild(checkMapContent);
  // console.log(bikeHelpString);
};

module.exports = JustEatString;
