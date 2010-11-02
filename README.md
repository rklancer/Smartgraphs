# Smartgraphs
### Copyright: ©2010 Concord Consortium

## To install:
    
    git clone git://github.com/rklancer/Smartgraphs.git
    cd Smartgraphs

### Update Ruby and RVM if needed:
    
    rvm update && rvm reload
    rvm install 1.9.2

### Create a Smartgraphs gemset and set RVM to use it if you (a) just cloned the repo or (b) updated your Ruby version:
    
    rvm use 1.9.2
    rvm gemset create Smartgraphs
    rvm use 1.9.2@Smartgraphs
    rvm 1.9.2@Smartgraphs gemset import
    echo "rvm use 1.9.2@Smartgraphs" > .rvmrc

Trusting the .rvmrc file later means that whenever you cd into the Smartgraphs directory RVM will execute the .rvmrc script in your shell
### Import/update the project dependencies via `git submodule`

    mkdir -p frameworks
    git submodule update --init --recursive

### Start the development server and visit the Smartgraphs app in your web browser

    sc-server -v

(do subsequent work in a new Terminal window)

### To see test results:

to use TestRunner, open <http://localhost:4020/sproutcore/tests>

to visit all tests directly (in English), open <http://localhost:4020/static/smartgraphs/en/current/tests.html>


## Miscellaneous reference:

#### How to install CouchDB on OS X using [macports](http://www.macports.org/)

    $ sudo port install couchdb
    $ sudo dscl localhost
     > cd /Local/Default/Users
    /Local/Default/Users > change couchdb dsAttrTypeNative:home /dev/null /opt/local/var/lib/couchdb
    /Local/Default/Users > change couchdb dsAttrTypeNative:shell /dev/null /bin/bash

    $ sudo chown -R couchdb:couchdb /opt/local/var/lib/couchdb
    $ sudo chown -R couchdb:couchdb /opt/local/var/log/couchdb
    $ sudo chown -R couchdb:couchdb /opt/local/etc/couchdb
    $ sudo launchctl load -w /Library/LaunchDaemons/org.apache.couchdb.plist
    
#### How to install CouchDB on Mac OS X using [homebrew](http://github.com/mxcl/homebrew)

    $ brew install couchdb

Follow the instructions displayed after a successful installation. 

These instructions can also be displayed with the following command:

    $ brew info couchdb
    couchdb 1.0.1
    http://couchdb.apache.org/
    Depends on: spidermonkey, icu4c, erlang
    /usr/local/Cellar/couchdb/1.0.1 (281 files, 2.4M)

    If this is your first install, automatically load on login with:
        cp /usr/local/Cellar/couchdb/1.0.1/Library/LaunchDaemons/org.apache.couchdb.plist ~/Library/LaunchAgents
        launchctl load -w ~/Library/LaunchAgents/org.apache.couchdb.plist

    If this is an upgrade and you already have the org.apache.couchdb.plist loaded:
        launchctl unload -w ~/Library/LaunchAgents/org.apache.couchdb.plist
        cp /usr/local/Cellar/couchdb/1.0.1/Library/LaunchDaemons/org.apache.couchdb.plist ~/Library/LaunchAgents
        launchctl load -w ~/Library/LaunchAgents/org.apache.couchdb.plist

    Or start manually with:
        couchdb

    http://github.com/mxcl/homebrew/commits/master/Library/Formula/couchdb.rb

### Replicating a remote smartgraphs couchdb databse to your local couchdb instance using curl

    $ curl -i -H 'Content-Type: application/json' -X POST \
    -d '{"source":"http://<remote_host>/smartgraphs","target":"http://<user>:<password>@127.0.0.1:5984/smartgraphs"}' http://127.0.0.1:5984/_replicate

More information about [replicating couchdb databases](http://wiki.apache.org/couchdb/Replication)    

### Get the latest build number like this:

    sc-build-number smartgraphs
