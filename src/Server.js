/* Spin up a simple express server */
import express from 'express'
import fallback from 'express-history-api-fallback'

export default ({publicPath, baseDir, port}) => {
  const app = express();
  app.use(publicPath, express.static(baseDir, { index: '200.html' }))
  app.use(fallback('200.html', {root: baseDir}));
  return app.listen(port, function () {
    console.log(`Server listening at port ${port} \n`);
  });
}