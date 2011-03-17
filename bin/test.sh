#!/bin/sh
rm -rf results
bin/hudson.rb -t "apps/smartgraphs" -o results -p "sc-server" -i
if [ `uname` == "Darwin" ] ; then open results/*.png ; fi
