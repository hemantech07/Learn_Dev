const request = require('request');
const cheerio = require('cheerio');

// request => Async function

let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(link, cb);

function cb(error, response, html) {
    evalHtml(html);
}

// Winner Team and Man of the Match
/* function evalHtml(html) {
    let ch = cheerio.load(html);
    let winner = ch(".match-info-MATCH .status-text span").text();
    console.log("RESULT: "+winner);

    let bestPlayer = ch(".best-player-name a").text();
    let bestPlayerTeam = ch(".best-player-content span").text();
    console.log("Man of the Match: "+bestPlayer+" of "+bestPlayerTeam);
} */

// Bowler Name - Wicket - Economy
/* function evalHtml(html) {
    let ch = cheerio.load(html);
    let allBowlerTrs = ch(".table.bowler tbody tr");
    // console.log(allBowlers);
    for (let i=0; i<allBowlerTrs.length; i++) {
        let bowlerDetail = allBowlerTrs[i];
        let allTds = ch(bowlerDetail).find('td');
        // 0
        let bowlerName = ch(allTds[0]).text().trim();
        // 4
        let wickets = ch(allTds[4]).text().trim();
        // 5
        let eco = ch(allTds[5]).text().trim();

        console.log(`Name: ${bowlerName} Wickets: ${wickets} Economy: ${eco}`);
    }
} */

// Highest Wicket
let hWtTaker;
let hWts;
let lEco;

function evalHtml(html) {
    let ch = cheerio.load(html);
    let allBowlerTrs = ch(".table.bowler tbody tr");
    // console.log(allBowlers);
    for (let i=0; i<allBowlerTrs.length; i++) {
        let bowlerDetail = allBowlerTrs[i];
        let allTds = ch(bowlerDetail).find('td');
        // 0
        let bowlerName = ch(allTds[0]).text().trim();
        // 4
        let wickets = ch(allTds[4]).text().trim();
        // 5
        let eco = ch(allTds[5]).text().trim();
        if (i==0) {
            hWtTaker = bowlerName;
            hWts = wickets;
            lEco = eco;
        } else {
            if (wickets>hWts || (wickets==hWts && eco<lEco)) {
                hWtTaker = bowlerName;
                hWts = wickets;
                lEco = eco;
            }
        }
    }
    console.log(`Highest Wicket Taker is ${hWtTaker} with ${hWts} wickets and economy of ${lEco}`);
}
