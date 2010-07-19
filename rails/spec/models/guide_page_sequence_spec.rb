require 'spec_helper'

describe GuidePageSequence do
  before(:each) do
    @valid_attributes = {
      :guid => "value for guid"
    }
  end

  it "should create a new instance given valid attributes" do
    GuidePageSequence.create!(@valid_attributes)
  end
end


# == Schema Information
#
# Table name: guide_page_sequences
#
#  id         :integer         not null, primary key
#  guid       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  name       :string(255)
#

