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
    @menu = @test['edit_menu']
    @pane = @test['main_pane']
    # Smartgraphs.mainPage.mainPane.container.topLeftView.containerView.contentView.childViews.undefined
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
    @step.activityStepDialog.beforeText.content.should == "<p>In this activity, when you see the 'Next Page >>' button turned on, you can go to the next page.</p><p>Go ahead and click on the Next Page button now to see the next page.<p>"
    @step.buttonsView.submitButton.should be_a_kind_of ButtonView
  end
  
  it "should have an active OK button" do
    @step.buttonsView.submitButton.isEnabled.should be true
    @step.buttonsView.submitButton.click # should do nothing
    @step.activityStepDialog.beforeText.content.should == "<p>In this activity, when you see the 'Next Page >>' button turned on, you can go to the next page.</p><p>Go ahead and click on the Next Page button now to see the next page.<p>"
  end
  
  # TODO: This route tries to do the activity, not what we're after at the moment

  # it "should activate the button on clicking a point" do
  #   @step.buttonsView.submitButton.isEnabled.should be false
  #   @graph.should_not be nil
  #   # TODO: Need a proxy to check a custom view type like this
  #   # @activity.dataWrapper.dataView.contentView.topPaneWrapper.topPane.contentView.graphView.graphCanvasView.dataHolder should be_a_kind_of RaphaelView
  #   @graph.graphCanvasView.dataHolder.childViews.firstObject().childViews.objectAt(1).click # Select a point, I hope
  #   @graph.graphCanvasView.dataHolder.childViews.firstObject().childViews.objectAt(1).isSelected.should be true
  #   @step.buttonsView.submitButton.isEnabled.should be true
  # end
  
  it "should have an 'Edit' button" do
    @test['top_toolbar'].editButton.should be_a_kind_of ButtonView
    @test['top_toolbar'].runButton.should be_a_kind_of ButtonView
    @test['top_toolbar'].editButton.isVisible.should be true
    @test['top_toolbar'].runButton.isVisible.should be false
  end
  
  it "should activate the 'Run' button when 'Edit' is clicked" do
    @test['top_toolbar'].editButton.click
    @test['top_toolbar'].editButton.isVisible.should be false
    @test['top_toolbar'].runButton.isVisible.should be true
  end
  
  it "should allow selection of arbitrary pages in 'edit' mode" do
    @menu.childViews[4].should be_a_kind_of ListItemView
    @menu.childViews[5].click
    @test['intro_text'].content.should == "<p>Remember that the data on the right is the Maria's distance, recorded every minute (60 seconds) by her coach.<p>"
  end
  
  it "should activate the 'Edit' button when 'Run' is clicked" do
    @test['top_toolbar'].runButton.click
    @test['top_toolbar'].editButton.isVisible.should be true
    @test['top_toolbar'].runButton.isVisible.should be false
  end
  
  it "should show a text edit field when the intro text is clicked" do
    @test['top_toolbar'].editButton.click
    @test['author_text'].should be_a_kind_of View
    @test['author_text'].click    # puts up the text edit view
    @pane.childViews.last.should be_a_kind_of TextFieldView
    @pane.childViews.last.type('<p>This is the changed value.</p>')
    @pane.click
    @test['author_text'].value.should == '<p>This is the changed value.</p>'
  end
  
  it "should reflect the edited intro text when 'Run' is clicked" do
    @test['top_toolbar'].runButton.click
    @test['intro_text'].content.should == "<p>This is the changed value.</p>"
  end
  
end