require 'spec_helper'

describe StaticAnnotations do
  before(:each) do
    @valid_attributes = {
      :guid => "value for guid",
      :type => "value for type",
      :points_id => "value for points_id"
    }
  end

  it "should create a new instance given valid attributes" do
    StaticAnnotations.create!(@valid_attributes)
  end
end
