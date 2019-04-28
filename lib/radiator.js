/*
 * Radiator.JS
 * https://github.com/borestad/radiator-js
 *
 * Copyright (c) 2014 Johan Borestad
 * Licensed under the MIT license.
 */

const cluster = require("cluster");
const cpus = require("os").cpus().length;
const readline = require("readline");
const { log } = console;

function progress() {
  let i = 0;
  return setInterval(() => {
    if (++i % 10 === 0) {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
    }
    process.stdout.write(".");
  }, 100);
}

module.exports = function() {
  if (cluster.isMaster) {
    log("Warming up your frozen soul with %s cpu cores\n", cpus);

    for (let i = 1; i <= cpus; i++) {
      const worker = cluster.fork();
      log("Diabetes %s | PID: %s ", i, worker.process.pid);
    }

    progress();

    setTimeout(() => {
      log("\nPress CTRL-C to abort");
    });
  } else {
    while (true) {}
  }
};
