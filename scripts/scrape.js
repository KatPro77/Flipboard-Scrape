var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");


var scrape = function() {
  return axios.get("https://flipboard.com/").then(function(res) {

    var $ = cheerio.load(res.data);

    var articles = [];

    $(".post post--card").each(function(i, element) {

      var head = $(this)
        .children(".data-test-id").text().trim();

      var url = $(this)
        .children(".data-test-id").children("a").attr("href");

      var sum = $(this)
        .children(".article-text--body internal-link").text().trim();

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