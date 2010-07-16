require 'spec_helper'

describe "/guide_pages/index.html.erb" do
  include GuidePagesHelper

  before(:each) do
    assigns[:guide_pages] = [
      stub_model(GuidePage,
        :guide_page_sequence_id => "value for guide_page_sequence_id",
        :index => 1,
        :title => "value for title",
        :introText => "value for introText",
        :firstDialogTurn_id => "value for firstDialogTurn_id",
        :dataSeries_id => "value for dataSeries_id",
        :axes_id => "value for axes_id",
        :sensorAppletShouldBeEnabled => false,
        :shoulDdShowImage => false
      ),
      stub_model(GuidePage,
        :guide_page_sequence_id => "value for guide_page_sequence_id",
        :index => 1,
        :title => "value for title",
        :introText => "value for introText",
        :firstDialogTurn_id => "value for firstDialogTurn_id",
        :dataSeries_id => "value for dataSeries_id",
        :axes_id => "value for axes_id",
        :sensorAppletShouldBeEnabled => false,
        :shoulDdShowImage => false
      )
    ]
  end

  it "renders a list of guide_pages" do
    render
    response.should have_tag("tr>td", "value for guide_page_sequence_id".to_s, 2)
    response.should have_tag("tr>td", 1.to_s, 2)
    response.should have_tag("tr>td", "value for title".to_s, 2)
    response.should have_tag("tr>td", "value for introText".to_s, 2)
    response.should have_tag("tr>td", "value for firstDialogTurn_id".to_s, 2)
    response.should have_tag("tr>td", "value for dataSeries_id".to_s, 2)
    response.should have_tag("tr>td", "value for axes_id".to_s, 2)
    response.should have_tag("tr>td", false.to_s, 2)
    response.should have_tag("tr>td", false.to_s, 2)
  end
end
