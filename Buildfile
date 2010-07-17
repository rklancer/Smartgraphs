# ===========================================================================
# Project:   Smartgraphs
# Copyright: ©2010 Concord Consortium
# ===========================================================================

config :all, :required => [:sproutcore]
config :smartgraphs, 
  :required => :raphael_views,
  :load_fixtures => true,
  :theme => 'sproutcore/ace'