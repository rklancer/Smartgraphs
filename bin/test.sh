#!/bin/sh
rm -rf results
bin/hudson.rb -t "apps/smartgraphs" -o results -p "sc-server" -i
open results/*.png
