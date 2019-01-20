var request = require('request');
var _ = require('lodash');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('home', { page_title: 'Médiathèque' })
    });

    app.get('/arrets', function(req, res) {
        const path = "http://open.tan.fr/ewp/arrets.json";
        request(path, function(err, response, body) {
            var stops = JSON.parse(body);
            res.render('stops', { stops: stops });
        })
    });

    app.get('/horaires/:stop', function(req, res) {
        const path = "http://open.tan.fr/ewp/tempsattente.json/"+req.params.stop;
        request(path, function (err, response, body) {
            var data = JSON.parse(body);
            res.render('home', { times: data });
        });
    });
}
