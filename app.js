
// var item;
// item = "video games";

// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a4921eeb6214478796b19a374cbc1301&q=" + item;
// url += '?' + $.param({
//   'api-key': "a4921eeb6214478796b19a374cbc1301",
//   'q': "something"
// });

// $.ajax({
//   url: url,
//   method: 'GET',
// }).done(function(result) {
//   console.log(result);
//   console.log(url);
  
// }).fail(function(err) {
//   throw err;
// });




// var key = "a4921eeb6214478796b19a374cbc1301";
// var q = "";
// // just default values for the years here
// var byear = "";
// var eyear = "";

// $("#submit-btn").on("click", function() {
//   event.preventDefault();
//   q = $("#searchTerm").val().trim();
//   byear = $("#startDate").val().trim();
//   eyear = $("#endDate").val().trim();
//   console.log(q);

//   var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
//   url += '?' + $.param({
//     'api-key': key,
//     'q': q
//     // 'begin_date': byear + "0101",
//     // 'end_date': eyear + "1231"
//   });

//   $.ajax({
//     url: url,
//     method: 'GET',
//   }).done(function(result) {
//     console.log(result);
//     console.log(url);

//     console.log(result.reponse.docs[0].headline.main);
//     console.log(result.reponse.docs[0].headline.main);


//   }).fail(function(err) {
//     throw err;
//   });

// });

// url = "";
// key = "a4921eeb6214478796b19a374cbc1301";

// function makeUrl() {
//   url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
//   searchq = $("#searchTerm").val().trim();
//   api = {'api-key': key}
//   q = {'q': searchq}

//   url = url + $.param(api);
//   url = url + $.param(q);
// }

// console.log(url);

// makeUrl();

// console.log(url);

// $.ajax({
//   url: url,
//   method: 'GET',
//   }).done(function(result) {
//     console.log(result);
//   }).fail(function(err) {
//     throw err;
//   });


// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "a4921eeb6214478796b19a374cbc1301",
//   'q': "blade runner"
// });
// $.ajax({
//   url: url,
//   method: 'GET',
// }).done(function(result) {
//   console.log(result);
// }).fail(function(err) {
//   throw err;
// });

function updatePage(result) {
  $("#searchResults").empty();

  console.log(result);
  console.log(result.response.docs[0].headline.main);

  var numArticles = $("#numRecords").val();

  var articleList = $("<ul class='list-group'></ul>");

  for (i=0; i < numArticles; i++) {
    var headline = result.response.docs[i].headline.main;
    var url = result.response.docs[i].web_url;

    newli = $("<li class='list-group-item'>" + headline + "</li>");
    newli.append("<br>");
    newli.append("<a href='" + url + "'>" + "Link" + "</a>");

    articleList.append(newli);
    console.log(newli);
    console.log(headline);
  }

  $("#searchResults").append(articleList);

}

function buildURL() {
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

  var queryParams = {"api-key" : "a4921eeb6214478796b19a374cbc1301"};

  // this makes another item in the object queryParams
  // it has key of 'q' and a value of the string in the search term (#search-term)
  queryParams.q = $("#searchTerm").val().trim();
  console.log(queryParams);

  // grabs string from startDate input
  var startDate = $("#startDate").val().trim();
  console.log(startDate);
  console.log(parseInt(startDate));

  // this checks if there is number is in the #startDate input
  // parseInt converts a string to an integer
  // parseInt will return false if startDate is equal to letters or an empty string
  // if true, it will create another item in queryParams
  if (parseInt(startDate)) {
    queryParams.begin_date = startDate + "0101";
  }
  console.log(queryParams);
  
  // same as above with end date
  var endDate = $("#endDate").val().trim();
  if (parseInt(endDate)) {
    queryParams.end_date = endDate + "0101";
  }
  console.log(queryParams);

  // $.param() is a magic function that turns an object into parameters for the queryURL
  var query = $.param(queryParams);
  console.log(query);
  console.log(queryURL + query);

  return queryURL + query;
}

$("#submit-btn").on("click", function() {
  event.preventDefault();
  
  var queryURL = buildURL();
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(result) {
    console.log(result);
    updatePage(result);
  }).fail(function(err) {
    throw err;
  });
});