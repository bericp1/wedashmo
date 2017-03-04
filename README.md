# wedashmo

A simple server that listens for clicks on the local network
from an Amazon Dash button and toggles the status of a WeMo
Switch/Plug.

## Prerequisites

 * [node-dash-button](https://github.com/hortinstein/node-dash-button)
   require's libpcap-dev
   * If on macOS, this should be available out of the box
   * If on linux, [install the libpcap-dev](https://github.com/hortinstein/node-dash-button#installation-instructions)
     (or similar) package with your distro's package manager. 
   * If on Windows, may god help you.
 * [ouimeaux](http://ouimeaux.rtfd.org/), a python command line tool
   * You can either install it globally with `easy_install` (see their
     documentation) or build/install it somewhere else accessible. Just
     be sure to note the full path to the `wemo` executable

## Installation

`wedashmo` can be installed globally and used as a command
line tool:

```
 $ npm install -g wedashmo
```

Or locally and used via a simple API within your node project:

```
 $ npm install --save wedashmo
```

## Setup

To use `wedashmo`, you need:
 * The MAC address of your Dash button
 * The name of your fully set up and connected WeMo Switch or Plug

 1. Find and record the MAC address of your Dash button:
    * To get this, you can use the `findbutton` 
      script that node-dash-button provides. Either run it from
      [their project](https://github.com/hortinstein/node-dash-button)
      or you can run `npm run findbutton` in the root of this project. Once
      the script is running, just press your Dash button and record the first
      MAC address that shows up with `Manufacturer: Amazon Technologies Inc.`
      following it.
 2. If you haven't yet, use the WeMo app on your phone to fully set up
    and name your WeMo Switch or Plug.
    * Record the name exactly as you entered it **or** you can use the
      `wemo list` command provided by [ouimeaux](http://ouimeaux.rtfd.org/)
      which will search for and list all the WeMo devices on your 
      network along with their exact names.

## CLI Usage

### To See Usage/Help

```
 $ wedashmo
 $ wedashmo -h
 $ wedashmo --help
```

### To Start Listening

```
 $ wedashmo -d 00:11:22:33:44:55 -w 'My Switch' -o /usr/local/bin/wemo -t 3000
```

### Options

#### `-d, --dash <dash_mac_addr>`

**Required**

The MAC address of your Dash button. See [Setup](#setup) above.

#### `-w, --wemo <wemo_name>`

**Required**

The exact name of your WeMo Switch or Plug. See [Setup](#setup) above.

#### `-o, --ouimeaux [ouimeaux]`

**Optional**

The path to ouimeaux's `wemo` executable. If this isn't provided,
the `PATH` will be searched automatically for it and the server
will fail with an error if it couldn't be found.

#### `-t, --timeout [timeout]`

**Optional**

The timeout in milliseconds that subsequent Dash button presses 
should be ignored each time a press is detected.

Default: `15000`

#### `-v, --verbose`

**Optional**

Whether or not to output server status, detected presses, etc.

Default: `false`

## API

**TODO**

## Tests

```
 $ npm test
```

## Contribute

Fork, work your beautiful magic, and submit a PR.

## License (**MIT**)

Copyright 2017 Brandon Phillips

See [LICENSE](./LICENSE)
