# ==========================================================================
# Project:   Smartgraphs Lebowski test helper
# Copyright: ©2010 Concord Consortium
# @author    Parker Morse <pmorse@cantinaconsulting.com>
# @author    Based on an original by Noah Paessel for MySystem
# ==========================================================================

require 'rubygems'
require 'lebowski'

dir = File.dirname(__FILE__) 
# Load Lebowski proxy objects, which should be in this directory
# Dir.glob(dir + '/*_view.rb') {|viewfile| require viewfile}
# require dir + '/link.rb'

include Lebowski::Foundation
# include Lebowski::SCUI::Views
# include MySystem::Views

# ProxyFactory.proxy NodeView
# ProxyFactory.proxy AddButtonView
# ProxyFactory.proxy Link

TEST_PORT =  ENV[:TEST_PORT.to_s] || 4022;
SELENIUM_PORT = ENV[:SELENIUM_PORT.to_s] || 4244;
TEST_SETTINGS = {
  :app_root_path => "/smartgraphs#/shared/slope-tool-demo",
  :app_name => "Smartgraphs",
  :app_server_port => TEST_PORT,
  :selenium_server_port => SELENIUM_PORT,
  :browser => :firefox
}


$commands = {
  :sproutcore => {
    :path => "sc-server --port #{TEST_PORT}",
    :name => "sproutcore server",
    :pid => nil
  },
  :lebowski => {
    :path => "lebowski-start-server -port #{SELENIUM_PORT}",
    :name => "lebowski",
    :pid => nil
  }
}

RSpec::Matchers.define :have_node_item_view_support do |sig|
  match do |obj|
    obj.respond_to? :has_node_item_view_support
  end
end


# create a new started test applicaion 

def new_test
  app =  MainApplication.new TEST_SETTINGS
  app.start
  app.maximize  # TODO: Seems like dragging doesn't work unless we are maximized.
  sleep 2       # TODO: hackish pause, CanvasView is not ready otherwise..
  # TODO: Would be helpful to define proxies for ToolbarView and SplitView if we wanted to seriously test these.
  app.define_path 'top_toolbar', 'mainPage.mainPane.topToolbar', View
  app.define_path 'bottom_toolbar', 'mainPage.mainPane.bottomToolbar', View
  app.define_path 'activity', 'activityPage.activityView', View
  app.define_path 'description', 'activityPage.activityView.instructionsWrapper.instructionsView.textWrapper.activityStepWrapper', View
  app.define_path 'graph', 'activityPage.activityView.dataWrapper.dataView.contentView.topPaneWrapper.topPane.contentView.graphView', View
  return app
end

def start_command(name)
  command = $commands[name.to_sym]
  unless command[:pid]
    command[:pid] = fork do
      puts "Starting process  #{command[:name] || name} with #{command[:path]} #{command[:args]}"
      Signal.trap("HUP") do
        puts "Stopping process #{command[:name] || name}"
        exit
      end
      if (command[:args])
        exec(command[:path] || name, command[:args])
      else
        exec(command[:path])
      end
    end
    puts "Started  #{command[:name] || name} with PID: #{command[:pid]}" 
  else
    puts "WARNING: process  #{command[:name] || name} already started with #{command[:pid]}"
  end
  sleep 2 # Hackish pause to spin up job.
end


def stop_command(name)
  command = $commands[name.to_sym]
  if command && command[:pid]
    Process.kill('TERM',command[:pid])
    Process.wait(command[:pid])
    command[:pid] = nil;
    puts "#{command[:name] || name} stopped"
  else
    puts "WARNING: #{command[:name] || name} does not seem to be running"
  end
end

def start_testing_servers
  $commands.keys.each do |command|
    start_command(command)
  end
end

def stop_testing_servers
  $commands.keys.each do |command|
    stop_command(command)
  end
end

def with_lebowsk_server (&block)
  start_testing_servers
  sleep 2 #shouldn't have to wait, but there ya-go.
  yield
  stop_testing_servers
end
