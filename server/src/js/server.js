let program = require ('commander');
let express = require('express');
let logger = require('morgan');
let path = require('path');
let fs = require('fs');

let app = express();

let port = 3000;

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

program
    .version ('0.0.1')
    .usage ("[options]")
    .option ('-p, --port [value]', 'Optional port (defaults to ' + port + ')')
    .parse (process.argv);

port = program.port || port;

app
    .use(logger('dev'))
    .use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]', {stream: accessLogStream}))
    .use (express.static ('../client/public-assets'))
    .use (express.static ('../data/presentations'))
    .use (express.static ('../data'))
    .use (express.static ('../data/assets'));

app.listen(port, function () {
    console.log ('Listening on HTTP port ' + port);
});

