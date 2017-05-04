/* Simple wrapper around fs so I can concentrate on what's going on */
import fs from 'fs';
import path from 'path';
import { sync as mkDirPSync } from 'mkdirp';

const move = ({baseDir, from, to}) => {
  const fromPath = path.resolve(baseDir, from);
  if (fs.existsSync(fromPath)) {
    return fs.renameSync(fromPath, path.resolve(baseDir, to));
  }
  return null;
};

const write = ({baseDir, filename, content}) => {
  const newPath = path.join(baseDir, filename);
  const dirName = path.dirname(newPath);
  mkDirPSync(dirName);
  return fs.writeFileSync(newPath, content);
};

export {
  move, 
  write
}