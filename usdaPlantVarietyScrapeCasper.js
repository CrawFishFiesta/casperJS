//This is a simple scraper written in casperJS
//It opens a USDA webpage, extracts all the crop varieties and saves them to a
//  file.
//To run the file type: "casperJS usdaPlantVarietyScrapeCasper.js" into the
//  the command line.

var casper = require('casper').create({
  waitTimeout: 34000,
	verbose: true,
	logLevel: 'debug',
	pageSettings: {
		loadImages: false,
		loadPlugins: false,
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)'
	}
});

var x = require('casper').selectXPath

var fs = require('fs');
var links=[];
var plants=[];

casper.start("http://apps.ams.usda.gov/CMS/");

casper.then(function() {
		links = this.getElementsAttribute(x('//a[contains(@href,"javascript")]'), 'href');
    plants = this.fetchText(x('//a[contains(@href,"javascript")]'));
		//this.echo(links);
    fs.write("plantVarieties.json", JSON.stringify(plants), 'w');
    fs.write("plantLinks.json", JSON.stringify(links), 'w');
});

casper.run();
