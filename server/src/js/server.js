let program = require ('commander');
let logger = require('morgan');
let path = require('path');
let fs = require('fs');
let express = require('express');
let app = express();
let expressWs = require('express-ws')(app);
let port = 3000;

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});


program
    .version ('0.0.1')
    .usage ("[options]")
    .option ('-p, --port [value]', 'Optional port (defaults to ' + port + ')')
    .parse (process.argv);

port = program.port || port;
let wsServer = expressWs.getWss();


app.disable('etag');
app.get('/*', function(req, res, next){
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});

app
    .use(logger('dev'))
    .use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]', {stream: accessLogStream}))
    .use (express.static ('../client/public-assets'))
    .use (express.static ('../data/presentations'))
    .use (express.static ('../data'))
    .use (express.static ('../data/assets'));

app.ws('/broadcast', function(ws, req) {
    console.log("Master Broadcasting");
    ws.on('message', function(msg) {
      console.log("receiving message");
      console.log(msg);
      if (typeof (msg !== 'undefined')) {
        wsServer.clients.forEach(function (client) {
          console.log("broadcasting message");
          client.send(msg);
        });
      }
    });
});

app.ws('/receive', function(msg) {
  console.log("Slave receiving");
});

app.listen(port, function () {
    console.log ('Listening on HTTP port ' + port);
});

