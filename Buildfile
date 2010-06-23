# ===========================================================================
# Project:   Smartgraphs
# Copyright: ©2010 Concord Consortium
# ===========================================================================

config :all, :required => [:sproutcore, 'g.raphael.plugins', :raphael, :cc]
config 'g.raphael.plugins', :required => ['g.raphael']
config 'g.raphael', :required => [:raphael]