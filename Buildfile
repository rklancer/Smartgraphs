# ===========================================================================
# Project:   Smartgraphs
# Copyright: ©2010 Concord Consortium
# Author:    Richard Klancer <rpk@pobox.com>
# ===========================================================================

config :all, :required => [:sproutcore]

config :smartgraphs,
  :required => ['raphael_views/raphael_views', 'raphael_views/g_raphael', 'cc/cc'],
  :theme => :pig

config 'raphael_views/raphael_views', 
  :required => 'raphael_views/raphael'
config 'raphael_views/g_raphael', 
  :required => 'raphael_views/g_raphael_base'
config 'raphael_views/g_raphael_base', 
  :required => 'raphael_views/raphael'

proxy '/db', :to => 'localhost:5984', :url => ''
proxy "/jnlp", :to => "localhost:4321"
