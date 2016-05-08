var Browser = require('./browser');

// address.h
const PROTO_INET    =  0;
const PROTO_INET6   =  1;
const PROTO_UNSPEC  = -1;

const IF_UNSPEC     = -1;

// defs.h
// AvahiPublishFlags
const PUBLISH_UNIQUE = 1;
const PUBLISH_NO_PROBE = 2;
const PUBLISH_NO_ANNOUNCE = 4;
const PUBLISH_ALLOW_MULTIPLE = 8;
const PUBLISH_NO_REVERSE = 16;
const PUBLISH_NO_COOKIE = 32;
const PUBLISH_UPDATE = 64;
const PUBLISH_USE_WIDE_AREA = 128;
const PUBLISH_USE_MULTICAST = 256;
// AvahiLookupFlags
const LOOKUP_USE_WIDE_AREA = 1;
const LOOKUP_USE_MULTICAST = 2;
const LOOKUP_NO_TXT = 4;
const LOOKUP_NO_ADDRESS = 8;
// AvahiLookupResultFlags
const LOOKUP_RESULT_CACHED = 1;
const LOOKUP_RESULT_WIDE_AREA = 2;
const LOOKUP_RESULT_MULTICAST = 4;
const LOOKUP_RESULT_LOCAL = 8;
const LOOKUP_RESULT_OUR_OWN = 16;
const LOOKUP_RESULT_STATIC = 32;
const DNS_TYPE_A = 0x01;
const DNS_TYPE_NS = 0x02;
const DNS_TYPE_CNAME = 0x05;
const DNS_TYPE_SOA = 0x06;
const DNS_TYPE_PTR = 0x0C;
const DNS_TYPE_HINFO = 0x0D;
const DNS_TYPE_MX = 0x0F;
const DNS_TYPE_TXT = 0x10;
const DNS_TYPE_AAAA = 0x1C;
const DNS_TYPE_SRV = 0x2;
const DNS_CLASS_IN = 0x01;

exports.PROTO_INET = PROTO_INET;
exports.PROTO_INET6 = PROTO_INET6;
exports.PROTO_UNSPEC = PROTO_UNSPEC;
exports.IF_UNSPEC = IF_UNSPEC;
exports.PUBLISH_UNIQUE = PUBLISH_UNIQUE;
exports.PUBLISH_NO_PROBE = PUBLISH_NO_PROBE;
exports.PUBLISH_NO_ANNOUNCE = PUBLISH_NO_ANNOUNCE;
exports.PUBLISH_ALLOW_MULTIPLE = PUBLISH_ALLOW_MULTIPLE;
exports.PUBLISH_NO_REVERSE = PUBLISH_NO_REVERSE;
exports.PUBLISH_NO_COOKIE = PUBLISH_NO_COOKIE;
exports.PUBLISH_UPDATE = PUBLISH_UPDATE;
exports.PUBLISH_USE_WIDE_AREA = PUBLISH_USE_WIDE_AREA;
exports.PUBLISH_USE_MULTICAST = PUBLISH_USE_MULTICAST;
exports.LOOKUP_USE_WIDE_AREA = LOOKUP_USE_WIDE_AREA;
exports.LOOKUP_USE_MULTICAST = LOOKUP_USE_MULTICAST;
exports.LOOKUP_NO_TXT = LOOKUP_NO_TXT;
exports.LOOKUP_NO_ADDRESS = LOOKUP_NO_ADDRESS;
exports.LOOKUP_RESULT_CACHED = LOOKUP_RESULT_CACHED;
exports.LOOKUP_RESULT_WIDE_AREA = LOOKUP_RESULT_WIDE_AREA;
exports.LOOKUP_RESULT_LOCAL = LOOKUP_RESULT_LOCAL;
exports.LOOKUP_RESULT_OUR_OWN = LOOKUP_RESULT_OUR_OWN;
exports.LOOKUP_RESULT_STATIC = LOOKUP_RESULT_STATIC;
exports.DNS_TYPE_A = DNS_TYPE_A;
exports.DNS_TYPE_NS = DNS_TYPE_NS;
exports.DNS_TYPE_CNAME = DNS_TYPE_CNAME;
exports.DNS_TYPE_SOA = DNS_TYPE_SOA;
exports.DNS_TYPE_PTR = DNS_TYPE_PTR;
exports.DNS_TYPE_HINFO = DNS_TYPE_HINFO;
exports.DNS_TYPE_MX = DNS_TYPE_MX;
exports.DNS_TYPE_TXT = DNS_TYPE_TXT;
exports.DNS_TYPE_AAAA = DNS_TYPE_AAAA;
exports.DNS_TYPE_SRV = DNS_TYPE_SRV;
exports.DNS_CLASS_IN = DNS_CLASS_IN;

function createBrowser(bus, name, callback) {
   return function(err, path) {
      if (err) return callback(err);
      return callback(null, new Browser(bus, path, name));
   };
}

exports.Daemon = function(bus) {
    this.addListener = this.on = function(signame, callback) {
        bus.addMatch('type=\'signal\',member=\'' + signame + '\'', function(err, result) {
            if (err) throw new Error(err);
        });
        var signalFullName = bus.mangle('/', 'org.freedesktop.Avahi.Server', signame);
        bus.signals.on(signalFullName, function(messageBody) {
             callback.apply(null, messageBody);
        });

    };
    this.GetVersionString = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetVersionString'
        }, callback);
    };
    this.GetAPIVersion = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetAPIVersion'
        }, callback);
    };
    this.GetHostName = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetHostName'
        }, callback);
    };
    this.SetHostName = function(name, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'SetHostName',
            body: [name], 
            signature: 's'
        }, callback);
    };
    this.GetHostNameFqdn = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetHostNameFqdn'
        }, callback);
    };
    this.GetDomainName = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetDomainName'
        }, callback);
    };
    this.IsNSSSupportAvailable = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'IsNSSSupportAvailable'
        }, callback);
    };
    this.GetState = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetState'
        }, callback);
    };
    this.GetLocalServiceCookie = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetLocalServiceCookie'
        }, callback);
    };
    this.GetAlternativeHostName = function(name, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetAlternativeHostName',
            body: [name],
            signature: 's'
        }, callback);
    };
    this.GetAlternativeServiceName = function(name, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetAlternativeServiceName',
            body: [name],
            signature: 's'
        }, callback);
    };
    this.GetNetworkInterfaceNameByIndex = function(index, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetNetworkInterfaceNameByIndex',
            body: [index],
            signature: 'i'
        }, callback);
    };
    this.GetNetworkInterfaceIndexByName = function(name, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'GetNetworkInterfaceIndexByName',
            body: [name],
            signature: 's'
        }, callback);
    };
    this.ResolveHostName = function(interface, protocol, name, aprotocol, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ResolveHostName',
            body: [interface, protocol, name, aprotocol, flags],
            signature: 'iisiu'
        }, callback);
    };
    this.ResolveAddress = function(interface, protocol, address, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ResolveAddress',
            body: [interface, protocol, address, flags],
            signature: 'iisu'
        }, callback);
    };
    this.ResolveService = function(interface, protocol, name, type, domain, aprotocol, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ResolveService',
            body: [interface, protocol, name, type, domain, aprotocol, flags],
            signature: 'iisssiu'
        }, callback);
    };
    this.EntryGroupNew = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'EntryGroupNew'
        }, callback);
    };
    this.DomainBrowserNew = function(interface, protocol, domain, btype, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'DomainBrowserNew',
            body: [interface, protocol, domain, btype, flags],
            signature: 'iisiu'
        }, createBrowser(bus, 'Domain', callback));
    };
    this.ServiceTypeBrowserNew = function(interface, protocol, domain, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ServiceTypeBrowserNew',
            body: [interface, protocol, domain, flags],
            signature: 'iisu'
        }, createBrowser(bus, 'ServiceType', callback));
    };
    this.ServiceBrowserNew = function(interface, protocol, type, domain, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ServiceBrowserNew',
            body: [interface, protocol, type, domain, flags],
            signature: 'iissu'
        }, createBrowser(bus, 'Service', callback));
    };
    this.ServiceResolverNew = function(interface, protocol, name, type, domain, aprotocol, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'ServiceResolverNew',
            body: [interface, protocol, name, type, domain, aprotocol, flags],
            signature: 'iisssiu'
        }, callback);
    };
    this.HostNameResolverNew = function(interface, protocol, name, aprotocol, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'HostNameResolverNew',
            body: [interface, protocol, name, aprotocol, flags],
            signature: 'iisiu'
        }, callback);
    };
    this.AddressResolverNew = function(interface, protocol, address, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'AddressResolverNew',
            body: [interface, protocol, address, flags],
            signature: 'iisu'
        }, callback);
    };
    this.RecordBrowserNew = function(interface, protocol, name, clazz, type, flags, callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.Avahi.Server',
            member: 'RecordBrowserNew',
            body: [interface, protocol, name, clazz, type, flags],
            signature: 'iisqqu'
        }, callback);
    };
};

exports.Daemon['org.freedesktop.DBus.Introspectable'] = function(bus) {
    this.addListener = this.on = function(signame, callback) {
        bus.addMatch('type=\'signal\',member=\'' + signame + '\'', function(err, result) {
            if (err) throw new Error(err);
        });
        var signalFullName = bus.mangle('/', 'org.freedesktop.DBus.Introspectable', signame);
        bus.signals.on(signalFullName, function(messageBody) {
             callback.apply(null, messageBody);
        });
    };
    this.Introspect = function(callback) {
        bus.invoke({
            destination: 'org.freedesktop.Avahi',
            path: '/',
            interface: 'org.freedesktop.DBus.Introspectable',
            member: 'Introspect'
        }, callback);
    };
};

