const puppeteer = require('puppeteer');
const pin = '173025';
let tab;

let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
})

browserOpenPromise.then(function(browserInstance) {
    let pagesPromise = browserInstance.pages();
    return pagesPromise;
})
.then(function(pages) {
    tab = pages[0];
    let gotoPromise = tab.goto('https://www.cowin.gov.in/home');
    return gotoPromise;
})
.then(function() {
    let pincodePromise = tab.type('#mat-input-0', pin);
    return pincodePromise;
})
.then(function() {
    let searchPromise = tab.click('.pinbtncover .pin-search-btn');
    return searchPromise;
})
.then(function() {
    let waitResponse = tab.waitForSelector('.row.ng-star-inserted .center-name-title');
    return waitResponse;
})
.then(function() {
    let allCentresPromise = tab.$$('.row.ng-star-inserted .center-name-title');
    return allCentresPromise;
})
.then(function(allCentres) {
    let allCentresPromise = [];
    for (let i=0; i<allCentres.length; i++) {
        let centrePromise = tab.evaluate(function(elem) { return elem.textContent; } , allCentres[i]);
        allCentresPromise.push(centrePromise);
    }
    let combinedPromise = Promise.all(allCentresPromise);
    return combinedPromise;
})
.then(function(allCentreNames) {
    console.log(allCentreNames);
})
.catch(function(err) {
    console.log("ERROR");
})