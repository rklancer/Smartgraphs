# ===========================================================================
# Project:   Smartgraphs
# Copyright: ©2010 Concord Consortium
# Author:    Richard Klancer <rpk@pobox.com>
# ===========================================================================

require File.expand_path('../frameworks/jasmine-sproutcore/builders/jasmine_builder', __FILE__)

config :all, :required => [:sproutcore]

config :smartgraphs,
  :required => ['sproutcore/statechart', 'raphael_views/raphael_views', 'raphael_views/g_raphael', 'cc/cc'],
  :load_fixtures => true,
  :theme => :pig

config 'raphael_views/raphael_views', 
  :required => 'raphael_views/raphael'
config 'raphael_views/g_raphael', 
  :required => 'raphael_views/g_raphael_base'
config 'raphael_views/g_raphael_base', 
  :required => 'raphael_views/raphael'

proxy '/db', :to => 'localhost:5984', :url => ''
proxy "/jnlp", :to => "localhost:4321"

namespace :build do
  desc "builds a jasmine unit test"
  build_task :test do
    Jasmine::Builder::Test.build ENTRY, DST_PATH
  end
end
