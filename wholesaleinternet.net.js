/*
 * Created with Sublime Text (buidl 3031).
 * User: soncy
 * Date: 2013-05-05
 * Time: 14:29:40
 * Contact: http://www.qifendi.com
 */

var ssmmonitor = require('./lib/ssmmonitor'),
    $ = require('jquery').create();

var config = {
    name: 'wholesaleinternet', 
    url: 'https://www.wholesaleinternet.net/dedicated/',
    interval: 60,
    checkFunc: function(data) {
        return checkAvailable(data);
    },
    mailSubject: '19刀有货啦'
};

function checkAvailable(data) {
    var html = $(data),
        pricearea = html.find('.pricearea');

    for (var i = 0; i < 3; i++) { // 判断两个19刀和一个20刀
        if (!(~pricearea.html().indexOf('Out Of Stock'))) {
            return true;
        }
    }
}

ssmmonitor.start(config);