require 'spec_helper'

describe "/static_annotations/index.html.erb" do
  include StaticAnnotationsHelper

  before(:each) do
    assigns[:static_annotations] = [
      stub_model(StaticAnnotations,
        :guid => "value for guid",
        :type => "value for type",
        :points_id => "value for points_id"
      ),
      stub_model(StaticAnnotations,
        :guid => "value for guid",
        :type => "value for type",
        :points_id => "value for points_id"
      )
    ]
  end

  it "renders a list of static_annotations" do
    render
    response.should have_tag("tr>td", "value for guid".to_s, 2)
    response.should have_tag("tr>td", "value for type".to_s, 2)
    response.should have_tag("tr>td", "value for points_id".to_s, 2)
  end
end
