require 'spec_helper'

describe "/guide_page_sequences/show.html.erb" do
  include GuidePageSequencesHelper
  before(:each) do
    assigns[:guide_page_sequence] = @guide_page_sequence = stub_model(GuidePageSequence,
      :guid => "value for guid"
    )
  end

  it "renders attributes in <p>" do
    render
    response.should have_text(/value\ for\ guid/)
  end
end
