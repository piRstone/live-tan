var request = require('request');
var _ = require('lodash');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('home')
    });

    app.get('/horaires', function(req, res) {
        const path = "http://open.tan.fr/ewp/tempsattente.json/PETR";
        request(path, function (err, response, body) {
            var horaires = JSON.parse(body);
            var data = [];
            _.forEach(horaires, function(horaire) {
                if (horaire.sens == 2) {
                    data.push(horaire);
                }
            })
            res.send(data);
        });
    });
}
