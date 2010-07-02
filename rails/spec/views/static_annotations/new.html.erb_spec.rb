require 'spec_helper'

describe "/static_annotations/new.html.erb" do
  include StaticAnnotationsHelper

  before(:each) do
    assigns[:static_annotations] = stub_model(StaticAnnotations,
      :new_record? => true,
      :guid => "value for guid",
      :type => "value for type",
      :points_id => "value for points_id"
    )
  end

  it "renders new static_annotations form" do
    render

    response.should have_tag("form[action=?][method=post]", static_annotations_path) do
      with_tag("input#static_annotations_guid[name=?]", "static_annotations[guid]")
      with_tag("input#static_annotations_type[name=?]", "static_annotations[type]")
      with_tag("input#static_annotations_points_id[name=?]", "static_annotations[points_id]")
    end
  end
end
