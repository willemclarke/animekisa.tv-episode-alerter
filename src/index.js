const axios = require("axios");
const cheerio = require("cheerio");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const Email = require("./email-handling.js");

const email = new Email();

const animes = [
  { name: "Dr Stone", url: "https://animekisa.tv/dr-stone" },
  { name: "Ahiru No Sora", url: "https://animekisa.tv/ahiru-no-sora" },
  { name: "My Hero Academia", url: "https://animekisa.tv/boku-no-hero-academia-4" },
  { name: "Food Wars Season 4", url: "https://animekisa.tv/shokugeki-no-souma-shin-no-sara" },
  { name: "Diamond No Ace Act 2", url: "https://animekisa.tv/diamond-no-ace-act-ii" }
];

function extractEpisodes(html) {
  const episodes = [];
  const $ = cheerio.load(html);
  $("div.infoept2 div.centerv").each((i, elem) => {
    episodes.push($(elem).text());
  });
  return episodes;
}

function formatEpisodes(episodes) {
  return episodes.reverse().map(episode => {
    return parseInt(episode, 10);
  });
}

function getEpisodes(url) {
  return axios
    .get(url)
    .then(response => {
      const extractedEpisodes = extractEpisodes(response.data);
      return formatEpisodes(extractedEpisodes);
    })
    .catch(error => {
      console.log((error.response && error.response.data) || error.request || error.message);
    });
}

function syncEpisodes(name, filePath, url) {
  const readDatabase = fs.existsSync(filePath) ? fs.readFileSync(filePath).toString() : "";
  const parsedDatabase = readDatabase ? JSON.parse(readDatabase) : readDatabase;
  getEpisodes(url).then(result => {
    if (_.isEqual(parsedDatabase, result)) {
      return console.log(`No new episodes for ${name}, don't send email`);
    } else {
      const missingEpisodes = _.differenceWith(result, parsedDatabase, _.isEqual);
      const episodesForEmail = missingEpisodes.length;
      fs.writeFileSync(filePath, JSON.stringify(result));
      return email.sendEmail(episodesForEmail, name);
    }
  });
}

function syncAnimes(animes) {
  animes.forEach(anime => {
    const filePath = path.join(__dirname, `../database/${anime.name}.json`);
    syncEpisodes(anime.name, filePath, anime.url);
  });
}

function start(animes) {
  setInterval(() => syncAnimes(animes), 5000);
}

start(animes);
