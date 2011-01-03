# ==========================================================================
# Project:   Smartgraphs Lebowski test specification
# Copyright: ©2010 Concord Consortium
# @author    Parker Morse <pmorse@cantinaconsulting.com>
# @author    Based on an original by Noah Paessel for MySystem
# ==========================================================================

# This helper provides several convenience methods and loads proxies for objects to be tested.
require "#{File.dirname(__FILE__)}/support/smartgraphs_spec_helper.rb"
require 'rubygems'
require 'lebowski'

TEST_SETTINGS = {
  :app_root_path => "/smartgraphs#/shared/slope-tool-demo",
  :app_name => "Smartgraphs",
  :app_server_port => TEST_PORT,
  :selenium_server_port => SELENIUM_PORT,
  :browser => :firefox
}

def new_test
  app =  MainApplication.new TEST_SETTINGS
  app.start
  app.maximize  # TODO: Seems like dragging doesn't work unless we are maximized.
  sleep 2       # TODO: hackish pause, CanvasView is not ready otherwise..
  # TODO: Would be helpful to define proxies for ToolbarView and SplitView if we wanted to seriously test these.
  app.define_path 'activity', 'activityPage.activityView', View
  app.define_path 'description', 'activityPage.activityView.instructionsWrapper.instructionsView.textWrapper.activityStepWrapper', View
  app.define_path 'graph', 'activityPage.activityView.dataWrapper.dataView.contentView.topPaneWrapper.topPane.contentView.graphView', View
  app.define_path 'graph_data', 'activityPage.activityView.dataWrapper.dataView.contentView.topPaneWrapper.topPane.contentView.graphView.graphCanvasView.dataHolder', View
  app.define_path 'graph_annotations', 'activityPage.activityView.dataWrapper.dataView.contentView.topPaneWrapper.topPane.contentView.graphView.graphCanvasView.annotationsHolder', View
  app.define_path 'table', 'activityPage.activityView.dataWrapper.dataView.contentView.bottomPaneWrapper.bottomPane.contentView.tableColumnView.scrollView.contentView', View
  # Above is activity-specific
  app.define_path 'main_pane', 'mainPage.mainPane', Pane
  return app
end

describe "Smartgraphs" do
  before(:all) do
    start_testing_servers
    @test = new_test
    
    # defined with app.define_path in the helper
    @activity = @test['activity']
    @graph = @test['graph']
    @pane = @test['main_pane']
    @graph_annotations = @test['graph_annotations']
    @graph_data = @test['graph_data']
    @table = @test['table']
    @step = @test['description']
    # Smartgraphs.mainPage.mainPane.container.topLeftView.containerView.contentView.childViews.undefined
  end

  after(:all) do
    stop_testing_servers
  end

  it "should have a graph and a table" do
    @graph.should_not be nil
    @table.should_not be nil
  end
  
  it "should move the HighlightedPoint when data points on the table are clicked" do
    @table.childViews.count.should be > 1
    @graph_data.childViews.count.should be 1 # Odd, this should be > 1
    @graph_annotations.childViews.count.should be 1
    @graph_annotations.childViews.first.should be_a_kind_of HighlightedPointView
    @step.buttonsView.submitButton.should be_a_kind_of ButtonView
    @step.buttonsView.submitButton.isEnabled.should be false
    @table.xsView.childViews[2].click # Click in the table
    @step.buttonsView.submitButton.isEnabled.should be true # Point selected, we can advance now
  end

end