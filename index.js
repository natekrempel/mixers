#! /usr/bin/env node

let styleDirectory = 'Mixers';

// fse adds file system methods that aren't included in the native fs module ()
const fse = require('fs-extra');
// Node modules used for working with file and directory paths
const path = require('path');
// used to spawn a child process that allows us to run a Shell command in Node
const spawn = require('child_process').spawn;
// used to grab arguments entered in the commandline
var args = require('minimist')(process.argv.slice(2));

// TODO: Commands
// update (updates sass stylesheets)

// Get the path to the directory the user is cd-ed into via the commandline
const getCurrentDir = () => {
  // uses spawn to run the command `pwd` to get the current directory. Using /bin/pwd to ensure the the actual working directory since just `pwd` can be different if a symlink is used.
  const currentDir = spawn('/bin/pwd');

  // Add a listener to the output of the `currentDir` child_process command.
  // stdout gets us the result of the `/bin/pwd` command
  currentDir.stdout.on('data', (data) => {
    // Clean up the returned directory path and pass it into the copy function
    copy(data.toString().replace(/[\n\r]/g, ''));
  });

  // Add a listener if there is an error
  currentDir.on('error', (code) => {
    console.log(`Error code: ${code}`);
  });
};

// Confirm that the mixin directory has been copied to the proper directory
const confirmCopy = (dest) => {
  let testForFiles = fse.existsSync(`${dest}/${styleDirectory}`);
  if (testForFiles) {
    console.log(`Files successfully placed in ${dest}`);
  } else {
    console.log(`An error occured placing the files in ${dest}`);
  }
};

// Copy the mixins directory to the specified path
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
