require 'spec_helper'

describe DialogTurn do
  before(:each) do
    @valid_attributes = {
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
    }
  end

  it "should create a new instance given valid attributes" do
    DialogTurn.create!(@valid_attributes)
  end
end

# == Schema Information
#
# Table name: dialog_turns
#
#  id                              :integer         not null, primary key
#  guid                            :string(255)
#  beforeText                      :text
#  responseTemplate_id             :string(255)
#  responseVerifier_id             :string(255)
#  afterText                       :text
#  nextTurnButtonTitle             :string(255)
#  nextTurnForNominalResponse_id   :string(255)
#  nextTurnForIncorrectResponse_id :string(255)
#  isLastTurn                      :boolean
#  shouldAutoAdvance               :boolean
#  created_at                      :datetime
#  updated_at                      :datetime
#

