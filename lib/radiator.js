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
    console.log('Warming up your frozen soul with %s cpu cores\n', cpus);

    for (var i = 0; i < cpus; i++) {
      cluster.fork();
    }
  } else {
    console.log('Working like crazy on core [%s] | PID: %s ', cluster.worker.id, process.pid);
    while(true) {}
  }
};