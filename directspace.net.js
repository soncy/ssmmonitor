/*
 * Created with Sublime Text (buidl 3031).
 * User: soncy
 * Date: 2013-05-04
 * Time: 11:45:45
 * Contact: http://www.qifendi.com
 */

var ssmmonitor = require('./lib/ssmmonitor');

var config = {
    name: 'Directspace', 
    url: 'https://eportal.directspace.net/cart.php?gid=22',
    interval: 120,
    checkFunc: function(data) {
        return checkAvailable(data);
    },
    mailSubject: 'Directspace有货啦'
};

function checkAvailable(data) {
    var results = /(.*?)DSVPS\.1\<\/strong\>(.*?)\<strong(.*?)/.exec(data),
        regString = results[2];

    if (~regString.indexOf('em')) {
        var c = /(.*?)\((.*?) Available(.*?)/.exec(regString);
        if (c && parseInt(c[2]) < 1) {
            return false;
        } 
    }
    return true;
}

ssmmonitor.start(config);