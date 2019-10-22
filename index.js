const axios = require("axios");

const url = "https://kissanime.ru/Anime/Dr-Stone";

axios
  .get(url)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
