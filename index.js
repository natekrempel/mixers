#! /usr/bin/env node
'use strict';

var userArgs = process.argv.slice(2);
var destination = userArgs[0];
var styleDirectory = 'Mixers';

var fs = require('fs-extra');
var path = require('path');
var spawn = require('child_process').spawn;

var getCurrentDir = function getCurrentDir() {
  var currentDir = spawn('/bin/pwd');

  currentDir.stdout.on('data', function (data) {
    copy(data.toString().replace(/[\n\r]/g, ''));
  });

  currentDir.on('error', function (code) {
    console.log('Error code: ' + code);
  });
};

var copy = function copy(dest) {
  fs.copy(__dirname + '/stylesheets', dest + '/' + styleDirectory, function (err) {
    if (err) return console.error(err);
    console.log('Success! Mixers have been placed in ' + dest + '/' + styleDirectory);
  });
};

if (destination) {
  copy(path.normalize(destination));
} else {
  getCurrentDir();
}