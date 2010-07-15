# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require(File.join(File.dirname(__FILE__), 'config', 'boot'))

require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

require 'tasks/rails'

# Tried to use annotate gem, but the following line:
# require 'tasks/annotations.rake'
#
# results in the following error:
# rake aborted!
# no such file to load -- annotations.rake
# /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/rubygems/custom_require.rb:31:in `gem_original_require'
# /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/1.8/rubygems/custom_require.rb:31:in `require'
# /Library/Ruby/Gems/1.8/gems/activesupport-2.3.8/lib/active_support/dependencies.rb:156:in `require'
# /Library/Ruby/Gems/1.8/gems/activesupport-2.3.8/lib/active_support/dependencies.rb:521:in `new_constants_in'
# /Library/Ruby/Gems/1.8/gems/activesupport-2.3.8/lib/active_support/dependencies.rb:156:in `require'
# /Users/kweusijana/Documents/workspace/Smartgraphs/rails/Rakefile:13
# /Library/Ruby/Gems/1.8/gems/rake-0.8.7/lib/rake.rb:2383:in `load'
# /Library/Ruby/Gems/1.8/gems/rake-0.8.7/lib/rake.rb:2383:in `raw_load_rakefile'
# /Library/Ruby/Gems/1.8/gems/rake-0.8.7/lib/rake.rb:2017:in `load_rakefile'
# /Library/Ruby/Gems/1.8/gems/rake-0.8.7/lib/rake.rb:2068:in `standard_exception_handling'
# /Library/Ruby/Gems/1.8/gems/rake-0.8.7/lib/rake.rb:2016:in `load_rakefile'
# /Library/Ruby/Gems/1.8/gems/rake-0.8.7/lib/rake.rb:2000:in `run'
# /Library/Ruby/Gems/1.8/gems/rake-0.8.7/lib/rake.rb:2068:in `standard_exception_handling'
# /Library/Ruby/Gems/1.8/gems/rake-0.8.7/lib/rake.rb:1998:in `run'
# /Library/Ruby/Gems/1.8/gems/rake-0.8.7/bin/rake:31
# /usr/bin/rake:19:in `load'
# /usr/bin/rake:19
