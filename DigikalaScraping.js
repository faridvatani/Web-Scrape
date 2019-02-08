var casper = require('casper').create({
    verbose: false,
	logLevel: 'debug',
	pageSettings: {
        loadImages:  false,
        loadPlugins: false,    
		javascriptEnabled: true,
		encoding: 'utf8',
		customHeaders:{
			'Accept-Language': "fa-IR,en-US",
		}
	}
});
var links = [];
var Url = 'https://www.digikala.com';

function getLinks() {
    var links = document.querySelectorAll('.js-discount-product a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start(Url).then(function(response) {
   this.echo(response.headers.get('Date'));
});

casper.userAgent('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36');

casper.then(function() {
	links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    this.echo(links.length + ' DigiKala Discount Links Found:');
    this.echo(' - '+ Url + links.join('\n - ' + Url)).exit();
});