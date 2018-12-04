// function to update the page with the result information retrieved from the ajax function
function updatePage(result) {
  // clears the html
  $("#searchResults").empty();

  console.log(result);
  console.log(result.response.docs[0].headline.main);

  // grabs amount of articles to display from numRecords input
  var numArticles = $("#numRecords").val();

  // creates a bootstrap unordered list
  var articleList = $("<ul class='list-group'></ul>");

  // loops through responses from ajax
  for (i=0; i < numArticles; i++) {
    // makes var of the headline from the ajax response
    var headline = result.response.docs[i].headline.main;
    // makes var of the url from the ajax response
    var url = result.response.docs[i].web_url;

    // creates a new list item and appends the headline and a link with the url
    newli = $("<li class='list-group-item'>" + headline + "</li>");
    newli.append("<br>");
    newli.append("<a href='" + url + "'>" + "Link" + "</a>");

    // appends the new list item into the unordered list
    articleList.append(newli);
    console.log(newli);
    console.log(headline);
  }

  // appends the whole unordered list into the searchResults html
  $("#searchResults").append(articleList);

}

function buildURL() {
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  // creates the queryParams for the url parameters
  // sets first item to the api-key object
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

  // returns complete URL with query and parameters
  return queryURL + query;
}

// when submit is clicked, url is built and ajax runs
$("#submit-btn").on("click", function() {
  event.preventDefault();
  
  // builds url using the returned value from the function "buildURL()" above 
  var queryURL = buildURL();
  console.log(queryURL);

  // runs ajax function with the built queryURL to return the response object 
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(result) {
    console.log(result);
    // this runs the "updatePage()" function and brings the response information (object) with it
    updatePage(result);
  }).fail(function(err) {
    throw err;
  });
});