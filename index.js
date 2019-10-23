const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://animekisa.tv/dr-stone";

axios
  // fetching html page data
  .get(url)
  .then(response => {
    console.log(response.data);

    //scraping list of episodes
    let getData = html => {
      data = [];
      const $ = cheerio.load(html);
      $("div.infoept2 div.centerv").each((i, elem) => {
        data.push({
          episode: $(elem).text()
        });
      });
      console.log(data);
    };

    getData(response.data);
  })

  //handling errors
  .catch(error => {
    console.log(error);
  });
