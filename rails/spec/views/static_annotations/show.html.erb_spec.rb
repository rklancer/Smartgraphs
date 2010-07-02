require 'spec_helper'

describe "/static_annotations/show.html.erb" do
  include StaticAnnotationsHelper
  before(:each) do
    assigns[:static_annotations] = @static_annotations = stub_model(StaticAnnotations,
      :guid => "value for guid",
      :type => "value for type",
      :points_id => "value for points_id"
    )
  end

  it "renders attributes in <p>" do
    render
    response.should have_text(/value\ for\ guid/)
    response.should have_text(/value\ for\ type/)
    response.should have_text(/value\ for\ points_id/)
  end
end
