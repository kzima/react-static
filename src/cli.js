import path from 'path'
import Server from './Server'
import snapshots from './snapshots';
import { move } from './writer';

const pkg = require(path.join(process.cwd(), 'package.json'));
const paths = pkg.static.paths || ['/'];
const publicPath = pkg.static.publicPath || '/';
const port = pkg.static.port || '2999';
const baseDir = path.resolve(`./${pkg.static.outputPath}` || './dist');

export default () => {
  const server = Server({publicPath, baseDir, port});
  return Promise.resolve(move({baseDir, from: "index.html", to: "200.html"}))
    .then(() => snapshots({baseDir, paths: pkg.static.paths, port}))
    .then(() => {
      console.log("\nServer stopped.");
      server.close();
      process.exit();
    });
}
