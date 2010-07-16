require 'spec_helper'

describe "/guide_page_sequences/new.html.erb" do
  include GuidePageSequencesHelper

  before(:each) do
    assigns[:guide_page_sequence] = stub_model(GuidePageSequence,
      :new_record? => true,
      :guid => "value for guid"
    )
  end

  it "renders new guide_page_sequence form" do
    render

    response.should have_tag("form[action=?][method=post]", guide_page_sequences_path) do
      with_tag("input#guide_page_sequence_guid[name=?]", "guide_page_sequence[guid]")
    end
  end
end
