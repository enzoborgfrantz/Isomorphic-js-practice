import Hapi from 'hapi';
import nunjucks from 'nunjucks';

nunjucks.configure('./dist');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 6969,
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    nunjucks.render('index.html', {
      name: request.query.name,
      surname: request.query.surname && request.query.surname.split('_').join(' '),
    }, function (err, html) {
      reply(html);
    })
  }
});

server.start();
