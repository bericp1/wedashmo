#!/usr/bin/env node

var program = require('commander');

var wedashmo = require('./index'),
  pkg = require('./package.json');

program
  .version(pkg.version)
  .option('-d, --dash <dash_mac_addr>', 'The MAC address of your Dash button. (see docs)')
  .option('-w, --wemo <wemo_name>', 'The name of your WeMo Switch/Plug. (see docs)')
  .option('-o, --ouimeaux [ouimeaux]', 'The path to ouimeaux\'s wemo exexutable. (see docs)')
  .option('-t, --timeout [timeout]', 'The timeout in milliseconds between button presses.')
  .option('-v, --verbose', 'Whether or not to output events to stdout.');

program.parse(process.argv);

if(!program.dash || !program.wemo) {
  console.error("Too few arguments.");
  program.outputHelp();
  process.exit(2);
}

var dash_addr = program.dash,
  wemo_name = program.wemo,
  verbose = !!program.verbose,
  options = {};

if(program.ouimeaux) {
  options.ouimeaux = program.ouimeaux;
}
if(program.timeout) {
  options.timeout = parseInt(program.timeout);
}

try {
  const server = new wedashmo.Server(program.dash, program.wemo, options);
  server
    .on('starting',   () => verbose && console.log('Starting up...'))
    .on('started',    () => verbose && console.log('Now listening...'))
    .on('press',      () => verbose && console.log('Heard press! Attempting to toggle...'))
    .on('toggle',     () => verbose && console.log('Toggle successful!'));

  server.start();
} catch(e) {
  console.error('Error creating wedashmo server: %s', e);
}