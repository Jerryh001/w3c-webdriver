import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import log from '../src/logger';

const mimeTypes: { [type: string]: string } = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css'
};

const server = http.createServer((req, res) => {
  let uri = url.parse(req.url as string).pathname as string;

  if (uri === '/') uri = '/index.html';

  const filename = path.join(__dirname, uri);
  fs.exists(filename, exists => {
    if (!exists) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found\n');
      res.end();
      return;
    }
    const mimeType = mimeTypes[path.extname(filename).split('.')[1]];
    res.writeHead(200, { 'Content-Type': mimeType });

    const fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);
  });
});

export async function start(port: number) {
  await new Promise(resolve => {
    server.listen(port, resolve);
  });
  log(`Test app started on port ${port}`)
}

export async function stop() {
  await new Promise(resolve => {
    server.close(resolve);
  });
}

if (require.main === module) {
  start(8087);
}
