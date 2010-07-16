require 'spec_helper'

describe StaticAnnotation do
  before(:each) do
    @valid_attributes = {
      :guid => "value for guid",
      :annotation_type => "value for annotation_type",
      :points_id => "value for points_id"
    }
  end

  it "should create a new instance given valid attributes" do
    StaticAnnotation.create!(@valid_attributes)
  end
end

# == Schema Information
#
# Table name: static_annotations
#
#  id              :integer         not null, primary key
#  guid            :string(255)
#  annotation_type :string(255)
#  points_id       :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

