# ===========================================================================
# Project:   Smartgraphs
# Copyright: ©2010 Concord Consortium
# ===========================================================================

config :all, :required => [:sproutcore]

config :smartgraphs,
  :required => ['raphael_views/raphael_views', 'raphael_views/g_raphael'],
  :load_fixtures => true,
  :theme => 'sproutcore/ace'

config 'raphael_views/raphael_views', 
  :required => 'raphael_views/raphael'
config 'raphael_views/g_raphael', 
  :required => 'raphael_views/g_raphael_base'
config 'raphael_views/g_raphael_base', 
  :required => 'raphael_views/raphael'