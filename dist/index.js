'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nunjucks2.default.configure('./dist');

var server = new _hapi2.default.Server();
server.connection({
  host: 'localhost',
  port: 6969
});

server.route({
  method: 'GET',
  path: '/',
  handler: function handler(request, reply) {
    _nunjucks2.default.render('index.html', {
      name: request.query.name,
      surname: request.query.surname && request.query.surname.split('_').join(' ')
    }, function (err, html) {
      reply(html);
    });
  }
});

server.start();