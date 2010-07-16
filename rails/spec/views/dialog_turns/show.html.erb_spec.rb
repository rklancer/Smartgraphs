require 'spec_helper'

describe "/dialog_turns/show.html.erb" do
  include DialogTurnsHelper
  before(:each) do
    assigns[:dialog_turn] = @dialog_turn = stub_model(DialogTurn,
      :guid => "value for guid",
      :beforeText => "value for beforeText",
      :responseTemplate_id => "value for responseTemplate_id",
      :responseVerifier_id => "value for responseVerifier_id",
      :afterText => "value for afterText",
      :nextTurnButtonTitle => "value for nextTurnButtonTitle",
      :nextTurnForNominalResponse_id => "value for nextTurnForNominalResponse_id",
      :nextTurnForIncorrectResponse_id => "value for nextTurnForIncorrectResponse_id",
      :isLastTurn => false,
      :shouldAutoAdvance => false
    )
  end

  it "renders attributes in <p>" do
    render
    response.should have_text(/value\ for\ guid/)
    response.should have_text(/value\ for\ beforeText/)
    response.should have_text(/value\ for\ responseTemplate_id/)
    response.should have_text(/value\ for\ responseVerifier_id/)
    response.should have_text(/value\ for\ afterText/)
    response.should have_text(/value\ for\ nextTurnButtonTitle/)
    response.should have_text(/value\ for\ nextTurnForNominalResponse_id/)
    response.should have_text(/value\ for\ nextTurnForIncorrectResponse_id/)
    response.should have_text(/false/)
    response.should have_text(/false/)
  end
end
