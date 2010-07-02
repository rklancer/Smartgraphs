require 'spec_helper'

describe "/guide_pages/show.html.erb" do
  include GuidePagesHelper
  before(:each) do
    assigns[:guide_page] = @guide_page = stub_model(GuidePage,
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
  end

  it "renders attributes in <p>" do
    render
    response.should have_text(/value\ for\ guide_page_sequence_id/)
    response.should have_text(/1/)
    response.should have_text(/value\ for\ title/)
    response.should have_text(/value\ for\ introText/)
    response.should have_text(/value\ for\ firstDialogTurn_id/)
    response.should have_text(/value\ for\ dataSeries_id/)
    response.should have_text(/value\ for\ axes_id/)
    response.should have_text(/false/)
    response.should have_text(/false/)
  end
end
