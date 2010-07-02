require 'spec_helper'

describe "/static_annotations/edit.html.erb" do
  include StaticAnnotationsHelper

  before(:each) do
    assigns[:static_annotations] = @static_annotations = stub_model(StaticAnnotations,
      :new_record? => false,
      :guid => "value for guid",
      :type => "value for type",
      :points_id => "value for points_id"
    )
  end

  it "renders the edit static_annotations form" do
    render

    response.should have_tag("form[action=#{static_annotations_path(@static_annotations)}][method=post]") do
      with_tag('input#static_annotations_guid[name=?]', "static_annotations[guid]")
      with_tag('input#static_annotations_type[name=?]', "static_annotations[type]")
      with_tag('input#static_annotations_points_id[name=?]', "static_annotations[points_id]")
    end
  end
end
