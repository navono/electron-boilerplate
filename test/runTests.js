const spawn = require('cross-spawn');
const path = require('path');

const s = `\\${path.sep}`;
const pattern = process.argv[2] === 'e2e'
  ? `test${s}.+\\.spec\\.tsx?`
  : '__tests__/.*\.(jsx?|tsx?)';

const result = spawn.sync(path.normalize('./node_modules/.bin/jest'), [pattern], { stdio: 'inherit' });
process.exit(result.status);
