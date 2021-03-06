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
    interval: 120,
    checkFunc: function(data) {
        return checkAvailable(data);
    },
    mailSubject: '19刀有货啦'
};

function checkAvailable(data) {
    var $html = $(data),
        $pricearea = $html.find('.pricearea');

    for (var i = 0; i < 3; i++) { // 判断两个19刀和一个20刀
        var text = $pricearea.find('.price').html(),
            price = /(.*?)(\d+)(.*?)/.exec(text)[2];
            
        if (!(~$pricearea.html().indexOf('Out Of Stock')) && (price == 19 || price == 20 )) {
            return true;
        }
    }

    $html = $pricearea = null;
}

ssmmonitor.start(config);