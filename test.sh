rm -rf results
ruby -rubygems capybara-testrunner/hudson.rb -t "apps/smartgraphs" -o results -p "sc-server"
open results/*.png
