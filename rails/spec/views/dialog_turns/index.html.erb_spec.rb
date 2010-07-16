require 'spec_helper'

describe "/dialog_turns/index.html.erb" do
  include DialogTurnsHelper

  before(:each) do
    assigns[:dialog_turns] = [
      stub_model(DialogTurn,
        :guid => "value for guid",
        :beforeText => "value for beforeText",
        :responseTemplate_id => "value for responseTemplate_id",
        :responseVerifier_id => "value for responseVerifier_id",
        :nextTurnButtonTitle => "value for nextTurnButtonTitle",
        :nextTurnForNominalResponse_id => "value for nextTurnForNominalResponse_id",
        :nextTurnForIncorrectResponse_id => "value for nextTurnForIncorrectResponse_id",
        :isLastTurn => false,
        :shouldAutoAdvance => false
      ),
      stub_model(DialogTurn,
        :guid => "value for guid",
        :beforeText => "value for beforeText",
        :responseTemplate_id => "value for responseTemplate_id",
        :responseVerifier_id => "value for responseVerifier_id",
        :nextTurnButtonTitle => "value for nextTurnButtonTitle",
        :nextTurnForNominalResponse_id => "value for nextTurnForNominalResponse_id",
        :nextTurnForIncorrectResponse_id => "value for nextTurnForIncorrectResponse_id",
        :isLastTurn => false,
        :shouldAutoAdvance => false
      )
    ]
  end

  it "renders a list of dialog_turns" do
    render
    response.should have_tag("tr>td", "value for guid".to_s, 2)
    response.should have_tag("tr>td", "value for beforeText".to_s, 2)
    response.should have_tag("tr>td", "value for responseTemplate_id".to_s, 2)
    response.should have_tag("tr>td", "value for responseVerifier_id".to_s, 2)
    response.should have_tag("tr>td", "value for nextTurnButtonTitle".to_s, 2)
    response.should have_tag("tr>td", "value for nextTurnForNominalResponse_id".to_s, 2)
    response.should have_tag("tr>td", "value for nextTurnForIncorrectResponse_id".to_s, 2)
    response.should have_tag("tr>td", false.to_s, 2)
    response.should have_tag("tr>td", false.to_s, 2)
  end
end
