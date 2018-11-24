const puppeteer = require('puppeteer')
var mongoose = require('mongoose')
var labelModel = require("./schema.js").getModel();
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var fs = require('fs')
var app = express()
    , dbUri = process.env. MONGODB_RUI || 'mongodb://127.0.0.1/knowledge'
    , server = http.createServer(app)
    , port = process.env.PORT ? parseInt(proces.env.PORT) : 27018;
;

mongoose.connect(dbUri, function(err){
	if (err){
		return console.log(err)
	}

async function scrapeSite(url){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
        return document.querySelector('html').innerHTML; 

    });

    browser.close();
    return result; 
};

console.log("label1")

labelModel.find({}, async function(err, labels) {
	console.log("label2")
	if(err) {
		console.log(err)
		return
	}
	console.log("label3")
		for (var i = 0; i < labels.length; i++) {
			var label = labels[i]
			var url = label.url
            label.text = await scrapeSite(url);
			label.save();
			console.log("label4")
	    }
})



})