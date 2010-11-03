# Smartgraphs
### Copyright: ©2010 Concord Consortium

## To install:
    
    $ git clone git://github.com/rklancer/Smartgraphs.git
    $ cd Smartgraphs

### Update Ruby and RVM if needed:
    
    $ rvm update && rvm reload
    $ rvm install 1.9.2

### Create a Smartgraphs gemset and set RVM to use it if you (a) just cloned the repo or (b) updated your Ruby version:
    
    $ rvm use 1.9.2
    $ rvm gemset create Smartgraphs
    $ rvm use 1.9.2@Smartgraphs
    $ rvm 1.9.2@Smartgraphs gemset import
    $ echo "rvm use 1.9.2@Smartgraphs" > .rvmrc

(Trusting the .rvmrc file later means that whenever you cd into the Smartgraphs directory RVM will execute the .rvmrc 
script in your shell.)

### Import/update the project dependencies via `git submodule`

    $ mkdir -p frameworks
    $ git submodule update --init --recursive
    
### Install CouchDB on your system

See below for instructions for installing CouchDB on OS X using MacPorts or Homebrew.

### Set up the `smartgraphs` database in CouchDB and replicate the Smartgraphs code

Try the following:
  
     $ curl http://127.0.0.1:5984/
  
If you get the following response

    {"couchdb":"Welcome","version":"1.0.1"}
    
then you're good to go. (Obviously, a version >= 1.0.1 is fine.)

You may want to set yourself up as an administrator on your local CouchDB instance. If you do not, everyone who can
access your machine via the network can administer your CouchDB instance Add a line to the file `local.ini` (located
in `/opt/local/etc/couchdb/` if using MacPorts) as follows:

    <username> = <password>
    
    Where `<username>` and `<password>` are the username and password you want to use to access your local CouchDB
    instance.

Visit <http://127.0.0.1/_utils/> to see the web interface to CouchDB and to verify your username and password. Once
you do, your plaintext password in the `local.ini` file will be replaced by a hashed version.

Create the CouchDB database called `smartgraphs` as follows:

    $ curl -X PUT http://<username>:<password>@127.0.0.1:5984/smartgraphs

The response should be:

    {"ok":true}

Finally, replicate the Smartgraphs database into your local machine:

    $ curl -i -H 'Content-Type: application/json' -X POST \
      -d '{"source":"http://couchdb.cosmos.concord.org/smartgraphs","target":"http://<username>:<password>@127.0.0.1:5984/smartgraphs"}' http://127.0.0.1:5984/_replicate
      
The response should be something like:

    {"ok":true,"session_id":"94c64a6984b88ff2dade30783df468b3","source_last_seq":15,
    "history":[{"session_id":"94c64a6984b88ff2dade30783df468b3","start_time":"Wed, 03 Nov 2010 17:40:11 GMT",
    "end_time":"Wed, 03 Nov 2010 17:40:12 GMT","start_last_seq":0,"end_last_seq":15,"recorded_seq":15,
    "missing_checked":0,"missing_found":9,"docs_read":9,"docs_written":9,"doc_write_failures":0}]}


### Set up an Apache to proxy SproutCore + CouchDB development on your local machine.

On OS X, turn on Web Sharing via (Apple Menu) -> System Preferences -> Sharing -> Web Sharing

Now, make sure that virtual hosting is enabled by editing `/private/etc/apache2/httpd.conf` and uncommenting the
virtual hosting line (at about line 465 of the stock `httpd.conf`) as follows:

    # Virtual hosts
    Include /private/etc/apache2/extra/httpd-vhosts.conf

Edit the virtual hosting configuration file `/private/etc/apache2/extra/httpd-vhosts.conf` to include the entry:

    <VirtualHost *:80>
      ServerAdmin webmaster@localhost
      DocumentRoot "/opt/local/www/dummy"
      ServerName sc.local
      ProxyRequests Off
      KeepAlive Off
      <Proxy *>
         Order deny,allow
         Deny from all
         Allow from 127.0.0.1
      </Proxy>

       ProxyPass /db/ http://127.0.0.1:5984/ nocanon retry=0
       ProxyPassReverse /db/ http://127.0.0.1:5984/
       ProxyPass / http://127.0.0.1:4020/ retry=0
       ProxyPassReverse / http://127.0.0.1:4020/

    </VirtualHost>

after making changes ...

- test the config: `apachectl configtest` 

(apachectl may complain that the directory `/opt/local/www/dummy` doesn't exist. You can create it if you like,
possibly at an alternate location of your choosing.)

- restart apache:  `sudo apachectl restart`

(For more instructions, set <http://shapeshed.com/journal/setting_up_local_websites_on_snow_leopard/>.)

And, finally, edit your `/etc/hosts` file to include the following line:

    127.0.0.1       sc.local

### Start the development server

(in the root of the Smartgraphs project:)

    $ sc-server -v

This will take over the Terminal window. Do subsequent work in a new Terminal window.


### Visit the Smartgraphs site:

If you visit <http://sc.local/> you should be greeted by the SproutCore Welcome app; if you visit 
<http://sc.local/db/_utils/> you should be greeted by the CouchDB web administration app, Futon.

If these addresses work, visit <http://sc.local/smartgraphs> to see Smartgraphs in action.


### To see test results:

To use TestRunner, open <http://localhost:4020/sproutcore/tests>

To visit all tests directly, open <http://localhost:4020/static/smartgraphs/en/current/tests.html>


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

Do not include the `<user>:<password>@` section in the target url unless it is required to write to your local database.

More information about [replicating couchdb databases](http://wiki.apache.org/couchdb/Replication)    


### Get the latest build number like this:

    sc-build-number smartgraphs    

## Alternative config suggestions:

#### (but see above) Possibly add an entry to /etc/hosts mapping '/db' to 127.0.0.1

As the root user (sudo) add the following to `/etc/hosts`:

    127.0.0.1       db

Confirm that the new entry works:

    $ dscacheutil -q host -a name db
    name: db
    ip_address: 127.0.0.1

It might be necessary to flush the local DNS cache:

    $ sudo dscacheutil -flushcache

#### (but first see above) Possibly add an Apache reverse proxy virtual host mapping /db to the couchdb http server

Add a new vhost entry similar to this in: `/etc/apache2/extra/httpd-vhosts.conf`:

    <VirtualHost db:80>
       ServerName db
       AllowEncodedSlashes On
       ProxyRequests Off
       KeepAlive Off
       <Proxy *>
          Order deny,allow
          Deny from all
          Allow from 127.0.0.1
       </Proxy>
       ProxyPass / http://localhost:5984/ nocanon
       ProxyPassReverse / http://db/
       ErrorLog "/path/to/couchdb/logs/couchdb.localhost-error_log"
       CustomLog "/path/to/couchdb/logs/couchdb.localhost-access_log" common
    </VirtualHost>

after making changes ...

- testing the config: `apachectl configtest`
- restarting apache:  `sudo apachectl restart`

