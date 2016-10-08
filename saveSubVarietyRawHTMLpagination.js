//This is the final version of the script

//Script opens up the main page of the USDA website (http://apps.ams.usda.gov/CMS/).
//Then clicks on the first crop variety link
//Then saves the first crop variety webpage to an html file.
//
//Type: "casperJS saveSubVarietyRawHTMLpagination.js" at the terminal to run

//Total time to scrape all the pages: 3216261 ms = 53.6 minutes

var casper = require('casper').create({
  clientScripts: ["jquery-3.1.0.js"],
  waitTimeout: 20000,
	verbose: true,
	logLevel: 'debug',
	pageSettings: {
		loadImages: false,
		loadPlugins: false,
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)'
	}
});

var x = require('casper').selectXPath;
var fs = require('fs');
var filename = "";
var htmlCode;
var homepage = 'http://apps.ams.usda.gov/CMS/';

//load the file tempCrops; typeof(tempCrops) = string
//cropList.JSON contains all the crop names
var tempCrops = fs.read('cropList.JSON')

//convert tempCrops into an array of crops
var crops = JSON.parse(tempCrops)

var terminate = function() {
	this.echo("Exiting..").exit();
};

casper.start();

casper.eachThen(crops, function(response) {
  tempName = response.data;
  casper.echo(response.data);

  casper.thenClick(x('//a[text()="' + response.data + '"]'), function(){

    casper.then(function(){
      casper.echo(fetchText(x('//td[@colspan="9"]/span')))
      casper.echo(casper.fetchText(x('//td[contains(@colspan,"9")]/span')));
    });

    casper.then(function(){
      htmlCode = casper.getHTML();
      fname = tempName + ".html";
      fs.write(fname, htmlCode, 'w');
    });

    casper.then(function(){
      casper.thenOpen(homepage);
    });

  });
});

casper.run();
