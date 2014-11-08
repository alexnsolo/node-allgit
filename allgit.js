#!/usr/bin/env node
"use strict";

var exec = require('child_process').exec;
var fs = require('fs');
var path = require("path");

var gitCommand = process.argv.slice(2, process.argv.length);
gitCommand.forEach(function(cmd, index) {
    if (cmd.indexOf(' ') != -1) {
        gitCommand[index] = '"' + cmd + '"';
    }
});
gitCommand = 'git ' + gitCommand.join(' ');

console.log('= ' + gitCommand + '\n\n');

function executeCommandAgainst(dir) {
    var command = 'cd ' + dir + ' & ' + gitCommand + ' & cd ../'; 
    exec(command,  function (error, stdout, stderr) {
        console.log(dir+ ':');
        console.log('-------------------------------------------------------------');
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        console.log();
    });
}

fs.readdir('./', function (err, files) {
    if (err) throw err;

    files.filter(function(file) {
        return fs.statSync(file).isDirectory();
    }).forEach(function(dir) {
        executeCommandAgainst(dir);
    });
});