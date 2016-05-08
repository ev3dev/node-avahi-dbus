node-avahi-dbus
=========

dns-sd client (Avahi/dbus wrapper), fork of [node-gday](https://github.com/sidorares/node-gday)

# install
```sh
  $ npm install avahi-dbus
```

# example

```js
const dbus = require('dbus-native');
const avahi = require('avahi-dbus');
let bus =  dbus.systemBus();

let daemon = new avahi.Daemon(bus);
daemon.ServiceBrowserNew(avahi.IF_UNSPEC, avahi.PROTO_UNSPEC, '_rfb._tcp', 'local', 0, function(err, browser) {
      browser.on('ItemNew', function(interface, protocol, name, type, domain, flags) {
                daemon.ResolveService(interface, protocol, name, type, domain, avahi.PROTO_UNSPEC, 0,
                        function(err, interface, protocol, name, type, domain, host, aprotocol, address, port, txt, flags) {
                                      console.log('New item:', interface, protocol, name, type, domain, host, aprotocol, address, port, txt, flags);
                                              });
                    });
          browser.on('ItemRemove', function(interface, protocol, name, type, domain, flags) {
                    console.log('Removed: ' + name);
                        });
});
```

See [Avahi documentation for methods & parameters description](http://avahi.org/wiki/ProgrammingDocs).
