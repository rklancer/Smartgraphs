# ==========================================================================
# Project:   Smartgraphs Lebowski test specification
# Copyright: ©2010 Concord Consortium
# @author    Parker Morse <pmorse@cantinaconsulting.com>
# ==========================================================================

#
# Proxy for the HighlightedPointView view from Smartgraphs.
#
module Smartgraphs
  module Views
    class HighlightedPointView < Lebowski::Foundation::Views::View
      representing_sc_class 'Smartgraphs.HighlightedPointView'
      # TODO: It would be nice to be able to get the point back, but so far that's eluding me.
    end
  end
end
