import Express from 'express';
import bodyParser from 'body-parser';
import Asset, { HASHED_PREFIX, prefixKeys } from '../core/assets';
import { URL_PREFIX } from '../settings';
import path from 'path';
import { readFileSync } from 'fs';
import findHash from '../utils/findHash';

const hashResources = JSON.parse(
  readFileSync('C:/Users/n/Documents/sc-assets/_response/hashResources.json', 'utf-8')
);

const app = Express();
const port = 2830;

app.use(bodyParser.text());
app.get('/', (req, res) => {
  res.append('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../../template/preview.html'));
});
app.get('/app.js', (req, res) => {
  res.append('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '../../template/index.js'));
});
app.post('/post', (req, res) => {
  console.log(req.body);
  let name = req.body;
  let asset = new Asset(name);
  for (const key in HASHED_PREFIX) {
    if (name.startsWith(key)) {
      asset.getHash((n) => {
        let fileName = path.basename(n).replace(path.extname(n), '');
        return findHash(fileName, HASHED_PREFIX[key as prefixKeys], hashResources);
      });
      break;
    }
  }
  asset.getUrl();
  res.send(URL_PREFIX + asset.url);
});
app.listen(port, () =>
  console.log(`Preview started, listening on port ${port}\n→ http://localhost:${port}`)
);
