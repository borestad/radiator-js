#!/usr/bin/env node

/*
 * Radiator.JS
 * https://github.com/borestad/radiator-js
 *
 * Copyright (c) 2014 Johan Borestad
 * Licensed under the MIT license.
 */

'use strict';

var cluster = require('cluster'),
    cpus = require('os').cpus().length;

module.exports = function() {
  if (cluster.isMaster) {
    console.log('Warming up your frozen soul with %s cpu\'s\n', cpus);

    for (var i = 0; i <= cpus; i++) {
      cluster.fork();
    }
  } else {
    console.log('Warming like crazy on PID "%s" ', process.pid);
    while(true) {}
  }
};