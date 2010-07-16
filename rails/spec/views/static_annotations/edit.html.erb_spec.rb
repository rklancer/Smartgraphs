require 'spec_helper'

describe "/static_annotations/edit.html.erb" do
  include StaticAnnotationsHelper

  before(:each) do
    assigns[:static_annotation] = @static_annotation = stub_model(StaticAnnotation,
      :new_record? => false,
      :guid => "value for guid",
      :type => "value for type",
      :points_id => "value for points_id"
    )
  end

  it "renders the edit static_annotation form" do
    render

    response.should have_tag("form[action=#{static_annotation_path(@static_annotation)}][method=post]") do
      with_tag('input#static_annotation_guid[name=?]', "static_annotation[guid]")
      with_tag('input#static_annotation_type[name=?]', "static_annotation[type]")
      with_tag('input#static_annotation_points_id[name=?]', "static_annotation[points_id]")
    end
  end
end
