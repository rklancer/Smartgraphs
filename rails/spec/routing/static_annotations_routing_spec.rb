require 'spec_helper'

describe StaticAnnotationsController do
  describe "routing" do
    it "recognizes and generates #index" do
      { :get => "/static_annotations" }.should route_to(:controller => "static_annotations", :action => "index")
    end

    it "recognizes and generates #new" do
      { :get => "/static_annotations/new" }.should route_to(:controller => "static_annotations", :action => "new")
    end

    it "recognizes and generates #show" do
      { :get => "/static_annotations/1" }.should route_to(:controller => "static_annotations", :action => "show", :id => "1")
    end

    it "recognizes and generates #edit" do
      { :get => "/static_annotations/1/edit" }.should route_to(:controller => "static_annotations", :action => "edit", :id => "1")
    end

    it "recognizes and generates #create" do
      { :post => "/static_annotations" }.should route_to(:controller => "static_annotations", :action => "create") 
    end

    it "recognizes and generates #update" do
      { :put => "/static_annotations/1" }.should route_to(:controller => "static_annotations", :action => "update", :id => "1") 
    end

    it "recognizes and generates #destroy" do
      { :delete => "/static_annotations/1" }.should route_to(:controller => "static_annotations", :action => "destroy", :id => "1") 
    end
  end
end
