require 'spec_helper'

describe "/static_annotations/new.html.erb" do
  include StaticAnnotationsHelper

  before(:each) do
    assigns[:static_annotation] = stub_model(StaticAnnotation,
      :new_record? => true,
      :name => "value for name",
      :annotation_type => "value for annotation_type",
      :points_id => "value for points_id"
    )
  end

  it "renders new static_annotation form" do
    render

    response.should have_tag("form[action=?][method=post]", static_annotations_path) do
      with_tag("input#static_annotation_guid[name=?]", "static_annotation[name]")
      with_tag("input#static_annotation_annotation_type[name=?]", "static_annotation[annotation_type]")
      with_tag("input#static_annotation_points_id[name=?]", "static_annotation[points_id]")
    end
  end
end
