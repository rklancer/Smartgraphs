require 'spec_helper'

describe "/static_annotations/show.html.erb" do
  include StaticAnnotationsHelper
  before(:each) do
    assigns[:static_annotation] = @static_annotation = stub_model(StaticAnnotation,
      :name => "value for name",
      :annotation_type => "value for annotation_type",
      :points_id => "value for points_id"
    )
  end

  it "renders attributes in <p>" do
    render
    response.should have_text(/value\ for\ name/)
    response.should have_text(/value\ for\ annotation_type/)
    response.should have_text(/value\ for\ points_id/)
  end
end
