require 'spec_helper'

describe GuidePagesController do
  describe "routing" do
    it "recognizes and generates #index" do
      { :get => "/guide_pages" }.should route_to(:controller => "guide_pages", :action => "index")
    end

    it "recognizes and generates #new" do
      { :get => "/guide_pages/new" }.should route_to(:controller => "guide_pages", :action => "new")
    end

    it "recognizes and generates #show" do
      { :get => "/guide_pages/1" }.should route_to(:controller => "guide_pages", :action => "show", :id => "1")
    end

    it "recognizes and generates #edit" do
      { :get => "/guide_pages/1/edit" }.should route_to(:controller => "guide_pages", :action => "edit", :id => "1")
    end

    it "recognizes and generates #create" do
      { :post => "/guide_pages" }.should route_to(:controller => "guide_pages", :action => "create") 
    end

    it "recognizes and generates #update" do
      { :put => "/guide_pages/1" }.should route_to(:controller => "guide_pages", :action => "update", :id => "1") 
    end

    it "recognizes and generates #destroy" do
      { :delete => "/guide_pages/1" }.should route_to(:controller => "guide_pages", :action => "destroy", :id => "1") 
    end
  end
end
