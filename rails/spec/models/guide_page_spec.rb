require 'spec_helper'

describe GuidePage do
  before(:each) do
    @valid_attributes = {
      :guide_page_sequence_id => "value for guide_page_sequence_id",
      :index => 1,
      :title => "value for title",
      :introText => "value for introText",
      :firstDialogTurn_id => "value for firstDialogTurn_id",
      :dataSeries_id => "value for dataSeries_id",
      :axes_id => "value for axes_id",
      :sensorAppletShouldBeEnabled => false,
      :shoulDdShowImage => false
    }
  end

  it "should create a new instance given valid attributes" do
    GuidePage.create!(@valid_attributes)
  end
end
