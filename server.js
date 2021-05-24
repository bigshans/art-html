const Express = require('express');
const app = Express();
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const { updateEventEmitter } = require('./watch');
const WebSocket = require('ws');

const wsStatic = `
<script>
let ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log('open connection');
};

ws.onclose = () => {
    console.log('close connection');
};

ws.onmessage = (msg) => {
    console.log('update');
    location.reload();
};
</script>
`;

let wsList = [];

app.use('/', (req, res, next) => {
  const resourcePath = path.join(__dirname, 'dists', req.path === '/' ? '/index.html' : req.path);
  if (req.path.endsWith('.html')) {
    console.log(resourcePath, req.path);
    const HTML = fs.readFileSync(resourcePath);
    const $ = cheerio.load(HTML);
    $('body').append(wsStatic);
    res.send($.html());
  } else {
    next();
  }
});

app.use('/', Express.static('dists'));

const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on('connection', ws => {
  console.log('ws connected');
  wsList.push(ws);
});

wsServer.on('close', ws => {
  console.log('ws closed');
  wsList = wsList.filter(w => ws !== ws);
});

const server = app.listen(3000, () => console.log('Listened to http://localhost:3000 port'));

server.on('upgrade', (req, socket, head) => {
  console.log('here');
  wsServer.handleUpgrade(req, socket, head, ws => {
    wsServer.emit('connection', ws, req);
  });
});

updateEventEmitter.on('update', () => {
  wsList.forEach(ws => {
    ws.send('update');
  });
});

