const puppeteer = require('puppeteer');
const id ='nawov59146@greenkic.com';
const pwd = '12345678';
let tab;
// puppeteer functions are Promisified functions

// Opening browser
let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
});
// console.log(browserOpenPromise);

browserOpenPromise.then(function(browserInstance) {
    // Return all pages
    let pagesPromise = browserInstance.pages();
    return pagesPromise;
})
.then(function(pages) {
    // Find tab and call goto promisified function
    tab = pages[0];
    let gotoPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise;
    // This will return a response, no data.
})
.then(function() {
    let idTypePromise = tab.type('#input-1', id);
    return idTypePromise;
})
.then(function() {
    let pwdTypePromise = tab.type('#input-2', pwd);
    return pwdTypePromise;
})
.then(function() {
    let loginTypePromise = tab.click('.auth-button');
    return loginTypePromise;
})
.then(function() {
    // This waits for the selector to load in DOM, default max - 30 sec, and when visibile is true
    let waitPromise = tab.waitForSelector('#base-card-1-link', {visible: true});
    return waitPromise;
})
.then(function() {
    // When selector is loaded, then we can use that selector.
    // If we dont wait for the selector to load, at the time we reach this function, selector is not loaded. So it will show error.
    let ipKitPromise = tab.click('#base-card-1-link');
    return ipKitPromise;
})
.then(function() {
    // Navigation happened - again wait for selector
    let waitPromise = tab.waitForSelector('#base-card-7-link', {visible: true});
    return waitPromise;
})
.then(function() {
    let challengePromise = tab.click('#base-card-7-link');
    return challengePromise;
})
.then(function() {
    let waitPromise = tab.waitForSelector('.js-track-click.challenge-list-item');
    return waitPromise;
})
.then(function() {
    // $$ => It works like document.querySelectorAll('');
    let allATagsPromise = tab.$$('.js-track-click.challenge-list-item');
    return allATagsPromise;
})
.then(function(allATags) {
    // [<a href=""></a>, <a></a>, <a></a>, <a></a>]
    let allQuesLinksPromise = [];
    for (let i=0; i<allATags.length; i++) {
        // elem => allATags[i]
        // tab.evaluate(callbackFunc, elem)
        let quesLinkPromise = tab.evaluate(function(elem) {return elem.getAttribute('href');} , allATags[i]);
        allQuesLinksPromise.push(quesLinkPromise);
    }
    // Combine all promises result
    let combinedPromise = Promise.all(allQuesLinksPromise);
    return combinedPromise;
})
.then(function(allQuesLinks) {
    console.log(allQuesLinks);
})
.catch(function(err) {
    console.log("ERROR");
})