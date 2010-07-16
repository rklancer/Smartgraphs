require 'spec_helper'

describe "/guide_page_sequences/index.html.erb" do
  include GuidePageSequencesHelper

  before(:each) do
    assigns[:guide_page_sequences] = [
      stub_model(GuidePageSequence,
        :guid => "value for guid"
      ),
      stub_model(GuidePageSequence,
        :guid => "value for guid"
      )
    ]
  end

  it "renders a list of guide_page_sequences" do
    render
    response.should have_tag("tr>td", "value for guid".to_s, 2)
  end
end
