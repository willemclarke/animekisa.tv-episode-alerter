const axios = require("axios");
const cheerio = require("cheerio");
const _ = require("lodash");

const url = "https://animekisa.tv/dr-stone";

function extractEpisodes(html) {
  const $ = cheerio.load(html);
  return $("div.infoept2 div.centerv").map((i, elem) => {
    return $(elem).text();
  });
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
      console.log(extractedEpisodes);
      const formattedEpisodes = formatEpisodes(test);
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
