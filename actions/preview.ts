import Express from 'express';
import bodyParser from 'body-parser';
import Asset from '../core/assets';
import { URL_PREFIX } from '../settings';
import path from 'path';

const app = Express();
const port = 4120;

app.use(bodyParser.text());
app.get('/', (req, res) => {
  res.append('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../template/preview.html'));
});
app.get('/app.js', (req, res) => {
  res.append('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '../template/app.js'));
});
app.post('/post', (req, res) => {
  console.log(req.body);
  let asset = new Asset(req.body);
  asset.getUrl();
  res.send(URL_PREFIX + asset.url);
});
app.listen(port, () =>
  console.log(`Preview started, listening on port ${port}\n→ http://localhost:${port}`)
);
