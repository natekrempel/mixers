#! /usr/bin/env node

let styleDirectory = 'Mixers';

const fse = require('fs-extra');
const path = require('path');
const spawn = require('child_process').spawn;
var args = require('minimist')(process.argv.slice(2));

// TODO: Commands
// update (updates sass stylesheets)

const getCurrentDir = () => {
  const currentDir = spawn('/bin/pwd');

  currentDir.stdout.on('data', (data) => {
    copy(data.toString().replace(/[\n\r]/g, ''));
  });

  currentDir.on('error', (code) => {
    console.log(`Error code: ${code}`);
  });
};

const confirmCopy = (dest) => {
  let testForFiles = fse.existsSync(`${dest}/${styleDirectory}`);
  if (testForFiles) {
    console.log(`Files successfully placed in ${dest}`);
  } else {
    console.log(`An error occured placing the files in ${dest}`);
  }
};

const copy = (dest) => {
  fse.copy(`${__dirname}/stylesheets`, `${dest}/${styleDirectory}`, err => {
    if (err) return console.error(err);
    confirmCopy(dest);
  });
};

if (args._.includes('install') && args.dest) {
  console.log(`Installing styles in ${args.dest}`);
  copy(path.normalize(args.dest));
} else if (args._.includes('install')) {
  console.log('Installing styles in the current directory');
  getCurrentDir();
} else if (args._.includes('update')) {
  console.log('Update sass directory, once updated do an install');
} else {
  console.error('Command not found');
}
