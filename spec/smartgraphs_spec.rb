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


describe "Smartgraphs" do
  before(:all) do
    start_testing_servers
    @test = new_test
    # defined with app.define_path in the helper
    @activity = @test['activity']
    @step = @test['description']
    @graph = @test['graph']
  end

  after(:all) do
    stop_testing_servers
  end

  it "should have a top bar, bottom bar, and main section" do
    @test['top_toolbar'].should_not be nil
    @test['bottom_toolbar'].should_not be nil
    @activity.should_not be nil
  end
  
  it "should have an activity step description" do
    @step.activityStepDialog.should_not be nil
    @step.activityStepDialog.beforeText.content.should == "<p>Click a point, any point.</p>"
    @step.buttonsView.submitButton.should be_a_kind_of ButtonView
  end
  
  it "should have an inactive OK button" do
    @step.buttonsView.submitButton.isEnabled.should be false
    @step.buttonsView.submitButton.click # should do nothing
    @step.activityStepDialog.beforeText.content.should == "<p>Click a point, any point.</p>"
  end
  
  # TODO: This route tries to do the activity
  # it "should activate the button on clicking a point" do
  #   @step.buttonsView.submitButton.isEnabled.should be false
  #   @graph.should_not be nil
  #   # TODO: Need a proxy to check a custom view type like this
  #   # @activity.dataWrapper.dataView.contentView.topPaneWrapper.topPane.contentView.graphView.graphCanvasView.dataHolder should be_a_kind_of RaphaelView
  #   @graph.graphCanvasView.dataHolder.childViews.firstObject().childViews.objectAt(1).click # Select a point, I hope
  #   @graph.graphCanvasView.dataHolder.childViews.firstObject().childViews.objectAt(1).isSelected.should be true
  #   @step.buttonsView.submitButton.isEnabled.should be true
  # end
end