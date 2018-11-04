var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");


var scrape = function() {
  return axios.get("https://flipboard.com/").then(function(res) {

    var $ = cheerio.load(res.data);

    var articles = [];

    $(".post--card").each(function(i, element) {

      var head = $(this)
        .children(".post_title article-text--title--large").text().trim();

      var url = $(this)
        .children(".post_title article-text--title--large").children("a").attr("href");

      var sum = $(this)
        .children(".post_excerpt").text().trim();

      if (head && sum && url) {

        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

module.exports = scrape;