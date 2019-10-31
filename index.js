const axios = require("axios");
const cheerio = require("cheerio");
const _ = require("lodash");
const nodemailer = require("nodemailer");

let trackedEpisodes = [];
const url = "https://animekisa.tv/dr-stone";

function extractEpisodes(html) {
  const episodes = [];
  const $ = cheerio.load(html);
  $("div.infoept2 div.centerv").each((i, elem) => {
    episodes.push($(elem).text());
  });
  return episodes;
}

// takes in an array of episodes --> transforms each element to an int
function formatEpisodes(episodes) {
  return episodes.reverse().map(episode => {
    return parseInt(episode, 10);
  });
}

function getEpisodes() {
  axios
    .get(url)
    .then(response => {
      const extractedEpisodes = extractEpisodes(response.data);
      const formattedEpisodes = formatEpisodes(extractedEpisodes); // currently equals an array with 17 eps
      if (_.isEqual(trackedEpisodes, formattedEpisodes)) {
        return console.log("No new episodes, don't send email");
      } else {
        const latestEpisode = _.differenceWith(formattedEpisodes, trackedEpisodes, _.isEqual);
        console.log(latestEpisode);
        console.log(trackedEpisodes);
        trackedEpisodes = formattedEpisodes;
        console.log(trackedEpisodes);
        return console.log("New Episode Found " + JSON.stringify(latestEpisode) + " Sending Email");
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function start() {
  setInterval(getEpisodes, 2000);
}

start();

// - first time program runs, the state ([]) will be empty
// - then the program will extract the episodes & and push them into the state
//   - at this point the program does nothing (keeps checking)
// - once a new episode comes in, it compares the current array to the state (e.g.) .\_isEqual(formmattedEpisodes, state)
//   - if it is not equal --> updates the state to have all episodes ---> then sends email
//   - if it is equal --> do nothing, keep checking

// visualise = {
//   0: {},
//   1: {}
// };

// if (state.length !== formattedEpisodes.length) {
//   state = state.concat(formattedEpisodes);
//   console.log(state);
// } else {
//   return;
// }
