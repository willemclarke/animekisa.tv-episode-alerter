const axios = require("axios");
const cheerio = require("cheerio");
const _ = require("lodash");

const url = "https://animekisa.tv/dr-stone";

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

function getEpisodes() {
  axios
    .get(url)
    .then(response => {
      const extractedEpisodes = extractEpisodes(response.data);
      const formattedEpisodes = formatEpisodes(extractedEpisodes);
      console.log(formattedEpisodes);
    })
    .catch(error => {
      console.log(error);
    });
}

function start() {
  setInterval(getEpisodes, 2000);
}

start();

// visualise = {
//   0: {},
//   1: {}
// };

// return $("div.infoept2 div.centerv").map((i, elem) => {
//   return console.log($(elem).text());
