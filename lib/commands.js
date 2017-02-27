#! /usr/bin/env node
let userArgs = process.argv.slice(2);
let destination = userArgs[0];
let styleDirectory = 'Mixers';

const path = require('path');
const spawn = require('child_process').spawn;

const getCurrentDir = () => {
  const currentDir = spawn('/bin/pwd');

  currentDir.stdout.on('data', (data) => {
    copy(data.toString().replace(/[\n\r]/g, ''));
  });

  currentDir.on('error', (code) => {
    console.log(`Error code: ${code}`);
  });
};

const copy = (dest) => {
  const copyDir = spawn('/bin/cp', ['-r', `${__dirname}/stylesheets`, `${dest}/${styleDirectory}`]);

  copyDir.stdout.on('data', (data) => {
    console.log(`Success! Mixers have been placed in ${dest}/${styleDirectory}`);
  });

  copyDir.on('error', (code) => {
    console.log(`Error code: ${code}`);
  });
};

if (destination) {
  copy(path.normalize(destination));
} else {
  getCurrentDir();
}
