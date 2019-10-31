const axios = require("axios");
const cheerio = require("cheerio");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const animes = [
  { name: "Dr Stone", url: "https://animekisa.tv/dr-stone" },
  { name: "Ahri No Sora", url: "https://animekisa.tv/ahiru-no-sora" }
];

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

// we return axios as we are
function getEpisodes(url) {
  return axios
    .get(url)
    .then(response => {
      const extractedEpisodes = extractEpisodes(response.data);
      return formatEpisodes(extractedEpisodes);
    })
    .catch(error => {
      console.log(error);
    });
}

function syncEpisodes(name, filePath, url) {
  const readDatabase = fs.existsSync(filePath) ? fs.readFileSync(filePath).toString() : "";
  const parsedDatabase = readDatabase ? JSON.parse(readDatabase) : readDatabase;
  getEpisodes(url).then(result => {
    if (_.isEqual(parsedDatabase, result)) {
      return console.log("No new episodes, don't send email");
    } else {
      const missingEpisodes = _.differenceWith(result, parsedDatabase, _.isEqual);
      fs.writeFileSync(filePath, JSON.stringify(result));
      return console.log(`${missingEpisodes.length} New Episodes Found for ${name} Sending Email`);
    }
  });
}

function syncAnimes(animes) {
  animes.forEach(anime => {
    const filePath = path.join(__dirname, `./assets/${anime.name}.json`);
    syncEpisodes(anime.name, filePath, anime.url);
  });
}

function start(animes) {
  setInterval(() => syncAnimes(animes), 5000);
}

start(animes);

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
