require 'spec_helper'

describe "/dialog_turns/edit.html.erb" do
  include DialogTurnsHelper

  before(:each) do
    assigns[:dialog_turn] = @dialog_turn = stub_model(DialogTurn,
      :new_record? => false,
      :name => "value for name",
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

  it "renders the edit dialog_turn form" do
    render

    response.should have_tag("form[action=#{dialog_turn_path(@dialog_turn)}][method=post]") do
      with_tag('input#dialog_turn_name[name=?]', "dialog_turn[name]")
      with_tag('textarea#dialog_turn_beforeText[name=?]', "dialog_turn[beforeText]")
      with_tag('input#dialog_turn_responseTemplate_id[name=?]', "dialog_turn[responseTemplate_id]")
      with_tag('input#dialog_turn_responseVerifier_id[name=?]', "dialog_turn[responseVerifier_id]")
      with_tag('textarea#dialog_turn_afterText[name=?]', "dialog_turn[afterText]")
      with_tag('input#dialog_turn_nextTurnButtonTitle[name=?]', "dialog_turn[nextTurnButtonTitle]")
      with_tag('input#dialog_turn_nextTurnForNominalResponse_id[name=?]', "dialog_turn[nextTurnForNominalResponse_id]")
      with_tag('input#dialog_turn_nextTurnForIncorrectResponse_id[name=?]', "dialog_turn[nextTurnForIncorrectResponse_id]")
      with_tag('input#dialog_turn_isLastTurn[name=?]', "dialog_turn[isLastTurn]")
      with_tag('input#dialog_turn_shouldAutoAdvance[name=?]', "dialog_turn[shouldAutoAdvance]")
    end
  end
end
