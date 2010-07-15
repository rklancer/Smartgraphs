class GuidePageSequence < ActiveRecord::Base
  has_many :guide_pages
end

# == Schema Information
#
# Table name: guide_page_sequences
#
#  id         :integer         not null, primary key
#  guid       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

