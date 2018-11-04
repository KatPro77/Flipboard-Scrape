var axios = require("axios");
var cheerio = require("cheerio");


var scrape = function(cb) {
  return axios.get("https://flipboard.com").then(function(res) {

    var $ = cheerio.load(res.data);

    var articles = [];

    $(".post.post--card").each(function(i, element) {

      var head = $(this).children(".post__title.article-text--title--large").text().trim();

      var url = $(this).children().attr("href");

      var sum = $(this).children(".post__excerpt").text().trim();

      if (head && sum) {

        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat
          // url: url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

module.exports = scrape;