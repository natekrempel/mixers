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

// const confirmCopy = () => {
//   console.log('confirming files copied');
// };

const copy = (dest) => {
  fs.copy(`${__dirname}/stylesheets`, `${dest}/${styleDirectory}`, err => {
    if (err) return console.error(err);
    console.log('success!');
  });
  // console.log(`Placing files in ${dest}/${styleDirectory}`);
  // const copyDir = spawn('/bin/cp', ['-r', `${__dirname}/stylesheets`, `${dest}/${styleDirectory}`]);
  //
  // copyDir.stdout.on('data', (data) => {
  //   // console.log(`Success! Mixers have been placed in ${dest}/${styleDirectory}`);
  // });
  //
  // copyDir.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`);
  // });
  //
  // copyDir.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  //   confirmCopy();
  //   // Test to confirm files are where they should be
  //   // Return a success message if they are
  // });
};

if (destination) {
  copy(path.normalize(destination));
} else {
  getCurrentDir();
}
