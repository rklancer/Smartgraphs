require 'spec_helper'

describe "/guide_page_sequences/edit.html.erb" do
  include GuidePageSequencesHelper

  before(:each) do
    assigns[:guide_page_sequence] = @guide_page_sequence = stub_model(GuidePageSequence,
      :new_record? => false,
      :guid => "value for guid"
    )
  end

  it "renders the edit guide_page_sequence form" do
    render

    response.should have_tag("form[action=#{guide_page_sequence_path(@guide_page_sequence)}][method=post]") do
      with_tag('input#guide_page_sequence_guid[name=?]', "guide_page_sequence[guid]")
    end
  end
end
