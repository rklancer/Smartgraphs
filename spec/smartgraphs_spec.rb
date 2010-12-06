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
  end

  after(:all) do
    stop_testing_servers
  end

  # TODO: Tests go here
  it "should have tests here" do
    true
  end
end