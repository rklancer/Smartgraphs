class GuidePage < ActiveRecord::Base
  belongs_to :guide_page_sequences
end

# == Schema Information
#
# Table name: guide_pages
#
#  id                          :integer         not null, primary key
#  guide_page_sequence_id      :string(255)
#  index                       :integer
#  title                       :string(255)
#  introText                   :text
#  firstDialogTurn_id          :string(255)
#  dataSeries_id               :string(255)
#  axes_id                     :string(255)
#  sensorAppletShouldBeEnabled :boolean
#  shoulDdShowImage            :boolean
#  created_at                  :datetime
#  updated_at                  :datetime
#

