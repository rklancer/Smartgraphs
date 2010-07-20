class DialogTurn < ActiveRecord::Base
  has_and_belongs_to_many :static_annotations
end


# == Schema Information
#
# Table name: dialog_turns
#
#  id                              :integer         not null, primary key
#  name                            :string(255)
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

