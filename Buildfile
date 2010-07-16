# ===========================================================================
# Project:   Smartgraphs
# Copyright: ©2010 Concord Consortium
# ===========================================================================

config :all, :required => [:sproutcore]
config :smartgraphs, 
  :required => ['raphael_views/raphael', 'raphael_views/g_raphael', :cc],
  :theme => 'sproutcore/ace'