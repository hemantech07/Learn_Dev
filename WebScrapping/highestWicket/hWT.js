const request = require('request');
const cheerio = require('cheerio');

// request => Async function

let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(link, cb);

function cb(error, response, html) {
    evalHtml(html);
}

function evalHtml(html) {
    let ch = cheerio.load(html);
    let winner = ch(".match-info-MATCH .status-text span").text();
    console.log("RESULT: "+winner);

    let bestPlayer = ch(".best-player-name a").text();
    let bestPlayerTeam = ch(".best-player-content span").text();
    console.log("Man of the Match: "+bestPlayer+" of "+bestPlayerTeam);
}