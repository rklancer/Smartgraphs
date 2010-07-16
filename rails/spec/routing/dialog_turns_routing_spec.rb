require 'spec_helper'

describe DialogTurnsController do
  describe "routing" do
    it "recognizes and generates #index" do
      { :get => "/dialog_turns" }.should route_to(:controller => "dialog_turns", :action => "index")
    end

    it "recognizes and generates #new" do
      { :get => "/dialog_turns/new" }.should route_to(:controller => "dialog_turns", :action => "new")
    end

    it "recognizes and generates #show" do
      { :get => "/dialog_turns/1" }.should route_to(:controller => "dialog_turns", :action => "show", :id => "1")
    end

    it "recognizes and generates #edit" do
      { :get => "/dialog_turns/1/edit" }.should route_to(:controller => "dialog_turns", :action => "edit", :id => "1")
    end

    it "recognizes and generates #create" do
      { :post => "/dialog_turns" }.should route_to(:controller => "dialog_turns", :action => "create") 
    end

    it "recognizes and generates #update" do
      { :put => "/dialog_turns/1" }.should route_to(:controller => "dialog_turns", :action => "update", :id => "1") 
    end

    it "recognizes and generates #destroy" do
      { :delete => "/dialog_turns/1" }.should route_to(:controller => "dialog_turns", :action => "destroy", :id => "1") 
    end
  end
end
