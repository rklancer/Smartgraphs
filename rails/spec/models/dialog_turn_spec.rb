require 'spec_helper'

describe DialogTurn do
  before(:each) do
    @valid_attributes = {
      :guid => "value for guid",
      :beforeText => "value for beforeText",
      :responseTemplate_id => "value for responseTemplate_id",
      :responseVerifier_id => "value for responseVerifier_id",
      :staticAnnotations_id => 1,
      :nextTurnButtonTitle => "value for nextTurnButtonTitle",
      :nextTurnForNominalResponse_id => "value for nextTurnForNominalResponse_id",
      :nextTurnForIncorrectResponse_id => "value for nextTurnForIncorrectResponse_id",
      :isLastTurn => false,
      :shouldAutoAdvance => false
    }
  end

  it "should create a new instance given valid attributes" do
    DialogTurn.create!(@valid_attributes)
  end
end
