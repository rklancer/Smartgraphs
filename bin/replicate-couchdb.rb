#!/usr/bin/env ruby

require 'yaml'

APP_ROOT = File.expand_path('../..',  __FILE__)
CONFIG_PATH = File.join(APP_ROOT, 'config')

JRUBY = (defined? RUBY_ENGINE and RUBY_ENGINE[/(java|jruby)/])

begin
  CONFIG = YAML.load_file(File.join(CONFIG_PATH, 'config.yml'))
rescue Errno::ENOENT
  msg = <<-HEREDOC


*** missing config/config.yml

    cp config/config_sample.yml config/config.yml

    and enter your local couchdb username and password
  
  HEREDOC
  raise msg
end

username = CONFIG[:couchdb_local_username]
password = CONFIG[:couchdb_local_password]

cmd = %Q|curl -i -H 'Content-Type: application/json' -X POST -d '{"source":"http://couchdb.cosmos.concord.org/smartgraphs","target":"http://#{username}:#{password}@127.0.0.1:5984/smartgraphs"}' http://127.0.0.1:5984/_replicate|
system(cmd)
