#! /usr/bin/env node
let userArgs = process.argv.slice(2);
let destination = userArgs[0];
let styleDirectory = 'Mixers';

const fs = require('fs-extra');
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
  fs.copy(`${__dirname}/stylesheets`, `${dest}/${styleDirectory}`, err => {
    if (err) return console.error(err);
    console.log(`Success! Mixers have been placed in ${dest}/${styleDirectory}`);
  });
};

if (destination) {
  copy(path.normalize(destination));
} else {
  getCurrentDir();
}
