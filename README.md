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

#### How to install CouchDB on OS X

    $ sudo port install couchdb
    $ sudo dscl localhost
    /Local/Default/Users > change couchdb dsAttrTypeNative:home /dev/null /opt/local/var/lib/couchdb
    /Local/Default/Users > change couchdb dsAttrTypeNative:shell /dev/null /bin/bash

    $ sudo chown -R couchdb:couchdb /opt/local/var/lib/couchdb
    $ sudo chown -R couchdb:couchdb /opt/local/var/log/couchdb
    $ sudo launchctl load -w /Library/LaunchDaemons/org.apache.couchdb.plist
    

### Get the latest build number like this:

    sc-build-number smartgraphs
