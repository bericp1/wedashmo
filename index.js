const mac_regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/g;
const defaults = {
  ouimeaux: null,
  timeout: 3000
};

const EventEmitter = require('events'),
  spawnSync = require('child_process').spawnSync,

  dash_button = require('node-dash-button'),
  extend = require('extend');

class Server extends EventEmitter {

  constructor(dash_mac, wemo_name, options) {
    super();
    if(typeof options !== 'object') options = {};
    options = extend({}, defaults, options);

    if(typeof dash_mac !== 'string') {
      throw new Error('Must provide Dash button\'s MAC address.');
    } else if(!mac_regex.test(dash_mac = dash_mac.trim())) {
      throw new Error('Provided MAC address for Dash button is invalid.');
    } else {
      dash_mac = dash_mac.replace('-', ':').toLowerCase();
    }

    if(typeof wemo_name !== 'string' || !(wemo_name = wemo_name.trim())) {
      throw new Error('Must provide the name of the WeMo Switch/Plug you want to toggle. See docs.');
    }

    this.started = false;
    this.dash_mac = dash_mac;
    this.wemo_name = wemo_name;
    this.options = options;

    if(this.options.ouimeaux === null) {
      this.options.ouimeaux = require('which').sync('wemo');
    }
  }

  start(cb) {
    if(typeof cb !== 'function') cb = function() {};
    this.emit('starting');

    // Run `wemo list` so we can test for wemo's existence right off the bat.
    const list = this.wemo('list');

    if(list.error) {
      throw new Error('Failed to validate ouimeaux\'s `wemo` command. Please ensure ouimeaux is installed ' +
        'and provide the full absolute path to the `wemo` executable.');
    } else if(list.status !== 0) {
      throw new Error('WeMo command found but failed to execute: ' + list.stderr.toString());
    }

    var dash = dash_button(this.dash_mac, null, this.options.timeout, 'all');

    this.started = true;
    this.emit('started', dash);

    dash.on("detected", () => {
      this.emit('press');
      this.toggle();
      this.emit('toggle');
    });
  }

  wemo() {
    const args = Array.prototype.slice.apply(arguments);
    return spawnSync(this.options.ouimeaux, args);
  }

  toggle() {
    const result = this.wemo('switch', this.wemo_name, 'toggle');
    if(result.error)
      throw new result.error;
    else if(result.status !== 0)
      throw new Error(result.stderr.toString());
    else
      return true;
  }

}

module.exports = { Server, defaults };