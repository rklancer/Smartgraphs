require 'spec_helper'

describe "/guide_pages/edit.html.erb" do
  include GuidePagesHelper

  before(:each) do
    assigns[:guide_page] = @guide_page = stub_model(GuidePage,
      :new_record? => false,
      :guide_page_sequence_id => "value for guide_page_sequence_id",
      :index => 1,
      :title => "value for title",
      :introText => "value for introText",
      :firstDialogTurn_id => "value for firstDialogTurn_id",
      :dataSeries_id => "value for dataSeries_id",
      :axes_id => "value for axes_id",
      :sensorAppletShouldBeEnabled => false,
      :shoulDdShowImage => false
    )
  end

  it "renders the edit guide_page form" do
    render

    response.should have_tag("form[action=#{guide_page_path(@guide_page)}][method=post]") do
      with_tag('input#guide_page_guide_page_sequence_id[name=?]', "guide_page[guide_page_sequence_id]")
      with_tag('input#guide_page_index[name=?]', "guide_page[index]")
      with_tag('input#guide_page_title[name=?]', "guide_page[title]")
      with_tag('textarea#guide_page_introText[name=?]', "guide_page[introText]")
      with_tag('input#guide_page_firstDialogTurn_id[name=?]', "guide_page[firstDialogTurn_id]")
      with_tag('input#guide_page_dataSeries_id[name=?]', "guide_page[dataSeries_id]")
      with_tag('input#guide_page_axes_id[name=?]', "guide_page[axes_id]")
      with_tag('input#guide_page_sensorAppletShouldBeEnabled[name=?]', "guide_page[sensorAppletShouldBeEnabled]")
      with_tag('input#guide_page_shoulDdShowImage[name=?]', "guide_page[shoulDdShowImage]")
    end
  end
end
