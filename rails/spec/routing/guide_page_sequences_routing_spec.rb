require 'spec_helper'

describe GuidePageSequencesController do
  describe "routing" do
    it "recognizes and generates #index" do
      { :get => "/guide_page_sequences" }.should route_to(:controller => "guide_page_sequences", :action => "index")
    end

    it "recognizes and generates #new" do
      { :get => "/guide_page_sequences/new" }.should route_to(:controller => "guide_page_sequences", :action => "new")
    end

    it "recognizes and generates #show" do
      { :get => "/guide_page_sequences/1" }.should route_to(:controller => "guide_page_sequences", :action => "show", :id => "1")
    end

    it "recognizes and generates #edit" do
      { :get => "/guide_page_sequences/1/edit" }.should route_to(:controller => "guide_page_sequences", :action => "edit", :id => "1")
    end

    it "recognizes and generates #create" do
      { :post => "/guide_page_sequences" }.should route_to(:controller => "guide_page_sequences", :action => "create") 
    end

    it "recognizes and generates #update" do
      { :put => "/guide_page_sequences/1" }.should route_to(:controller => "guide_page_sequences", :action => "update", :id => "1") 
    end

    it "recognizes and generates #destroy" do
      { :delete => "/guide_page_sequences/1" }.should route_to(:controller => "guide_page_sequences", :action => "destroy", :id => "1") 
    end
  end
end
